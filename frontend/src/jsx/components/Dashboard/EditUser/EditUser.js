import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  loadingToggleAction,
  updateUserAction,
} from '../../../../store/actions/userActions';

function EditUser(props) {
    const user = useSelector(state => state.auth.auth);
    const [errors, setErrors] = useState({
      name: '',
      phoneNumber: '',
      email: '',
      role: '',
    });
  
    const [formData, setFormData] = useState({
      id: '',
      name: '',
      phoneNumber: '',
      email: '',
      role: '',
    });
  
    useEffect(() => {
      // Check if user data is available in the location state
      if (props.location.state && props.location.state.user) {
        const { _id, name, phoneNumber, email, role } = props.location.state.user;
        setFormData({
          id: _id || '',
          name: name || '',
          phoneNumber: phoneNumber || '',
          email: email || '',
          role: role || '',
        });
      }
    }, [props.location.state]);
  
    const dispatch = useDispatch();
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const onSignUp = (e) => {
      e.preventDefault();
      let error = false;
      const errorObj = { ...errors };
  
      
    if (formData.name === '') {
        errorObj.name = 'Le nom est réquis';
        error = true;
    }
    if (formData.phoneNumber === '') {
        errorObj.password = 'Le numéro de téléphone est réquis';
        error = true;
    }  
    setErrors(errorObj);
  
    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(updateUserAction(formData, formData.id, props.history));  // Use the appropriate action for updating user
};
  return (
    <Fragment>
  <div className="card">
    <div className="">
      <div className="row">
        <div className="col-md-12">
          <div className="authincation-content">
            <div className="row no-gutters">
              <div className="col-xl-12">
                <div className="auth-form">
                  <h3 className="text-center mb-5">Veuillez saisir les informations de l'utilisateur</h3>
                  {props.errorMessage && (
                    <div className="text-danger fs-8 mb-4">
                      {props.errorMessage}
                    </div>
                  )}
                  <form onSubmit={onSignUp}>
                    <div className="row">
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1">
                          <strong>Nom</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={onChange}
                          placeholder="Veuillez saisir le nom de l'utilisateur"
                        />
                        {errors.name && <div className="text-danger fs-12">{errors.name}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={onChange}
                          placeholder="Veuillez saisir le mail de l'utilisateur"
                        />
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1">
                          <strong>Téléphone</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.phoneNumber}
                          onChange={onChange}
                          placeholder="Veuillez saisir le telephone de l'utilisateur"
                        />
                        {errors.phoneNumber && <div className="text-danger fs-12">{errors.phoneNumber}</div>}
                      </div>
                    </div>
                     
                  
                    <div className="form-group mb-3 col-md-4">
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
                            checked={formData.role === 'admin'}
                          />
                          <label className="form-check-label">Administrateur</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="country_manager"
                            onChange={onChange}
                            checked={formData.role === 'country_manager'}
                          />
                          <label className="form-check-label">Manager Pays</label>
                        </div></>)}
                        {user.role === "country_manager" && (<>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="agency_manager"
                            onChange={onChange}
                            checked={formData.role === 'agency_manager'}
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
                            checked={formData.role === 'agent'}
                          />
                          <label className="form-check-label">Agent</label>
                        </div></>)}
                      </fieldset>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-md-4"></div>
                      <div className="form-group mb-3 col-md-4 mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block form-group mb-3 col-md-4"
                        >
                          Modifier utilisateur
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
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.users.errorMessage,
        successMessage: state.users.successMessage,
        showLoading: state.users.showLoading,
    };
};

export default connect(mapStateToProps)(EditUser);
