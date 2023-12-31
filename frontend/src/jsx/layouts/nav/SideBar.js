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
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';

/// Image
//import user from "../../../images/user.jpg";
import profile from "../../../images/user.jpg";


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
  const user = useSelector(state => state.auth.auth);
	const {
		iconHover,
		sidebarposition,
		headerposition,
		sidebarLayout,
	} = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
	var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
        handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
  let scrollPosition = useScrollPosition(({ prevPos, currPos }) => {
  });
  /// Path
  const location = useLocation();
  let path = location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  /// Active menu
  let deshBoard = [
      "",
      "dashboard",
    ],
    transaction = [
      "nouvelle-transaction",
    ],
    transaction_list = [
      "liste-transactions",
    ],
    inv = [
      "inventaire",
    ],
    users = [
      "utilisateurs",
    ],
    transaction_validate = [
      "valider-transaction",
    ],
    clients = [
      "clients",
    ] 
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
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
					  <span className="font-w700 d-block mb-2">{user.firstName} {user.lastName}</span>
					  <small className="text-end font-w400">{user.role}</small>
					</div>
					<i className="fas fa-sort-down ms-4"></i>
				  </div>
				</div>
			  </Dropdown.Toggle>
				  <Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-end">
					<Link to="/app-profile" className="dropdown-item ai-icon">
					  <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
						width={18} height={18} viewBox="0 0 24 24" fill="none"
						stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
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
		      <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
          <Link to="/dashboard">
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>

          <li className={`${transaction.includes(path) ? "mm-active" : ""}`}>
          <Link to="/nouvelle-transaction">
              <i className="fas fa-plus-circle"></i>
              Nouvelle Transaction
            </Link>
          </li>

          <li className={`${transaction_validate.includes(path) ? "mm-active" : ""}`}>
          <Link to="/valider-transaction">
              <i className="fas fa-check-circle"></i>
              Valider Transaction
            </Link>
          </li>

          <li className={`${transaction_list.includes(path) ? "mm-active" : ""}`}>
          <Link to="/liste-transactions">
              <i className="fas fa-book"></i>
              Transactions
            </Link>
          </li>

          <li className={`${inv.includes(path) ? "mm-active" : ""}`}>
          <Link to="/inventaire">
              <i className="fas fa-atlas"></i>
              Inventaire
            </Link>
          </li>

          <li className={`${users.includes(path) ? "mm-active" : ""}`}>
          <Link to="/utilisateurs">
              <i className="fas fa-address-book"></i>
              Utilisateurs
          </Link>
          </li>

          <li className={`${clients.includes(path) ? "mm-active" : ""}`}>
          <Link to="/clients">
              <i className="fas fa-address-book"></i>
              Clients
          </Link>
          </li>
        </MM>
		<div className="copyright mt-4">
			<p><strong>ModuPay Admin Dashboard</strong> © 2023 Tous droits réservés</p>
			<p className="fs-12">Made with <span className="heart"></span> by besstech</p>
		</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
