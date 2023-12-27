import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

// image
import logo from "../../images/logo-white.png";
import logoWhite from "../../images/logo-whiite-text.png";
import loginbg from "../../images/bg-login.jpg";

function Login (props) {
  
    let errorsObj = { login: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);

    const [formData, setFormData] = useState({
      login: '',
      password: '',
    })
    const { email, password } = formData

    const dispatch = useDispatch();

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }  

    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Le login est requis';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Le mot de passe est requis';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
          return ;
        }
		    dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, props.history));
    }

  return (
		<div className="login-main-page" style={{backgroundImage:"url("+ loginbg +")"}}>
            <div className="login-wrapper">
                <div className="login-aside-left" >
                    <Link to={"#"} className="login-logo">
                        <img src={logo} alt="" width="50px"/>
                        <img src={logoWhite} alt="" className="ms-3"/>
                      </Link>
                    <div className="login-description">
                        <h2 className="main-title mb-2">Bienvenue sur ModuPay</h2>
                        <p className="">Votre plateforme de suivi de vos transferts</p>
                        <ul className="social-icons mt-4">
                            <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
                            <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
                            <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li>
                        </ul>
                        <div className="mt-5 bottom-privacy">
                            <Link to={"#"} className="">© 2024 besstech</Link>
                        </div>
                    </div>
                </div>
                <div className="login-aside-right">
                    <div className="row m-0 justify-content-center h-100 align-items-center">
                      <div className="p-5">
                        <div className="authincation-content">
                          <div className="row no-gutters">
                            <div className="col-xl-12">
                              <div className="auth-form-1">
                                <div className="mb-4">
                                    <h3 className="dz-title mb-1">Authentification</h3>
                                    <p className="">Veuillez fournir vos informations d'Authentification</p>
                                </div>
                                {props.errorMessage && (
                                    <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                                        {props.errorMessage}
                                    </div>
                                )}
                                {props.successMessage && (
                                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                                        {props.successMessage}
                                    </div>
                                )}
                                <form onSubmit={onLogin}>
                                    <div className="form-group">
                                        <label className="mb-2 ">
                                          <strong>Login</strong>
                                        </label>
                                        <input type="text" className="form-control"
                                          id='email'
                                          name='email'
                                          value={email}
                                          onChange={onChange}
										   placeholder="Veuillez saisir votre login"
                                        />
                                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2 "><strong>Mot de Passe</strong></label>
                                        <input
                                          type="password"
                                          className="form-control"
                                          id='password'
                                          name='password'
                                          value={password}
										  placeholder="Veuillez saisir votre mot de passe"
                                            onChange={onChange}
                                        />
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                    </div>
                                  <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    
                                  </div>
                                  <div className="text-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary btn-block"
                                    >
                                      Se Connecter
                                    </button>
                                  </div>
                                </form>
                                <div className="new-account mt-2">
                                  <p className="">
                                    Mot de passe oublié ?{" "}
                                    <Link className="text-primary" to="./page-register">
                                      Reinitialiser
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);
