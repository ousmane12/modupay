/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';

/// Image
//import user from "../../../images/user.jpg";
import profile from "../../../images/avatar/1.png";


class MM extends Component {
	componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	}
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  let d = new Date();
  const menuConfig = {
    admin: [
      { path: "/dashboard", icon: "fas fa-home", label: "Dashboard", permissions: ["view_dashboard"] },
      { path: "/nouvelle-transaction", icon: "fas fa-plus-circle", label: "Nouvelle Transaction", permissions: ["manage_transactions"] },
      { path: "/valider-transaction", icon: "fas fa-check-circle", label: "Valider Transaction", permissions: ["validate_transactions"] },
      { path: "/liste-transactions", icon: "fas fa-book", label: "Transactions", permissions: ["view_transactions"] },
      { path: "/liste-depenses", icon: "fas fa-book-open", label: "Dépenses", permissions: ["view_transactions"] },
      { path: "/agences", icon: "fas fa-address-book", label: "Agences", permissions: ["view_agencies"] },
      { path: "/inventaire", icon: "fas fa-atlas", label: "Inventaire", permissions: ["view_inventory"] },
      { path: "/utilisateurs", icon: "fas fa-users", label: "Utilisateurs", permissions: ["manage_users"] },
      { path: "/pays", icon: "fab fa-chrome", label: "Pays", permissions: ["view_countries"] },
      { path: "/partners", icon: "fas fa-address-book", label: "Partenaires", permissions: ["view_partners"] },
    ],
    country_manager: [
      { path: "/dashboard", icon: "fas fa-home", label: "Dashboard", permissions: ["view_dashboard"] },
      { path: "/nouvelle-transaction", icon: "fas fa-plus-circle", label: "Nouvelle Transaction", permissions: ["manage_transactions"] },
      { path: "/valider-transaction", icon: "fas fa-check-circle", label: "Valider Transaction", permissions: ["validate_transactions"] },
      { path: "/liste-transactions", icon: "fas fa-book", label: "Transactions", permissions: ["view_transactions"] },
      { path: "/liste-depenses", icon: "fas fa-book-open", label: "Dépenses", permissions: ["view_transactions"] },
      { path: "/inventaire", icon: "fas fa-atlas", label: "Inventaire", permissions: ["view_inventory"] },
      { path: "/agences", icon: "fas fa-address-book", label: "Agences", permissions: ["view_agencies"] },
      { path: "/utilisateurs", icon: "fas fa-users", label: "Utilisateurs", permissions: ["manage_users"] },
    ],
    agency_manager: [
      { path: "/dashboard", icon: "fas fa-home", label: "Dashboard", permissions: ["view_dashboard"] },
      { path: "/nouvelle-transaction", icon: "fas fa-plus-circle", label: "Nouvelle Transaction", permissions: ["manage_transactions"] },
      { path: "/valider-transaction", icon: "fas fa-check-circle", label: "Valider Transaction", permissions: ["validate_transactions"] },
      { path: "/liste-transactions", icon: "fas fa-book-open", label: "Transactions", permissions: ["view_transactions"] },
      { path: "/liste-depenses", icon: "fas fa-book", label: "Dépenses", permissions: ["view_transactions"] },
      { path: "/inventaire", icon: "fas fa-atlas", label: "Inventaire", permissions: ["view_inventory"] },
      { path: "/utilisateurs", icon: "fas fa-users", label: "Utilisateurs", permissions: ["manage_users"] },
    ],
    partner: [
      { path: "/dashboard", icon: "fas fa-home", label: "Dashboard", permissions: ["view_dashboard"] },
      { path: "/investments", icon: "fas fa-wallet", label: "Mes Placements", permissions: ["view_my_placements"] },
    ],
  };
  
  const user = useSelector((state) => state.auth.auth); // Récupération des informations utilisateur

  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);

  useEffect(() => {
    const btn = document.querySelector(".nav-control");
    const wrapper = document.querySelector("#main-wrapper");

    const toggleFunc = () => wrapper.classList.toggle("menu-toggle");
    btn.addEventListener("click", toggleFunc);

    const handleHeartBlast = document.querySelector(".heart");
    const heartBlast = () => handleHeartBlast.classList.toggle("heart-blast");
    handleHeartBlast.addEventListener("click", heartBlast);

    return () => {
      btn.removeEventListener("click", toggleFunc);
      handleHeartBlast.removeEventListener("click", heartBlast);
    };
  }, []);

  const location = useLocation();
  let path = location.pathname.split("/").pop();

  // Récupérer les menus basés sur le rôle utilisateur
  const roleMenus = menuConfig[user.role] || [];

  // Filtrer les menus selon les permissions utilisateur
  const filteredMenus = roleMenus.filter((menu) =>
    menu.permissions.some((permission) => user.permissions.includes(permission))
  );

  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? "fixed"
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown className="dropdown header-profile2">
          <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
            <div className="header-info2 d-flex align-items-center border">
              <img src={profile} width={20} alt="" />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w700 d-block mb-2">{user.name}</span>
                  <small className="text-end font-w400">{user.role}</small>
                </div>
                <i className="fas fa-sort-down ms-2 mr-2"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
            <Link to="/profile" className="dropdown-item ai-icon">
              <svg
                id="icon-user1"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary me-1"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Mon profil</span>
            </Link>
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>

        <MM className="metismenu" id="menu">
          {filteredMenus.map((menu) => (
            <li key={menu.path} className={`${path === menu.path ? "mm-active" : ""}`}>
              <Link to={menu.path}>
                <i className={menu.icon}></i>
                <span className="nav-text">{menu.label}</span>
              </Link>
            </li>
          ))}
        </MM>

        <div className="copyright mt-4">
          <p>
            <strong>Biba Express Admin</strong> © {d.getFullYear()} Tous droits réservés
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by bibatech
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};


export default SideBar;
