import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function SingleApplicationView() {
    // const [rejected, setRejected] = useState(false);
    // const [status, setStatus] = useState();
    const [application, setApplication] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [feedback, setFeedback] = useState('');

    const { applicationId } = useParams();
    console.log(applicationId);

    useEffect(
        () => {
            getApplication();
        },
        []
    );
    // const applicationId = '631a5cb00712a3fe70aa321f';
    const getApplication = () => {
        const url = 'http://localhost:4000/onboarding-applications/application/' + applicationId;
        axios.get(url)
            .then(res => {
                // console.log(res);
                setApplication(res.data);
                setLoaded(true);
                // setStatus(application.status);
                setFeedback(res.data.feedback);
                console.log(res.data);
            })
            .catch(err => console.log(err));        
    };


    const updateApplication = (e) => {
        let body = {status: e.target.value}
        if(e.target.value === 'Rejected'){
            body = {status: e.target.value, feedback: feedback}
        }
        axios.put('http://localhost:4000/onboarding-applications/'+applicationId, body)
            .then(res => {
                console.log('application approved');
                alert('application approved');


            })
            .catch(err => console.log(err));
    };


    if(!loaded){
        return;
    }

    return(
        <div className="onboarding-application-wrapper">
            <h2>Onboarding Application</h2>

            <form>
                <div>
                    <div className="form-title">
                        <p>Name</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>First Name</label>
                                  <input disabled name = 'firstName' value={application.userInfoId.userName && application.userInfoId.userName.firstName}></input>
                            </div>
                            <div class='data-field'>
                                <label>Last Name</label>
                                  <input disabled name = 'lastName' value={application.userInfoId.userName && application.userInfoId.userName.lastName}></input>
                            </div>
                            <div class='data-field'>
                                <label>Middle Name</label>
                                  <input disabled name = 'middleName' 
                                value={application.userInfoId.userName && application.userInfoId.userName.middleName}
                                ></input>
                            </div>
                            <div class='data-field'>
                                <label>Preferred Name</label>
                                  <input disabled name = 'preferredName'  
                                value={application.userInfoId.userName && application.userInfoId.userName.preferredName}
                                ></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Email</label>
                                  <input disabled name = 'email' value={application.userId.email} ></input>
                            </div>
                            <div class='data-field'>
                                <label>SSN</label>
                                  <input disabled name = 'SSN' value={application.userInfoId.SSN} ></input>
                            </div>
                            <div class='data-field'>
                                <label>Date of Birth</label>
                                  <input disabled type='text' name = 'DOB' value={application.userInfoId.DOB}  ></input>
                            </div>

                            <div class='data-field'>
                                <label>Gender: {application.userInfoId.gender}</label>
                            </div>
                        </div>

                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Current Address</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Street Name</label>
                                  <input disabled name = 'streetName'  value={application.userInfoId.address && application.userInfoId.address.streetName}></input>
                            </div>
                            <div class='data-field'>
                                <label>Building/Apt#</label>
                                  <input disabled name = 'aptNum' value={application.userInfoId.address.aptNum} ></input>
                            </div>
                        </div>
                        <div className="form-row">
                        <div class='data-field'>
                                <label>City</label>
                                  <input disabled name = 'city'  value={application.userInfoId.address.city}></input>
                            </div>
                            <div class='data-field'>
                                <label>State</label>
                                  <input disabled name = 'state'  value={application.userInfoId.address.state}></input>
                            </div>
                            <div class='data-field'>
                                <label>Zip Code</label>
                                  <input disabled name = 'zip'  value={application.userInfoId.address.zip}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Contact Info</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Cell Phone</label>
                                  <input disabled name = 'cellphone'  value={application.userInfoId.phone.cellPhone}></input>
                            </div>
                            <div class='data-field'>
                                <label>Work Phone</label>
                                  <input disabled name = 'workphone'  value={application.userInfoId.phone.workPhone}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Car Info</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Make</label>
                                  <input disabled name = 'car_make' value={application.car && application.car.make} ></input>
                            </div>
                            <div class='data-field'>
                                <label>Model</label>
                                  <input disabled name = 'car_model' value={application.car && application.car.model} ></input>
                            </div>
                            <div class='data-field'>
                                <label>Color</label>
                                  <input disabled name = 'car_color' value={application.car && application.car.color} ></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Emergency Contacts</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>First Name</label>
                                  <input disabled name = 'emer_contact_firstName' value={application.userInfoId.emergencyContact.name.firstName} ></input>
                            </div>
                            <div class='data-field'>
                                <label>Last Name</label>
                                  <input disabled name = 'emer_contact_lastName' value={application.userInfoId.emergencyContact.name.lastName} ></input>
                            </div>
                            <div class='data-field'>
                                <label>Middle Name</label>
                                  <input disabled name = 'emer_contact_middleName'  value={application.userInfoId.emergencyContact.name.middleName}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Email</label>
                                  <input disabled name = 'emer_contact_email' value={application.userInfoId.emergencyContact.email} ></input>
                            </div>
                            <div class='data-field'>
                                <label>Phone</label>
                                  <input disabled name = 'emer_contact_phone'  value={application.userInfoId.emergencyContact.phone}></input>
                            </div>
                            <div class='data-field'>
                                <label>Relationship</label>
                                  <input disabled name = 'emer_contact_relationship'  value={application.userInfoId.emergencyContact.relationship}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Visa Status</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <label>Visa Type: {application.userInfoId.visa.visaType}</label>
                            <label>Start Date: {application.userInfoId.visa.startDate}</label>
                            <label>End Date: {application.userInfoId.visa.endDate}</label>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Driver's License</p>
                    </div>

                    <fieldset>
                        <div className="form-row">
                            {application.driverLicense && <label>License Number: {application.driverLicense.number}</label>}
                            {application.driverLicense && <label>Expiration Date: {application.driverLicense.expirationDate}</label>}
                            {application.driverLicense && <label>Document: {application.driverLicense.copyDoc}</label>}
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form_title">
                        <p>Reference</p>
                    </div>

                    <fieldset>
                        <p>Who referred you to this company?</p>
                        <label>First Name</label>
                          <input disabled type='text' name='reference_firstName' value={application.reference.firstName} />
                        <label>Last Name</label>
                          <input disabled type='text' name='reference_lastName'  value={application.reference.lastName} />
                        <label>Middle Name</label>
                          <input disabled type='text' name='reference_middleName'  value={application.reference.middleName} />
                        <label>Phone</label>
                          <input disabled type='text' name='reference_phone' value={application.reference.phone}  />
                        <label>Email</label>
                          <input disabled type='text' name='reference_email'  value={application.reference.email} />
                        <label>Relationship</label>
                          <input disabled type='text' name='reference_relationship' value={application.reference.relationship}  />                   
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Uploaded Files</p>
                    </div>

                    <fieldset>
            
                    </fieldset>
                </div>
                <div>
                    <p>Current Application Status:  {application.status}</p>
                </div>
                {application.status === 'Pending' && <div>
                    <button type='button' value='Approved' onClick={updateApplication}>Approve</button>
                    <button type='button' value='Rejected' onClick={updateApplication}>Reject</button>
                    <div>
                        <p>Add Feedback for Rejection</p>
                        <textarea value={feedback} onChange={e => setFeedback(e.target.value)}></textarea>
                    </div>
                    </div>}
            </form>
        </div> 
    )
}


export default SingleApplicationView;