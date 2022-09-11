import React, { useReducer, useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
};

function OnboardingApplicationRejected() {
    const { userName, applicationStatus } = useParams();

    // const [submittingName, setSubmittingName] = useState(false);
    let [visaTypeOther, setVisaTypeOther] = useState(false);
    const [ formData, setFormData ] = useReducer(formReducer, {});
    const [picturePreview, setPicturePreview] = useState();
    const [application, setApplication] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(
        () => {
            getApplication();
        },
        []
    );


    const getApplication = () => {

        const url = 'http://localhost:4000/onboarding-applications/' + userName;
        axios.get(url)
            .then(res => {
                // console.log(res);
                setApplication(res.data);
                setLoaded(true);
                // setStatus(application.status);
                // setFeedback(res.data.feedback);
                console.log(res.data);
            })
            .catch(err => console.log(err));        
    };

    const handleTextChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        });
    };

    const handlePictureChange = event => {
        console.log(event.target.files);
        setFormData({
            name: event.target.name,
            value: event.target.files[0]
        });
        setPicturePreview(URL.createObjectURL(event.target.files[0]));
    }

    const handleRadioChange = event => {
        if(event.target.name === 'isCitizenOrGreencard' || event.target.name === 'hasDriverLicense'){
            if(event.target.checked){
                if(event.target.value === 'true'){
                    setFormData({
                        name: event.target.name,
                        value: true
                    });
                    return;
                }
                if(event.target.value === 'false'){
                    setFormData({
                        name: event.target.name,
                        value: false
                    });
                }            
            }
            return;
        }
        if(event.target.name === 'visaType'){
            if(event.target.value === 'other'){

            }
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        // setSubmitting(true);
        // const userId = localStorage.getItem('userId');
        const userId = '63196efaf0ccf12c5be573cb';
        const userNames = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName, 
            preferredName: formData.preferredName
        };
        const address = {
            aptNum: formData.aptNum,
            streetName: formData.streetName,
            city: formData.city,
            state: formData.state,
            zip: formData.zip
        };
        const phone = {
            cellphone: formData.cellphone,
            workphone: formData.workphone
        };
        const visa = {
            visaType: formData.visaType,
            startDate: formData.visa_start_date,
            endDate: formData.visa_end_date
        };
        const emergencyContact = {
            name: {
                firstName: formData.emerency_firstName1,
                lastName: formData.emerency_lastName1,
                middleName: formData.emerency_middleName1,
                preferredName: formData.emerency_preferredName1
            },
            phone: formData.emerency_phone1,
            email: formData.emerency_email1,
            relationship: formData.emerency_relationship1
        };

        const car = {
            make: formData.car_make,
            model: formData.car_model,
            color: formData.car_color
        };

        let driverLicense = null;
        if(formData.hasDriverLicense){
            driverLicense = {
                number: formData.driver_license_number,
                expirationDate: formData.driver_license_expiration_date,
                copyDoc: null
            }
        }

        const reference = {
            firstName: formData.reference_firstName,
            lastName: formData.reference_lastName,
            middleName: formData.reference_middleName,
            phone: formData.reference_phone,
            email: formData.reference_email,
            relationship: formData.reference_relationship
        }

        const documents = [];

        const newApplication = {
            userNames: userNames,
            profilePicture: formData.profilePicture,
            SSN: formData.SSN,
            DOB: formData.DOB,
            gender: formData.gender,
            address: address,
            phone: phone,
            visa: visa,
            emergencyContact: emergencyContact,
            documents: documents,
            car: car,
            driverLicense: driverLicense,
            reference: reference
        };


        axios.post(`http://localhost:4000/onboarding-application/add/${userId}`, newApplication)
            .then(response => console.log(response))
            .catch(err => {
                console.log(err);
            })
    };

    const handleVisaTypeOther = () => {
        setVisaTypeOther(!visaTypeOther);
    };

    if(!loaded){
        return;
    }

    return(
        <div className="onboarding-application-wrapper">
            <h2>Onboarding Application (Rejected)</h2>
            {/* {submitting && <div>Submitting Form Data...</div>} */}
            {applicationStatus === 'Pending' &&
            <p>Please wait for HR to review your application</p>}

            <form onSubmit={handleSubmit}>
                <div className="profilePictureWrapper">
                            {/* <label>Add profile picture</label> */}
                        <div className="profilePicture"><img alt='Profile Picture' src={picturePreview}></img></div>
                            <input type='file' name='profilePicture' value={application.userInfoId.profilePicture} onChange={handlePictureChange}></input>
                        </div>
                <div>
                    <div className="form-title form-row" >
                        <p>Name</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>


                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>First Name</label>
                                <input required name = 'firstName' value={application.userInfoId.userName && application.userInfoId.userName.firstName} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Last Name</label>
                                <input  required name = 'lastName' value={application.userInfoId.userName && application.userInfoId.userName.lastName} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Middle Name</label>
                                <input  name = 'middleName' value={application.userInfoId.userName && application.userInfoId.userName.middleName} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Preferred Name</label>
                                <input name = 'preferredName' value={application.userInfoId.userName && application.userInfoId.userName.preferredName} onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Email</label>
                                <input name = 'email' value={application.userId.email} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>SSN</label>
                                <input  required name = 'SSN' value={application.userInfoId.SSN} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Date of Birth</label>
                                <input  required type='date' name = 'DOB' value={application.userInfoId.DOB} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Gender</label>
                                <select name='gender' value={application.userInfoId.gender} onChange={handleTextChange}>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='I do not wish to answer'>I do not want to answer</option>
                                </select>
                                {/* <input name = 'gender' onChange={handleTextChange}></input> */}
                            </div>
                        </div>

                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Current Address</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Street Name</label>
                                <input required  name = 'streetName' value={application.userInfoId.address && application.userInfoId.address.streetName} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Building/Apt#</label>
                                <input required  name = 'aptNum' value={application.userInfoId.address && application.userInfoId.address.aptNum} onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                        <div class='data-field'>
                                <label>City</label>
                                <input required name = 'city' value={application.userInfoId.address && application.userInfoId.address.city} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>State</label>
                                <input  required name = 'state' value={application.userInfoId.address && application.userInfoId.address.state} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Zip Code</label>
                                <input  required name = 'zip' value={application.userInfoId.address && application.userInfoId.address.zip} onChange={handleTextChange}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Contact Info</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Cell Phone</label>
                                <input  required  name = 'cellphone' value={application.userInfoId.phone && application.userInfoId.phone.cellPhone} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Work Phone</label>
                                <input name = 'workphone'  value={application.userInfoId.phone && application.userInfoId.phone.workPhone} onChange={handleTextChange}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Car Info</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Make</label>
                                <input name = 'car_make' value={application.car && application.car.make} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Model</label>
                                <input name = 'car_model' value={application.car && application.car.model} onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Color</label>
                                <input name = 'car_color' value={application.car && application.car.color} onChange={handleTextChange}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div>
                    <div className="form-title">
                        <p>Visa Status</p>
                    </div>

                    <fieldset>
                        <p>Are you a citizen or permanent resident of the U.S.?</p>
                        <label>Yes</label>
                        <input  required type='radio' name='isCitizenOrGreencard' value="true" 
                        checked={application.userInfoId.visa && (application.userInfoId.visa.visaType === 'Green Card' || application.userInfoId.visa.visaType === 'Citizen')}
                        onChange={handleRadioChange}/>
                        <label>No</label>
                        <input type='radio' name='isCitizenOrGreencard' value="false" 
                        checked={application.userInfoId.visa && (application.userInfoId.visa.visaType !== 'Green Card' && application.userInfoId.visa.visaType !== 'Citizen')}
                        onChange={handleRadioChange} />

                        {formData.isCitizenOrGreencard === true &&
                            <div>
                                <label>Green Card</label>
                                <input  required type='radio' name='visaType' value='greenCard' 
                                checked={application.userInfoId.visa && application.userInfoId.visa.visaType === 'Green Card'}
                                onChange={handleRadioChange} />
                                <label>Citizen</label>
                                <input type='radio' name='visaType' value='citizen' 
                                checked={application.userInfoId.visa && application.userInfoId.visa.visaType === 'Citizen'}
                                onChange={handleRadioChange}/>
                            </div>
                        }
                        {   
                            formData.isCitizenOrGreencard === false &&
                            <div>
                                <p>What is your work authorization?</p>

                                <label>H1-B</label>
                                <input  required  type='radio' name='visaType' value='H1-B' 
                                checked={application.userInfoId.visa && application.userInfoId.visa.visaType === 'H1-B'}
                                 onChange={handleRadioChange} />

                                <label>L2</label>
                                <input type='radio' name='visaType' value='L2' 
                                checked={application.userInfoId.visa && application.userInfoId.visa.visaType === 'L2'}
                                onChange={handleRadioChange} />

                                <label>F1(CPT/OPT)</label>
                                <input type='radio' name='visaType' value='F1' 
                                checked={application.userInfoId.visa && application.userInfoId.visa.visaType === 'F1'}
                                onChange={handleRadioChange} />

                                <label>Other</label>
                                <input type='radio' name='visaType' value='other' 
                                checked={
                                    application.userInfoId.visa && 
                                    application.userInfoId.visa.visaType !== 'Green Card' &&
                                    application.userInfoId.visa.visaType !== 'Citizen' &&
                                    application.userInfoId.visa.visaType !== 'H1B' &&
                                    application.userInfoId.visa.visaType !== 'L2' &&
                                    application.userInfoId.visa.visaType !== 'F1'
                                }
                                onChange={handleVisaTypeOther} />
                                { visaTypeOther &&
                                    <input type='text' name ='visaType' value={application.userInfoId.visa && application.userInfoId.visa.visaType} onChange={handleTextChange} />}
                                <label>Start Date</label>
                                <input type='date' name='visa_start_date' value={application.userInfoId.visa && application.userInfoId.visa.startDate} onChange={handleTextChange}></input>
                                <label>End Date</label>
                                <input type='date' name='visa_end_date' value={application.userInfoId.visa && application.userInfoId.visa.endDate} onChange={handleTextChange}></input>
                            </div>
                        }
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Driver's License</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <p>Do you have a driver's license?</p>
                        <label>Yes</label>
                        <input  required type='radio' name='hasDriverLicense' value="true" 
                        checked={application.driverLicense }
                        onChange={handleRadioChange}/>
                        <label>No</label>
                        <input type='radio' name='hasDriverLicense' value="false" 
                            checked={!application.driverLicense }
                        onChange={handleRadioChange} />

                        {formData.hasDriverLicense === true &&
                            <div>
                                <label>License Number</label>
                                <input  required type='text' name='driver_license_number' value={application.driverLicense && application.driverLicense.number} onChange={handleTextChange} />
                                <label>Expiration Date</label>
                                <input  required type='date' name='driver_license_expiration_date' value={application.driverLicense && application.driverLicense.expirationDate} onChange={handleTextChange}/>
                            </div>
                        }
                      
                    </fieldset>
                </div>
                <div>
                    <div className="form_title">
                        <p>Reference</p>
                    </div>

                    <fieldset>
                        <p>Who referred you to this company?</p>
                        <label>First Name</label>
                        <input  required type='text' name='reference_firstName' value={application.reference && application.reference.firstName} onChange={handleTextChange}/>
                        <label>Last Name</label>
                        <input  required type='text' name='reference_lastName' value={application.reference && application.reference.lastName} onChange={handleTextChange} />
                        <label>Middle Name</label>
                        <input type='text' name='reference_middleName' value={application.reference && application.reference.middleName} onChange={handleTextChange} />
                        <label>Phone</label>
                        <input  required type='text' name='reference_phone'  value={application.reference && application.reference.phone} onChange={handleTextChange} />
                        <label>Email</label>
                        <input required  type='text' name='reference_email' value={application.reference && application.reference.email} onChange={handleTextChange} />
                        <label>Relationship</label>
                        <input  required type='text' name='reference_relationship'  value={application.reference && application.reference.relationship} onChange={handleTextChange} />                   
                    </fieldset>
                </div>
                <div>
                    <div className="form_title">
                        <p>Emergency Contacts</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <div>
                            {/* <p>Contact 1</p> */}
                            <label>First Name</label>
                            <input type='text' name='emerency_firstName1'  value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.name.firstName} onChange={handleTextChange}/>
                            <label>Last Name</label>
                            <input type='text' name='emerency_lastName1' value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.name.lastName}  onChange={handleTextChange} />
                            <label>Middle Name</label>
                            <input type='text' name='emerency_middleName1'  value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.name.middleName} onChange={handleTextChange} />
                            <label>Preferred Name</label>
                            <input type='text' name='emerency_preferredName1'  value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.name.preferredName} onChange={handleTextChange} />
                            <label>Phone</label>
                            <input type='text' name='emerency_phone1'   value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.phone} onChange={handleTextChange} />
                            <label>Email</label>
                            <input type='text' name='emerency_email1'   value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.email} onChange={handleTextChange} />
                            <label>Relationship</label>
                            <input type='text' name='emerency_relationship1'   value={application.userInfoId.emergencyContact && application.userInfoId.emergencyContact.relationship} onChange={handleTextChange} />  
                        </div>
                        {/* <br></br> */}
                        {/* <div>
                            <p>Contact 2</p>
                            <label>First Name</label>
                            <input type='text' name='reference_firstName2' onChange={handleTextChange}/>
                            <label>Last Name</label>
                            <input type='text' name='reference_lastName2' onChange={handleTextChange} />
                            <label>Middle Name</label>
                            <input type='text' name='reference_middleName2' onChange={handleTextChange} />
                            <label>Phone</label>
                            <input type='text' name='reference_phone2' onChange={handleTextChange} />
                            <label>Email</label>
                            <input type='text' name='reference_email2' onChange={handleTextChange} />
                            <label>Relationship</label>
                            <input type='text' name='reference_relationship2' onChange={handleTextChange} />  
                        </div>                */}
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Uploaded Files</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
            
                    </fieldset>
                </div>
                <div>
                    <label>Rejection Feedback</label>
                    <textarea disabled={true} value={application.feedback}>Feedback</textarea>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div> 
    )
}

export default OnboardingApplicationRejected;