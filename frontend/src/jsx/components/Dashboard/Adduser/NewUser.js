import React,{useState, Fragment} from "react";
import PageTitle from "../../../layouts/PageTitle";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    createAction,
} from '../../../../store/actions/userActions';


function NewUser(props) {
    let errorsObj = { firstName: '',
    lastName: '',
    login: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: '',
    password2: '', };
    const [errors, setErrors] = useState(errorsObj);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        phoneNumber: '',
        email: '',
        role: '',
        password: '',
        password2: '',
      })
    
    const { firstName, lastName, login, role, phoneNumber, email, password, password2 } = formData

    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (login === '') {
            errorObj.login = 'Le login est réquis';
            error = true;
        }
        if (firstName === '') {
            errorObj.firstName = 'Le nom est réquis';
            error = true;
        }
        if (lastName === '') {
            errorObj.lastName = 'Le prenom est réquis';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Le mot de passe est réquis';
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
        if(password !== password2){
            errorObj.password2 = 'Les mots de passe ne correspondent pas';
            errorObj.password = 'Les mots de passe ne correspondent pas';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(createAction(firstName, lastName, login, role, phoneNumber, email, password, props.history));
    }
  return (
    <Fragment>
         <PageTitle activeMenu="Utilisateur" motherMenu="Nouvel" />
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
					{/* {props.successMessage && (
						<div className=''>
							{props.successMessage}
						</div>
					)} */}

                    <form onSubmit={onSignUp}>
                    <div className="row">
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1 ">
                          <strong>Nom</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id='firstName'
                          name='firstName'
                          value={firstName}
                          onChange={onChange}
                          placeholder="Veuillez saisir le nom de l'utilisateur"
                        />
                        {errors.firstName && <div className="text-danger fs-12">{errors.firstName}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1 ">
                          <strong>Prenom</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id='lastName'
                          name='lastName'
                          value={lastName}
                          onChange={onChange}
                          placeholder="Veuillez saisir le prenom de l'utilisateur"
                        />
                        {errors.lastName && <div className="text-danger fs-12">{errors.lastName}</div>}
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1 ">
                          <strong>Login</strong>
                        </label>
                        <input
							id='login'
                            name='login'
                            value={login}
                            onChange={onChange}
							className="form-control"
							placeholder="Veuillez saisir le login de l'utilisateur"
                        />
                        {errors.login && <div className="text-danger fs-12">{errors.login}</div>}
                      </div>
					  
                      </div>
                      <div className="row mt-4">
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1 ">
                          <strong>Téléphone</strong>
                        </label>
                        <input
							id='phoneNumber'
                            name='phoneNumber'
                            value={phoneNumber}
                            onChange={onChange}
							className="form-control"
							placeholder="Veuillez saisir le numéro de l'utilisateur"
                          //defaultValue="Password"
                        />
                        {errors.phoneNumber && <div className="text-danger fs-12">{errors.phoneNumber}</div>}
                      </div>
                      
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1 ">
                          <strong>Mot de passe</strong>
                        </label>
                        <input
							id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
							className="form-control"
                            type="password"
							placeholder="Veuillez saisir le numéro de l'utilisateur"
                          //defaultValue="Password"
                        />
                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      </div>
					  
                      <div className="form-group mb-3 col-md-4">
                        <label className="mb-1 ">
                          <strong>Confirmer mot de passe</strong>
                        </label>
                        <input
							id='password2'
                            name='password2'
                            value={password2}
                            onChange={onChange}
							className="form-control"
                            type="password"
							placeholder="Veuillez saisir le numéro de l'utilisateur"
                          //defaultValue="Password"
                        />
                        {errors.password2 && <div className="text-danger fs-12">{errors.password2}</div>}
                      </div>
                      
                      </div>
                      <div className="row mt-4">
                      <div className="form-group mb-2 col-md-4">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
							id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
							className="form-control"
							placeholder="Veuillez saisir l'email de l'utilisateur"
                          //defaultValue="Password"
                        />
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      
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
                                    checked={role === 'admin'}
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
                                    checked={role === 'manager'}
                                />
                                <label className="form-check-label">
                                    Manager
                                </label>
                                </div>
                            </div>
                            </div>
                        </fieldset>
                        </div>
                      </div>
                      <div className="row">
                      <div className="form-group mb-3 col-md-4">
                        </div>
                        <div className="form-group mb-3 col-md-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block form-group mb-3 col-md-4"
                        >
                          Ajouter utilisateur
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

export default connect(mapStateToProps)(NewUser);

