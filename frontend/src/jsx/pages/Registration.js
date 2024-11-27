import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    setPasswordAction,
} from '../../store/actions/AuthActions';
// image
import logo from "../../images/logo.png";

function PasswordReset(props) {
    const [confirmP, setConfirmP] = useState('');
    let errorsObj = { confirmP: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const { token } = useParams(); // Récupère le token depuis les paramètres de l'URL

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (confirmP === '') {
            errorObj.confirmP = 'La confirmation de mot de passe est requise';
            error = true;
			      swal('Oops', errorObj.confirmP, "error");
        }
        if (password === '') {
            errorObj.password = 'Le mot de passe est requis';
            error = true;
			      swal('Oops', errorObj.password, "error");
        }
        if(password !== confirmP) {
          swal('Oops', "Les deux mots de passe doivent correspondre", "error");
          error = true;
        }
        if (password.trim().length < 12) {
          swal('Oops', "La taille minimale du mot de passe est de 12 caractères", "error");
          error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(setPasswordAction(token, password, props.history));
    }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center">
                      <Link to="/login">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Je crée mon mot de passe</h4>
                    {props.errorMessage && (
                      <div className=''>
                        {props.errorMessage}
                      </div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Mot de passe</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe"
                          name="password"
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                        />
                      </div>
                      
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Confirmer Mot de passe</strong>
                        </label>
                        <input
                          onChange={(e) =>
                            setConfirmP(e.target.value)
                          }
                          className="form-control"
                          placeholder="Confirmer mot de passe"
                          name="confirmP"
                          type="password"
                          //defaultValue="Password"
                        />
                      </div>
					            {errors.setConfirmP && <div>{errors.setConfirmP}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Créer mon compte
                        </button>
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
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(PasswordReset);

