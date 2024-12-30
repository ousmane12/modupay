import React, { useContext } from "react";
/// React router dom
import {  Switch, Route, useLocation } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
import InvoicesList from "./components/Dashboard/InvoicesList";
import CreateInvoices from "./components/Dashboard/CreateInvoices";
import TransactionDetails from "./components/Dashboard/TransactionDetails";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Plugins
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";
import NewUser from "./components/Dashboard/Adduser/NewUser";
import ProfileUser from "./components/Dashboard/ViewUser/ProfileUser";
import EditUser from "./components/Dashboard/EditUser/EditUser";
import Clients from "./components/Dashboard/Clients/Clients";
import AddClient from "./components/Dashboard/AddClient/AddClient";
import Inventaire from "./components/Dashboard/Inventaire/Inventaire";
import InventaireFacture from "./components/Dashboard/Invoice/InventaireFacture";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import TransactionsDetails from "./components/Dashboard/DetailTransaction/TransactionDetails";
import Countries from "./components/Dashboard/Country/Countries";
import Agencies from "./components/Dashboard/Agencies/Agencies";
import NewAgency from "./components/Dashboard/Agencies/NewAgency";
import NewCountry from "./components/Dashboard/Country/NewCountry";
import Country from "./components/Dashboard/Country/Country";
import Agency from "./components/Dashboard/Agencies/Agency";
import EditAgency from "./components/Dashboard/Agencies/EditAgency";
import Partners from "./components/Dashboard/Partners/Partners";
import NewPartner from "./components/Dashboard/Partners/NewPartner";
import Partner from "./components/Dashboard/Partners/Partner";
import EditPartner from "./components/Dashboard/Partners/EditPartner";
import Investments from "./components/Dashboard/Partners/Investments";
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import ExpensesList from "./components/Dashboard/ExpensesList";


const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "pays", component: Countries },
    { url: "agences", component: Agencies },
    { url: "agency/:id", component: Agency },
    { url: "edit-agency/:id", component: EditAgency },
    { url: "nouveau-pays", component: NewCountry },
    { url: "edit-country/:id", component: NewCountry },
    { url: "country/:id", component: Country },
    { url: "nouvelle-agence", component: NewAgency },
    { url: "partner/:id", component: Partner },
    { url: "nouveau-partner", component: NewPartner },
    { url: "partners", component: Partners },
    { url: "investments", component: Investments },
    { url: "editer-partner/:id", component: EditPartner },
    { url: "liste-transactions", component: InvoicesList },
    { url: "liste-depenses", component: ExpensesList },
    { url: "nouvelle-transaction", component: CreateInvoices },
    { url: "nouvel-utilisateur", component: NewUser },
    { url: "editer-utilisateur/:id", component: EditUser },
    { url: "utilisateur/:id", component: ProfileUser },
    { url: "transaction-details", component: TransactionDetails },
    { url: "valider-transaction", component: ProductOrder },
    { url: "detail-transaction/:id", component: TransactionsDetails },
    { url: "forgot-password", component: ForgotPassword },
    { url: "profile", component: AppProfile },

    { url: "utilisateurs", component: Customers },
    { url: "clients", component: Clients },
    { url: "nouveau-client", component: AddClient },
    { url: "inventaire", component: Inventaire },
    { url: "facture", component: InventaireFacture },

    /// pages
    { url: "reset-password/:token", component: Registration },
    { url: "page-login", component: Login },
    { url: "forgot-password", component: ForgotPassword },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];
  const location = useLocation();
  let path = location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>      
	  <ScrollToTop />
    </>
  );
};

export default Markup;
