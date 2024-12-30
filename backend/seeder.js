const Role = require('./models/roleModel');
const Permission = require('./models/permissionModel');
const RolePermission = require('./models/rolePermissionModel');

const seedDatabase = async () => {
  // Créer les rôles
  const admin = await Role.create({ name: 'admin' });
  const countryManager = await Role.create({ name: 'country_manager' });
  const agencyManager = await Role.create({ name: 'agency_manager' });
  const agent = await Role.create({ name: 'agent' });
  const partner = await Role.create({ name: 'partner' });

  // Créer les permissions
  const permissions = [
    { name: 'view_dashboard' },
    { name: 'view_users' },
    { name: 'create_users' },
    { name: 'edit_users' },
    { name: 'delete_users' },
    { name: 'view_partners' },
    { name: 'view_countries' },
    { name: 'view_agencies' },
    { name: 'edit_agencies' },
    { name: 'manage_transactions' },
    { name: 'validate_transactions' },
    { name: 'view_inventory' },
    { name: 'view_my_placements' },
  ];
  const permissionDocs = await Permission.insertMany(permissions);

  // Associer les rôles aux permissions
  const rolePermissions = [
    // Admin
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'view_dashboard')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'view_partners')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'view_countries')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'view_agencies')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'edit_agencies')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'edit_users')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'view_users')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'create_users')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'delete_users')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'manage_transactions')._id },
    { role: admin._id, permission: permissionDocs.find(p => p.name === 'view_inventory')._id },

    // Country Manager
    { role: countryManager._id, permission: permissionDocs.find(p => p.name === 'view_dashboard')._id },

    // Agency Manager
    { role: agencyManager._id, permission: permissionDocs.find(p => p.name === 'view_dashboard')._id },
    { role: agencyManager._id, permission: permissionDocs.find(p => p.name === 'view_agencies')._id },

    // Agent
    { role: agent._id, permission: permissionDocs.find(p => p.name === 'view_dashboard')._id },
    { role: agent._id, permission: permissionDocs.find(p => p.name === 'manage_transactions')._id },
    { role: agent._id, permission: permissionDocs.find(p => p.name === 'validate_transactions')._id },
    { role: agent._id, permission: permissionDocs.find(p => p.name === 'view_inventory')._id },

    // Partner
    { role: partner._id, permission: permissionDocs.find(p => p.name === 'view_dashboard')._id },
    { role: partner._id, permission: permissionDocs.find(p => p.name === 'view_my_placements')._id },
  ];
  await RolePermission.insertMany(rolePermissions);

  console.log('Base de données initialisée.');
};

seedDatabase();
