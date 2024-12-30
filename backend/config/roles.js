const permissions = {
    admin: ["view_dashboard", "view_partners", "view_countries", "view_agencies", "manage_transactions", "view_inventory", "manage_users", "view_transactions", "validate_transactions", "view_expenses"],
    country_manager: ["view_dashboard", "view_agencies", "manage_transactions", "validate_transactions", "view_inventory", "manage_users", "view_transactions", "view_expenses"],
    agent: ["view_dashboard", "manage_transactions", "validate_transactions"],
    agency_manager: ["view_dashboard", "manage_transactions", "validate_transactions", "view_inventory", "manage_users", "view_transactions", "view_expenses"],
    partner: ["view_dashboard", "view_my_placements"],
  };
  
  module.exports = permissions;  