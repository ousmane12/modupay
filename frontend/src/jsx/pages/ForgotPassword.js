import React , { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { forgotPasswordAction, loadingToggleAction,
} from '../../store/actions/AuthActions';
// image
import logo from "../../images/logo.png";
const ForgotPassword = (props) => {
  let errorsObj = { email: ''};
    const [errors, setErrors] = useState(errorsObj);

    const [formData, setFormData] = useState({
      email: ''
    })
    const { email } = formData

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
            errorObj.email = 'Le mail est requis';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
          return ;
        }
		    dispatch(loadingToggleAction(true));	
        dispatch(forgotPasswordAction(email, props.history));
        setFormData({email: ''});
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
                    <div className="">
                      <Link to="/login">
                        <img src={logo} alt=""/>
                      </Link>
                    </div>
                    <h4 className="text-center">Mot de passe oublié</h4>
                    <form onSubmit={onLogin}>
                      <div className="form-group">
                        <label className="mb-2">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name='email'
                          value={email}
                          onChange={onChange}
                        />
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Soumettre
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

export default ForgotPassword;
