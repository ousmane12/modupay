import React, { useState, useEffect, Fragment } from "react";
import CustomSelect from './CustomeSelect';
import CustomSelectCountry from "./CustomSelectCountry";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
  loadingToggleAction,
  createAction,
  getAgencyByIdAction
} from '../../../../store/actions/agencyActions';
import { fetchUsers } from "../../../../services/userService";
import { fetchCountries } from "../../../../services/countryService";

function NewAgency(props) {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.auth);

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    manager: '',
  });
  const [countries, setCountries] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const { name, country, manager } = formData;
  const errorMessage = useSelector((state) => state.agencies.errorMessage);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const userResponse = await fetchUsers();
        if (isMounted) {
          setUsers(userResponse.data.filter((user) => user.role === 'agency_manager' && user.agency === undefined));
        }

        if (user.role === 'admin') {
          const countryResponse = await fetchCountries();
          if (isMounted) {
            setCountries(countryResponse.data);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données initiales', error);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false; // Marqueur pour annuler les mises à jour
    };
  }, [user.role]); // Dépend seulement de `user.role`

  useEffect(() => {
    if (id) {
      let isMounted = true;

      dispatch(getAgencyByIdAction(id)).then((agency) => {
        if (isMounted) {
          setFormData({
            name: agency.name,
            manager: agency.manager,
            country: agency.country,
          });
        }
      });

      return () => {
        isMounted = false;
      };
    }
  }, [id, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Le nom est requis';
    if (user.role === 'admin' && !country) newErrors.country = 'Le pays est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    
    
    e.preventDefault();
    if (!validateFields()) return;
    if (user.role === 'admin') {
      dispatch(createAction(name, country, manager, props.history));
    } else {
      dispatch(createAction(name, user.country, manager, props.history));
    }
    setFormData({ name: '', country: '', manager: '' });
  };

  return (
    <Fragment>
      <div className="card">
        <div className="authincation-content">
          <div className="auth-form">
            <h3 className="text-center mb-5">
              {id
                ? 'Modifier les informations de l’agence'
                : 'Veuillez saisir les informations de l’agence'}
            </h3>
            <form onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <label>
                  <strong>Nom Agence</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Veuillez saisir le nom de l’agence"
                />
                {errors.name && <div className="text-danger fs-12">{errors.name}</div>}
              </div>
              {user.role === 'admin' && (
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
              <div className="form-group col-12">
                <label>
                  <strong>Manageur</strong>
                </label>
                <CustomSelect options={users} onSelect={handleSelect('manager')} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {id ? 'Mettre à jour' : 'Ajouter Agence'}
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

export default connect(mapStateToProps)(NewAgency);