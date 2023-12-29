import React,{useState, Fragment} from "react";
import PageTitle from "../../../layouts/PageTitle";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    createClientAction,
} from '../../../../store/actions/userActions';


function AddClient(props) {
    let errorsObj = { firstName: '',
    lastName: '',
    phoneNumber: '', };
    const [errors, setErrors] = useState(errorsObj);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: 'user',
      })
    
    const { firstName, lastName, role, phoneNumber } = formData

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
        if (firstName === '') {
            errorObj.firstName = 'Le nom est réquis';
            error = true;
        }
        if (lastName === '') {
            errorObj.lastName = 'Le prenom est réquis';
            error = true;
        }
        if (phoneNumber === '') {
            errorObj.password = 'Le numéro de téléphone est réquis';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(createClientAction(firstName, lastName, role, phoneNumber, props.history));
    }
  return (
    <Fragment>
         <PageTitle activeMenu="Client" motherMenu="Nouveau" />
    <div className="card">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h3 className="text-center mb-5">Veuillez saisir les informations du client</h3>
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
                      </div>
                      <div className="row mt-4">
                      
                      </div>
                      <div className="row">
                      <div className="form-group mb-3 col-md-4">
                        </div>
                        <div className="form-group mb-3 col-md-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block form-group mb-3 col-md-4"
                        >
                          Ajouter client
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

export default connect(mapStateToProps)(AddClient);

