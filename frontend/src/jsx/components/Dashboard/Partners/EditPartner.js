import React,{useState, Fragment, useEffect} from "react";
import { connect, useDispatch } from 'react-redux';
import { loadingToggleAction, updateInvestmentAction } from "../../../../store/actions/investmentActions";
import { fetchCountries } from "../../../../services/countryService";
import { useLocation } from 'react-router-dom';

function EditPartner(props) {
  const errorsObj = {
    name: "",
    phoneNumber: "",
    email: "",
    countries: "",
    amountInvested: "",
    interestPercentage: "",
  };

  const [errors, setErrors] = useState(errorsObj);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    country: "", // IDs des pays sélectionnés
    amountInvested: "",
    interestPercentage: "",
  });

  const { name, phoneNumber, email, country, amountInvested, interestPercentage } = formData;

  const dispatch = useDispatch();

  const location = useLocation();
  const invesment = location.state?.investment || {};

  // Charger les pays
  useEffect(() => {
    fetchCountries().then((response) => {
      setCountries(response.data);
    });
  }, []);

  // Charger les données du partenaire existant
  useEffect(() => {
    if (props.location.state && props.location.state.investment) {
    const { partner, country, amountInvested, interestPercentage } = props.location.state.investment;
      setFormData({
        name: partner.name,
        phoneNumber: partner.phoneNumber,
        email: partner.email,
        country: country.name,
        amountInvested: amountInvested,
        interestPercentage: interestPercentage,
      });
    }
  }, [props.location.state]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (name === "") {
      errorObj.name = "Le nom est réquis";
      error = true;
    }
    if (phoneNumber === "") {
      errorObj.phoneNumber = "Le numéro de téléphone est réquis";
      error = true;
    }
    if (email === "") {
      errorObj.email = "Le mail est réquis";
      error = true;
    }
    if (amountInvested === "") {
      errorObj.amountInvested = "Le montant investi est requis";
      error = true;
    }
    if (interestPercentage === "") {
      errorObj.interestPercentage = "Le pourcentage d'intérêt est requis";
      error = true;
    }
    if (country.length === 0) {
      errorObj.countries = "Au moins un pays doit être sélectionné";
      error = true;
    }

    setErrors(errorObj);
    if (error) return;

    dispatch(loadingToggleAction(true));
    dispatch(
      updateInvestmentAction(
        formData,
        invesment._id,
        props.history
      )
    );
  };

  return (
    <Fragment>
      <div className="card">
        <div className="authincation-content">
          <div className="auth-form">
            <h3 className="text-center mb-5">Modifier les informations du partenaire</h3>
            {props.errorMessage && (
              <div className="text-danger fs-8 mb-4">{props.errorMessage}</div>
            )}
            <form onSubmit={onUpdate}>
              <div className="row">
                <div className="form-group mb-3 col-md-6">
                  <label><strong>Nom Complet</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Veuillez saisir le nom du partenaire"
                  />
                  {errors.name && <div className="text-danger fs-12">{errors.name}</div>}
                </div>
                <div className="form-group mb-3 col-md-6">
                  <label><strong>Téléphone</strong></label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Veuillez saisir le numéro de téléphone"
                  />
                  {errors.phoneNumber && <div className="text-danger fs-12">{errors.phoneNumber}</div>}
                </div>
              </div>

              <div className="row">
                <div className="form-group mb-3 col-md-6">
                  <label><strong>Email</strong></label>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Veuillez saisir l'email"
                  />
                  {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                </div>
                <div className="form-group mb-3 col-md-6">
                  <label><strong>Montant Investi</strong></label>
                  <input
                    id="amountInvested"
                    name="amountInvested"
                    type="number"
                    value={amountInvested}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Montant investi"
                  />
                  {errors.amountInvested && <div className="text-danger fs-12">{errors.amountInvested}</div>}
                </div>
              </div>

              <div className="row">
                <div className="form-group mb-3 col-md-6">
                  <label><strong>Pourcentage d'Intérêt</strong></label>
                  <input
                    id="interestPercentage"
                    name="interestPercentage"
                    type="number"
                    value={interestPercentage}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Pourcentage d'intérêt"
                  />
                  {errors.interestPercentage && <div className="text-danger fs-12">{errors.interestPercentage}</div>}
                </div>
              </div>

              <div className="form-group mb-3">
                <label><strong>Pays</strong></label>
                <select
                  className="form-control"
                  name="country"
                  value={formData.country || ""}
                  onChange={onChange}
                >
                  <option value="">Tous les pays</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && <div className="text-danger fs-12">{errors.country}</div>}
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(EditPartner);