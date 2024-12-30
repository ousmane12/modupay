import React,{useState, Fragment, useEffect} from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    loadingToggleAction,
    createAction,
} from '../../../../store/actions/userActions';
import CustomSelectCountry from "../Agencies/CustomSelectCountry";
import { fetchCountries } from "../../../../services/countryService";


function NewUser(props) {
    let errorsObj = { 
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: '',
    country: '' };
    const [errors, setErrors] = useState(errorsObj);
    const user = useSelector(state => state.auth.auth);
    const [countries, setCountries] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        role: '',
        country: '',
      });
    const { name, role, phoneNumber, email, country} = formData;

    useEffect(() => {
      let isMounted = true;
  
      const fetchInitialData = async () => {
        try {
          const countryResponse = await fetchCountries();
          if(isMounted && user.role === 'admin') {
            setCountries(countryResponse.data);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des données initiales', error);
        }
      };
  
      fetchInitialData();
  
      return () => {
        isMounted = false; // Marqueur pour annuler les mises à jour
      };
    }, [user.role]);

    const dispatch = useDispatch();

    const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }));
  
      // Ajouter le champ Pays seulement si l'utilisateur est un admin et que le rôle agency_manager est sélectionné
      if (e.target.name === 'role' && e.target.value === 'agency_manager' && user.role === 'admin') {
          setFormData(prevState => ({ ...prevState, country: '' })); // Préparer le champ pays
      } else if (e.target.name === 'role' && user.role === 'admin') {
          setFormData(prevState => ({ ...prevState, country: undefined })); // Enlever le champ pays si un autre rôle est sélectionné
      }
  };
  

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        
        if (name === '') {
            errorObj.name = 'Le nom est réquis';
            error = true;
        }
        if (phoneNumber === '') {
            errorObj.phoneNumber = 'Le numéro de téléphone est réquis';
            error = true;
        }
        if (email === '') {
            errorObj.email = 'Le mail est réquis';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(createAction(name, role, phoneNumber, email, country, props.history));
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          role: '',
          country: '',
        });
    }

    const handleSelect = (field) => (value) => {
      setFormData({ ...formData, [field]: value });
    };
  return (
    <Fragment>
      <div className="card">
        <div className="authincation-content">
          <div className="auth-form">
            <h3 className="text-center mb-5">Veuillez saisir les informations de l'utilisateur</h3>
            {props.errorMessage && (
              <div className="text-danger fs-8 mb-4">{props.errorMessage}</div>
            )}
            <form onSubmit={onSignUp}>
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
                    placeholder="Veuillez saisir le nom de l'utilisateur"
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
                    placeholder="Veuillez saisir le numéro de l'utilisateur"
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
                  placeholder="Veuillez saisir l'email de l'utilisateur"
                />
                {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
              </div>
              <div className="form-group mb-3 col-md-6">
              <fieldset className="form-group">
                <label><strong>Rôle</strong></label>
                {user.role === "admin" && (
                <>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          value="admin"
                          onChange={onChange}
                          checked={role === 'admin'} />
                        <label className="form-check-label">Administrateur</label>
                      </div>
                      <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="country_manager"
                            onChange={onChange}
                            checked={role === 'country_manager'} />
                          <label className="form-check-label">Manager Pays</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          value="agency_manager"
                          onChange={onChange}
                          checked={role === 'agency_manager'}
                        />
                        <label className="form-check-label">Manageur Agence</label>
                      </div>
                  </>
                )}
                <div className="form-group mb-3 col-md-6">
                  {role === 'agency_manager' && user.role === 'admin' && (
                      <div className="form-group col-12">
                      <label>
                        <strong>Pays</strong>
                      </label>
                      <CustomSelectCountry
                        options={countries}
                        onSelect={handleSelect('country')}
                      />
                      {errors.country && <div className="text-danger fs-12">{errors.country}</div>}
                    </div>
                  )}
                </div>
              {user.role === "country_manager" && (
                <>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="agency_manager"
                    onChange={onChange}
                    checked={role === 'agency_manager'}
                  />
                  <label className="form-check-label">Manageur Agence</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="agent"
                    onChange={onChange}
                    checked={role === 'agent'}
                  />
                  <label className="form-check-label">Agent</label>
                </div></>)}
              </fieldset>
              </div>
              </div>

              <div className="form-group mb-3 col-md-4">
              <button type="submit" className="btn btn-primary btn-block">
                Ajouter utilisateur
              </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(NewUser);

