import React, { Fragment, useState, useReducer } from "react";
import { Button, Dropdown, Modal, Tab, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
//** Import Image */
import profile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";

const initialState = false;
const reducer = (state, action) =>{
	switch (action.type){
		case 'sendMessage':
			return { ...state, sendMessage: !state.sendMessage }		
		case 'postModal':
			return { ...state, post: !state.post }		
		case 'linkModal':
			return { ...state, link: !state.link }		
		case 'cameraModal':
			return { ...state, camera: !state.camera }		
		case 'replyModal':
			return { ...state, reply: !state.reply }
		default:
			return state	
	}	
}

const AppProfile = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
    const location = useLocation();
    const user = useSelector(state => state.auth.auth);
 
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };


  return (
    <Fragment>
      <PageTitle activeMenu="Profil" motherMenu="Utilisateur" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                {user && (
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{user.firstName} {user.lastName}</h4>
                    <p>{user.role}</p>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        	
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
					<Tab.Container defaultActiveKey='Setting'>					
						<Nav as='ul' className="nav nav-tabs">
							<Nav.Item as='li' className="nav-item">
								<Nav.Link to="#profile-settings" eventKey='Setting'>Détails</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content>
							<Tab.Pane id="profile-settings" eventKey='Setting'>
								<div className="pt-3">
									<div className="settings-form">
										<form onSubmit={(e) => e.preventDefault()}>
                                        {user && (
											<div className="row">
												<div className="form-group mb-3 col-md-6">
													<label className="form-label" >Nom</label>
													<input type="email" readOnly value={user.firstName} className="form-control"/>
												</div>
                                                
												<div className="form-group mb-3 col-md-6">
													<label className="form-label">Prenom</label>
													<input type="text" readOnly value={user.lastName} className="form-control"/>
												</div>
											</div>
                                            )}
                                            {user && (
											<div className="form-group mb-3">
												<label className="form-label">Telephone</label>
												<input type="text" readOnly value={user.phoneNumber} className="form-control"/>
											</div>
                                            )}
											<div className="form-group mb-3">
												<label className="form-label">Role</label>
												<input type="text" readOnly value={user.role} className="form-control"/>
											</div>
                                            
										</form>
									</div>
								</div>
							</Tab.Pane>
						</Tab.Content>	
					</Tab.Container>		
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
	  {/* send Modal */}
	  	<Modal className="modal fade" show={state.sendMessage} onHide={()=>dispatch({type:'sendMessage'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Send Message</h5>
					<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'sendMessage'})}>
						
					</Button>
				</div>
				<div className="modal-body">
					<form className="comment-form" onSubmit={(e) => { e.preventDefault(); dispatch({type:'sendMessage'}); }}>
						<div className="row">
							<div className="col-lg-6">
								<div className="form-group mb-3">
									<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
									<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-3">
									<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
									<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<label htmlFor="comment" className="text-black font-w600">Comment</label>
									<textarea rows={8} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	  {/* Post Modal */}
	  	<Modal show={state.post} className="modal fade" id="postModal" onHide={() => dispatch({type:'postModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Post</h5>
					<Button variant=""  type="button" className="close" data-dismiss="modal" onClick={() => dispatch({type:'postModal'})} >
						<span>×</span>
					</Button>
					
				</div>
				<div className="modal-body">
					<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""}/>
					<Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
				</div>
			</div>
		</Modal>
		 {/* Link Modal */}
	  	<Modal show={state.link}  className="modal fade post-input" id="linkModal" onHide={() => dispatch({type:'linkModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Social Links</h5>
					<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'linkModal'})}>
					</button>
				</div>
				<div className="modal-body">
					<Link className="btn-social me-1 facebook" to="/app-profile"><i className="fab fa-facebook-f" /></Link>
					<Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fab fa-google-plus" /></Link>
					<Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fab fa-linkedin" /></Link>
					<Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fab fa-instagram" /></Link>
					<Link className="btn-social me-1 twitter" to="/app-profile"><i className="fab fa-twitter" /></Link>
					<Link className="btn-social me-1 youtube" to="/app-profile"><i className="fab fa-youtube" /></Link>
					<Link className="btn-social whatsapp" to="/app-profile"><i className="fab fa-whatsapp" /></Link>
				</div>
			</div>
		</Modal>
		 {/* Camera Modal */}
	 	 <Modal show={state.camera}  className="modal fade" id="cameraModal" onHide={() => dispatch({type:'cameraModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Upload images</h5>
					<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'cameraModal'})}>
					</button>
				</div>
				<div className="modal-body">
					<div className="input-group mb-3">
							<span className="input-group-text">Upload</span>
						<div className="form-file">
							<input type="file" className="form-file-input"/>
						</div>
					</div>
				</div>
			</div>
		</Modal>
		 {/* Reply Modal */}
	  	<Modal   show={state.reply}  className="modal fade" id="replyModal" onHide={()=>dispatch({type:'replyModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Post Reply</h5>
					<button type="button" className="btn-close"  onClick={() => dispatch({type:'replyModal'})}></button>
				</div>
				<div className="modal-body">
					<form>
						{/* <textarea className="form-control" rows="4" >Message</textarea> */}
						<Form.Control as="textarea" rows="4"  placeholder="Message"/>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-danger light"  onClick={() => dispatch({type:'replyModal'})}>Close</button>
					<button type="button" className="btn btn-primary">Reply</button>
				</div>
			</div>
		</Modal>
    </Fragment>
  );
};

export default AppProfile;
