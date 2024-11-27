const rolesPermissions = require('../config/roles'); // Le fichier JSON des rôles

const checkPermissions = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = rolesPermissions.roles[userRole];

    if (!permissions || !permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  };
};

module.exports = checkPermissions;
