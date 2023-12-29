/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
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
 //console.log(user.firstName);
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
    console.log(currPos.x)
    console.log(currPos.y)
  });
  /// Path
  let path = window.location?.pathname;
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
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",
      
      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
	redux = [
       "redux-form",
	   "redux-wizard",    
       "todo",
    ],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
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
              Liste Transactions
            </Link>
          </li>

          <li className={`${inv.includes(path) ? "mm-active" : ""}`}>
          <Link to="/inventaire">
              <i className="fas fa-atlas"></i>
              Inventaire Transactions
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

          <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fab fa-bootstrap"></i>
              <span className="nav-text">Bootstrap</span>
            </Link>
            <ul >
              <li><Link className={`${path === "ui-accordion" ? "mm-active" : ""}`} to="/ui-accordion">Accordion</Link></li>
              <li><Link className={`${path === "ui-alert" ? "mm-active" : ""}`} to="/ui-alert"> Alert</Link></li>
              <li><Link className={`${path === "ui-badge" ? "mm-active" : ""}`} to="/ui-badge">Badge</Link></li>
              <li><Link className={`${path === "ui-button" ? "mm-active" : ""}`} to="/ui-button">Button</Link></li>
              <li><Link className={`${path === "ui-modal" ? "mm-active" : ""}`} to="/ui-modal">Modal</Link></li>
              <li><Link className={`${path === "ui-button-group" ? "mm-active" : ""}`} to="/ui-button-group">Button Group</Link></li>
              <li><Link className={`${path === "ui-list-group" ? "mm-active" : ""}`} to="/ui-list-group" >List Group</Link></li>
              <li><Link className={`${path === "ui-card" ? "mm-active" : ""}`} to="/ui-card">Cards</Link></li>
              <li><Link className={`${path === "ui-carousel" ? "mm-active" : ""}`} to="/ui-carousel">Carousel</Link></li>
              <li><Link className={`${path === "ui-dropdown" ? "mm-active" : ""}`} to="/ui-dropdown">Dropdown</Link></li>
              <li><Link className={`${path === "ui-popover" ? "mm-active" : ""}`} to="/ui-popover">Popover</Link></li>
              <li><Link className={`${path === "ui-progressbar" ? "mm-active" : ""}`} to="/ui-progressbar">Progressbar</Link></li>
              <li><Link className={`${path === "ui-tab" ? "mm-active" : ""}`} to="/ui-tab">Tab</Link></li>
              <li><Link className={`${path === "ui-typography" ? "mm-active" : ""}`} to="/ui-typography">Typography</Link></li>
              <li><Link className={`${path === "ui-pagination" ? "mm-active" : ""}`} to="/ui-pagination">Pagination</Link></li>
              <li><Link className={`${path === "ui-grid" ? "mm-active" : ""}`} to="/ui-grid">Grid</Link></li>
            </ul>
          </li>
          <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-heart"></i><span className="nav-text">Plugins</span>
            </Link>
            <ul >
              <li><Link className={`${path === "uc-select2" ? "mm-active" : ""}`} to="/uc-select2">Select 2</Link></li>
              <li><Link className={`${path === "uc-noui-slider" ? "mm-active" : ""}`} to="/uc-noui-slider">Noui Slider</Link></li>
              <li><Link className={`${path === "uc-sweetalert" ? "mm-active" : ""}`} to="/uc-sweetalert">Sweet Alert</Link></li>
              <li><Link className={`${path === "uc-toastr" ? "mm-active" : ""}`} to="/uc-toastr">Toastr</Link></li>
              <li><Link className={`${path === "map-jqvmap" ? "mm-active" : ""}`} to="/map-jqvmap">Jqv Map</Link></li>
              <li><Link className={`${path === "uc-lightgallery" ? "mm-active" : ""}`} to="/uc-lightgallery">Light Gallery</Link></li>
            </ul>
          </li>
          <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-file-alt"></i>
              <span className="nav-text forms">Forms</span>
            </Link>
            <ul >
              <li><Link className={`${path === "form-element" ? "mm-active" : ""}`} to="/form-element">Form Elements</Link></li>
              <li><Link className={`${path === "form-wizard" ? "mm-active" : ""}`} to="/form-wizard"> Wizard</Link></li>
              <li>
                <Link className={`${path === "form-editor-summernote" ? "mm-active" : ""}`}to="/form-editor-summernote">
                  Summernote
                </Link>
              </li>
              <li><Link className={`${path === "form-pickers" ? "mm-active" : ""}`} to="/form-pickers">Pickers</Link></li>
              <li>
                <Link className={`${path === "form-validation-jquery" ? "mm-active" : ""}`} to="/form-validation-jquery">
                  Form Validate
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fas fa-clone"></i>
              <span className="nav-text">Pages</span>
            </Link>
              <ul >
                <li className={`${error.includes(path) ? "mm-active" : ""}`}>
                  <Link className="has-arrow" to="#" >Error</Link>
                  <ul>
                    <li><Link className={`${ path === "page-error-400" ? "mm-active" : "" }`} to="/page-error-400">Error 400</Link></li>
                    <li><Link className={`${ path === "page-error-403" ? "mm-active" : "" }`} to="/page-error-403">Error 403</Link></li>
                    <li><Link className={`${ path === "page-error-404" ? "mm-active" : "" }`} to="/page-error-404">Error 404</Link></li>
                    <li><Link className={`${ path === "page-error-500" ? "mm-active" : "" }`} to="/page-error-500">Error 500</Link></li>
                    <li><Link className={`${ path === "page-error-503" ? "mm-active" : "" }`} to="/page-error-503">Error 503</Link></li>
                  </ul>
                </li>
                <li><Link className={`${path === "page-lock-screen" ? "mm-active" : ""}`} to="/page-lock-screen">Lock Screen</Link></li>
              </ul>
          </li>
        </MM>
		<div className="copyright">
			<p><strong>ModuPay Admin Dashboard</strong> © 2023 Tous droits réservés</p>
			<p className="fs-12">Made with <span className="heart"></span> by besstech</p>
		</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
