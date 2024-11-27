const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Investment = require('../models/investmentModel');
const permissionsConfig = require('../config/roles');

// @desc    Create user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, email, role } = req.body;

  // Vérification des champs requis
  if (!name || !email || !phoneNumber || !role) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (!permissionsConfig[role]) {
    return res.status(400).json({ message: 'Rôle invalide.' });
  }

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Un utilisateur existe avec cet email');
  }

  // Génération d'un mot de passe par défaut
  const defaultPassword = Math.random().toString(36).slice(-8);

  // Hash du mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(defaultPassword, salt);
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Ajouter le token au modèle
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const resetPasswordExpires = Date.now() + 10 * 60 * 1500; // Expire après 10 minutes


  // Création de l'utilisateur
  const userData = {
    name,
    email,
    role,
    phoneNumber,
    password: hashedPassword,
    resetPasswordToken,
    resetPasswordExpires,
  };

  // Ajouter `country` ou `agency` au modèle utilisateur en fonction du rôle
  if (req.user.role === 'country_manager' && role === 'agency_manager') {
    userData.country = req.user.country;
    // Ajouter l'utilisateur comme manager dans `Country`
   
  } else if (req.user.role === 'agency_manager' && role === 'agent') {
    userData.country = req.user.country;
    userData.agency = req.user.agency;
  }

  const user = new User(userData);
  // Génération d'un token pour définir le mot de passe
  await user.save();

  // Construire le lien pour définir le mot de passe
  const resetUrl = `${process.env.RESET_PASS_URL}/${resetPasswordToken}`;

  // Envoi de l'email
  try {
    const sendEmail = require('../utils/sendEmail');
    await sendEmail({
      to: email,
      subject: 'Création de Compte BIBA',
      text: `Bonjour ${name},\n\nUn compte a été créé pour vous. Veuillez utiliser le lien ci-dessous pour définir votre mot de passe:\n\n${resetUrl}\n\nThis link will expire in 10 minutes.`,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès et e-mail envoyé', createdUser: user });
  } catch (error) {
    console.error('Error sending email:', error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(500);
    throw new Error('Utilisateur créé, mais n\'a pas réussi à envoyer l\'e-mail. Veuillez réessayer plus tard.');
  }
});

// Enregistrer un partenaire
const registerPartner = asyncHandler(async (req, res) => {
    try {
        const { name, email, phoneNumber, investments } = req.body;

        // Créer l'utilisateur avec le rôle `partner`
        const partner = await User.create({
            name,
            email,
            phoneNumber,
            password,
            role: 'partner',
        });

        // Enregistrer les investissements si fournis
        if (investments && investments.length > 0) {
            for (const inv of investments) {
                const country = await Country.findById(inv.countryId); // Vérifie si le pays existe
                if (!country) {
                    return res.status(400).json({ message: `Pays avec l'ID ${inv.countryId} introuvable` });
                }

                await Investment.create({
                    partner: partner._id,
                    country: inv.countryId,
                    amountInvested: inv.amountInvested,
                    interestPercentage: inv.interestPercentage,
                });
            }
        }

        res.status(201).json({
            message: 'Partenaire enregistré avec succès',
            partner,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l’enregistrement du partenaire' });
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Vérifier si l'utilisateur existe et si le mot de passe correspond
  // && (await bcrypt.compare(password, user.password))
  if (user && (await bcrypt.compare(password, user.password))) {
    // Obtenir les permissions à partir du rôle
    const permissions = permissionsConfig[user.role] || [];

    res.json({
      _id: user.id,
      name: user.name,
      country: user.country,
      agency: user.agency,
      phoneNumber: user.phoneNumber,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
      permissions,
    });
  } else {
    res.status(400);
    throw new Error('Identifiants invalides');
  }
});


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    let query = {};

    // Définir le filtre en fonction du rôle de l'utilisateur
    if (req.user.role === 'country_manager') {
      query = { country: req.user.country }; // Utilisateurs du même pays
    } else if (req.user.role === 'agency_manager') {
      query = { agency: req.user.agency }; // Utilisateurs de la même agence
    }

    // Ajouter une condition pour exclure l'utilisateur actuellement connecté
    query._id = { $ne: req.user._id }; // Exclut l'utilisateur connecté

    // Récupérer les utilisateurs avec les relations peuplées
    const users = await User.find(query)
      .populate({
        path: 'investments',
        select: 'country amountInvested interestPercentage totalInterestEarned', // Sélectionne les champs des investissements
        populate: [
          { path: 'country', select: 'name' } // Remplit les détails du pays dans les investissements
        ]
      })
      .populate('country', 'name') // Remplit les détails du pays
      .populate('agency', 'name'); // Remplit les détails de l'agence

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  .populate('country', 'name')
  .populate('agency', 'name')
  .populate({
    path: 'investments',
    select: 'country amountInvested interestPercentage totalInterestEarned', // Sélectionne les champs des transactions
    populate: [
      { path: 'country', select: 'name'}
    ]
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedUser);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role === 'country_manager') {
    // Suppression des Country associés
    const country = await Country.findOne({ manager: user._id });
    if (country) {
      // Suppression des agences dans ce pays
      await Agency.deleteMany({ country: country._id });
      // Suppression des utilisateurs liés à ce pays
      await User.deleteMany({ country: country._id });
      // Suppression du pays lui-même
      await country.deleteOne();
    }
  } else if (user.role === 'agency_manager') {
    // Suppression de l'agence associée
    const agency = await Agency.findOne({ manager: user._id });
    if (agency) {
      // Suppression des agents associés à cette agence
      await User.deleteMany({ agency: agency._id });
      // Suppression de l'agence elle-même
      await agency.deleteOne();
    }
  }

  // Suppression de l'utilisateur (gestionnaire pays ou agence)
  await user.deleteOne();

  res.status(200).json({ message: 'Utilisateur et entités associées supprimés', id: req.params.id });
});


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Vérifie si un utilisateur avec cet email existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'L\'utilisateur avec cet e-mail n\'existe pas' });
  }

  // Génère un token de réinitialisation
  const resetToken = user.getResetPasswordToken();

  // Hash le token et configure une expiration
  user.resetPasswordToken = user.getResetPasswordToken();
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

  await user.save();

  // Crée le lien de réinitialisation
  const resetUrl = `${process.env.RESET_PASS_URL}/${resetToken}`;
  // Envoie l'email
  try {
    const sendEmail = require('../utils/sendEmail');
    await sendEmail({
      to: email,
      subject: 'Demande de changement de Mot de passe',
      text: `Vous avez demandé une réinitialisation du mot de passe.\n\nVeuillez utiliser le lien suivant pour réinitialiser votre mot de passe: ${resetUrl}\n\nCe lien expirera dans 1 heure.`,
    });
    res.status(201).json({ message: 'Le lien de changement de mot de passe est envoyé par mail' });
  } catch (error) {
    // Nettoie les champs en cas d'erreur d'envoi
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard' });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  // Trouve l'utilisateur correspondant
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }, // Vérifie que le token n'est pas expiré
  });

  if (!user) {
    return res.status(400).json({ message: 'Jeton invalide ou expiré' });
  }

  // Met à jour le mot de passe
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  createUser,
  loginUser,
  getMe,
  getUsers,
  getUser,
  getUserProfile,
  deleteUser,
  updateUser,
  registerPartner,
  resetPassword,
  forgotPassword
}