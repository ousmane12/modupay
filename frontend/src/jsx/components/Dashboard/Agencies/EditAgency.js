import React, { useState, useEffect, Fragment } from "react";
import CustomSelect from './CustomeSelect';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
  updateAgencyAction,
} from '../../../../store/actions/agencyActions';
import {
  getUsersAction
} from '../../../../store/actions/userActions';

function EditAgency(props) {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    manager: '',
  });
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.auth.auth);

  const { name, country, manager } = formData;

 /*  const { users, countries, errorMessage, successMessage, showLoading } = useSelector((state) => ({
    users: state.users,
    countries: state.countries,
    errorMessage: state.agencies.errorMessage,
    successMessage: state.agencies.successMessage,
    showLoading: state.agencies.showLoading
  })); */

  // Utilisation de `useSelector` pour récupérer `users`, `countries`, et les messages séparément
const users = useSelector((state) => state.users.users);

const errorMessage = useSelector((state) => state.agencies.errorMessage);

const countries = useSelector((state) => state.countries.countries);

useEffect(() => {
  dispatch(getUsersAction());
}, [countries, dispatch]);

useEffect(() => {
    // Check if user data is available in the location state
    if (props.location.state && props.location.state.agency) {
      const { _id, name, country, manager } = props.location.state.agency;
      setFormData({
        id: _id || '',
        name: name || '',
        country: country || '',
        manager: manager || '',
      });
    }
  }, [props.location.state]);

const onChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSelect = (field) => (value) => {
  setFormData({ ...formData, [field]: value });
};

const validateFields = () => {
  const newErrors = {};
  if (!name) newErrors.name = 'Le nom est requis';
  if (!country) newErrors.country = 'Le pays est requis';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const onSubmit = (e) => {
  e.preventDefault();
  if (!validateFields()) return;
  dispatch(updateAgencyAction(formData, id, history));
};

return (
  <Fragment>
    <div className="card">
      <div className="authincation-content">
        <div className="auth-form">
          <h3 className="text-center mb-5">
            {id ? "Modifier les informations de l'agence" : "Veuillez saisir les informations de l'agence"}
          </h3>
          {errorMessage && <div className="text-danger fs-8 mb-4">{errorMessage}</div>}
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <label><strong>Nom Agence</strong></label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Veuillez saisir le nom de l'agence"
              />
              {errors.name && <div className="text-danger fs-12">{errors.name}</div>}
            </div>
            {user.role === 'admin' && 
            <div className="form-group mb-3">
              <label><strong>Pays</strong></label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={country.name}
                readOnly
                placeholder="Veuillez saisir le nom de l'agence"
              />
            </div>}
            <div className="form-group col-12">
              <label><strong>Manageur</strong></label>
              <CustomSelect options={users} value={manager._id} onSelect={handleSelect('manager')} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {id ? "Mettre à jour" : "Ajouter Agence"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </Fragment>
);
}

const mapStateToProps = (state) => ({
  errorMessage: state.agencies.errorMessage,
  successMessage: state.agencies.successMessage,
  showLoading: state.agencies.showLoading,
});

export default connect(mapStateToProps)(EditAgency);