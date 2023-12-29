import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  updateUserAction,
} from '../../../../store/actions/userActions';
import PageTitle from "../../../layouts/PageTitle";

function EditUser(props) {
    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      login: '',
      phoneNumber: '',
      email: '',
      password: '',
      role: '',
      password2: '',
    });
  
    const [formData, setFormData] = useState({
      id: '',
      firstName: '',
      lastName: '',
      login: '',
      phoneNumber: '',
      email: '',
      role: '',
      password: '',
      password2: '',
    });
  
    useEffect(() => {
      // Check if user data is available in the location state
      if (props.location.state && props.location.state.user) {
        const { _id, firstName, lastName, login, phoneNumber, email, role } = props.location.state.user;
        setFormData({
          id: _id || '',
          firstName: firstName || '',
          lastName: lastName || '',
          login: login || '',
          phoneNumber: phoneNumber || '',
          email: email || '',
          role: role || 'admin',
          password: '',  // Exclude password from editing or handle it differently
          password2: '',
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
  
      if (formData.login === '') {
        errorObj.login = 'Le login est réquis';
        error = true;
    }
    if (formData.firstName === '') {
        errorObj.firstName = 'Le nom est réquis';
        error = true;
    }
    if (formData.lastName === '') {
        errorObj.lastName = 'Le prenom est réquis';
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
  <PageTitle activeMenu="Utilisateur" motherMenu="Modifier" />
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
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={onChange}
                          placeholder="Veuillez saisir le nom de l'utilisateur"
                        />
                        {errors.firstName && <div className="text-danger fs-12">{errors.firstName}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1">
                          <strong>Prénom</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={onChange}
                          placeholder="Veuillez saisir le prenom de l'utilisateur"
                        />
                        {errors.lastName && <div className="text-danger fs-12">{errors.lastName}</div>}
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
                    {!['user'].includes(formData.role) && (
                    <div className="row mt-4">
                      <div className="form-group mb-3 col-md-6">
                        <label className="mb-1">
                          <strong>Login</strong>
                        </label>
                        <input
                          id="login"
                          name="login"
                          value={formData.login}
                          onChange={onChange}
                          className="form-control"
                          placeholder="Veuillez saisir le login de l'utilisateur"
                        />
                        {errors.login && <div className="text-danger fs-12">{errors.login}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-6">
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
                      <div className="form-group mb-3 col-md-6 mt-4">
                        <label className="mb-1">
                          <strong>Reinitialiser mot de passe</strong>
                        </label>
                        <input
                          id="password"
                          name="password"
                          onChange={onChange}
                          className="form-control"
                          placeholder="Veuillez saisir le nouveau mot de passe de l'utilisateur"
                        />
                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-6 mt-4">
                        <label className="mb-1">
                          <strong>Confirmer mot de passe</strong>
                        </label>
                        <input
                          id="password"
                          name="password2"
                          onChange={onChange}
                          value={formData.password2}
                          className="form-control"
                          placeholder="Veuillez confirmer le nouveau mot de passe de l'utilisateur"
                        />
                        {errors.password2 && <div className="text-danger fs-12">{errors.password2}</div>}
                      </div>
                    </div>
                     )}
                    <div className="form-group mb-3 col-md-4">
                        <fieldset className="form-group">
                            <div className="form-group mb-3 col-md-4">
                            <label className="mb-1">
                            <strong>Rôle</strong>
                            </label>
                            <div className="col-sm-9">
                                <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id='roleAd'
                                    name='role'
                                    value="admin"
                                    onChange={onChange}
                                    defaultChecked={true}
                                    checked={formData.role === 'admin'}
                                />
                                <label className="form-check-label">
                                    Administrateur
                                </label>
                                </div>
                                <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id='roleMan'
                                    name='role'
                                    value="manager"
                                    onChange={onChange}
                                    checked={formData.role === 'manager'}
                                />
                                <label className="form-check-label">
                                    Manager
                                </label>
                                </div>
                                <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id='roleMan'
                                    name='role'
                                    value="user"
                                    onChange={onChange}
                                    checked={formData.role === 'user'}
                                />
                                <label className="form-check-label">
                                    Client
                                </label>
                                </div>
                            </div>
                            </div>
                        </fieldset>
                        </div>
                    
                    <div className="row">
                      <div className="form-group mb-3 col-md-4"></div>
                      <div className="form-group mb-3 col-md-4">
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
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(EditUser);
