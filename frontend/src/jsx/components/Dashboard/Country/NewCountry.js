import React, { useState, Fragment, useEffect } from "react";
import PageTitle from "../../../layouts/PageTitle";
import CustomSelect from './CustomeSelect';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  loadingToggleAction,
  createAction,
  updateAction,
  getCountryByIdAction
} from '../../../../store/actions/countryActions';
import { getUsersAction } from '../../../../store/actions/userActions';
import { toast } from 'react-toastify';

function NewCountry(props) {
  const { id } = useParams();
  
  const history = useHistory();
  const dispatch = useDispatch();

  const initialFormData = {
    name: '',
    manager: '',
    localFeePercentage: 0,
    intFeePercentage: 0
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  
  const { name, manager, localFeePercentage, intFeePercentage } = formData;

  const { users, errorMessage, showLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsersAction());
    if (id) {
      dispatch(getCountryByIdAction(id)).then(country => {
        
        setFormData({
          name: country?.name,
          manager: country?.manager,
          localFeePercentage: country?.localFeePercentage,
          intFeePercentage: country?.intFeePercentage
        });
      });
    }
    return () => {
      dispatch(loadingToggleAction(showLoading));
    };
  }, [id, dispatch, showLoading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSelect = (managerId) => {
    setFormData({ ...formData, manager: managerId });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Le nom est réquis';
    if (!localFeePercentage) newErrors.localFeePercentage = 'Le frais est réquis';
    if (!intFeePercentage) newErrors.intFeePercentage = 'Le frais est réquis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    dispatch(loadingToggleAction(true));

    if (id) {
      dispatch(updateAction(id, name, manager, localFeePercentage, intFeePercentage, history));
      toast.success('Le pays a été mis à jour avec succès!');
    } else {
      dispatch(createAction(name, manager, localFeePercentage, intFeePercentage, history));
      setFormData(initialFormData);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Pays" motherMenu={id ? "Modifier" : "Nouveau"} />
      <div className="card">
        <div className="">
          <div className="row">
            <div className="col-md-12">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h3 className="text-center mb-5">{id ? "Modifier les informations du pays" : "Veuillez saisir les informations du pays"}</h3>
                      {errorMessage && <div className="text-danger fs-8 mb-4">{errorMessage}</div>}
                      <form onSubmit={handleSubmit}>
                        {[
                          { label: "Nom Pays", name: "name", value: name, type: "text", error: errors.name },
                          { label: "Pourcentage National", name: "localFeePercentage", value: localFeePercentage, type: "number", error: errors.localFeePercentage },
                          { label: "Pourcentage International", name: "intFeePercentage", value: intFeePercentage, type: "number", error: errors.intFeePercentage }
                        ].map((field, index) => (
                          <div key={index} className="form-group mb-3 col-md-12">
                            <label className="mb-1"><strong>{field.label}</strong></label>
                            <input
                              type={field.type}
                              className="form-control"
                              name={field.name}
                              value={field.value}
                              onChange={handleChange}
                              placeholder={`Veuillez saisir ${field.label.toLowerCase()}`}
                            />
                            {field.error && <div className="text-danger fs-12">{field.error}</div>}
                          </div>
                        ))}
                        <div className="form-group mb-3 col-md-12">
                          <label className="mb-1"><strong>Manageur</strong></label>
                          <CustomSelect options={users.filter(user => user.role === 'country_manager' && user.agency === null)} onSelect={handleUserSelect} />
                        </div>
                        <div className="row">
                          <div className="form-group mb-3 col-md-4"></div>
                          <div className="form-group mb-3 col-md-4">
                            <button type="submit" className="btn btn-primary btn-block">
                              {id ? "Mettre à jour" : "Ajouter pays"}
                            </button>
                          </div>
                          <div className="form-group mb-3 col-md-4"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.countries.errorMessage,
  successMessage: state.countries.successMessage,
  showLoading: state.countries.showLoading,
});

export default connect(mapStateToProps)(NewCountry);