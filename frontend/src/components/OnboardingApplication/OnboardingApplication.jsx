import React, { useReducer, useState } from "react";
import axios from 'axios';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
};

function OnboardingApplication() {
    // const [submittingName, setSubmittingName] = useState(false);
    let [visaTypeOther, setVisaTypeOther] = useState(false);
    const [ formData, setFormData ] = useReducer(formReducer, {});

    const handleTextChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        });
    };

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
            profilePicture: null,
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

    return(
        <div className="onboarding-application-wrapper">
            <h2>Onboarding Application</h2>
            {/* {submitting && <div>Submitting Form Data...</div>} */}

            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-title">
                        <p>Name</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>First Name</label>
                                <input name = 'firstName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Last Name</label>
                                <input name = 'lastName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Middle Name</label>
                                <input name = 'middleName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Preferred Name</label>
                                <input name = 'preferredName' onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Email</label>
                                <input name = 'email' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>SSN</label>
                                <input name = 'SSN' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Date of Birth</label>
                                <input type='date' name = 'DOB' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Gender</label>
                                <select name='gender' onChange={handleTextChange}>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
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
                                <input name = 'streetName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Building/Apt#</label>
                                <input name = 'aptNum' onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                        <div class='data-field'>
                                <label>City</label>
                                <input name = 'city' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>State</label>
                                <input name = 'state' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Zip Code</label>
                                <input name = 'zip' onChange={handleTextChange}></input>
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
                                <input name = 'cellphone' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Work Phone</label>
                                <input name = 'workphone' onChange={handleTextChange}></input>
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
                                <input name = 'car_make' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Model</label>
                                <input name = 'car_model' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Color</label>
                                <input name = 'car_color' onChange={handleTextChange}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Emergency Contacts</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>First Name</label>
                                <input name = 'emer_contact_firstName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Last Name</label>
                                <input name = 'emer_contact_lastName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Middle Name</label>
                                <input name = 'emer_contact_middleName' onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class='data-field'>
                                <label>Email</label>
                                <input name = 'emer_contact_email' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Phone</label>
                                <input name = 'emer_contact_phone' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Relationship</label>
                                <input name = 'emer_contact_relationship' onChange={handleTextChange}></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <div className="form-title">
                        <p>Visa Status</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <p>Are you a citizen or permanent resident of the U.S.?</p>
                        <label>Yes</label>
                        <input type='radio' name='isCitizenOrGreencard' value="true" onChange={handleRadioChange}/>
                        <label>No</label>
                        <input type='radio' name='isCitizenOrGreencard' value="false" onChange={handleRadioChange} />

                        {formData.isCitizenOrGreencard === true &&
                            <div>
                                <label>Green Card</label>
                                <input type='radio' name='visaType' value='greenCard' onChange={handleRadioChange} />
                                <label>Citizen</label>
                                <input type='radio' name='visaType' value='citizen' onChange={handleRadioChange}/>
                            </div>
                        }
                        {   
                            formData.isCitizenOrGreencard === false &&
                            <div>
                                <p>What is your work authorization?</p>
                                <label>H1-B</label>
                                <input type='radio' name='visaType' value='H1-B' onChange={handleRadioChange} />
                                <label>L2</label>
                                <input type='radio' name='visaType' value='L2' onChange={handleRadioChange} />
                                <label>F1(CPT/OPT)</label>
                                <input type='radio' name='visaType' value='F1' onChange={handleRadioChange} />
                                <label>Other</label>
                                <input type='radio' name='visaType' checked={visaTypeOther} value='other' onChange={handleVisaTypeOther} />
                                { visaTypeOther &&
                                    <input type='text' name ='visaType' onChange={handleTextChange} />}
                                <label>Start Date</label>
                                <input type='date' name='visa_start_date' onChange={handleTextChange}></input>
                                <label>End Date</label>
                                <input type='date' name='visa_end_date' onChange={handleTextChange}></input>
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
                        <input type='radio' name='hasDriverLicense' value="true" onChange={handleRadioChange}/>
                        <label>No</label>
                        <input type='radio' name='hasDriverLicense' value="false" onChange={handleRadioChange} />

                        {formData.hasDriverLicense === true &&
                            <div>
                                <label>License Number</label>
                                <input type='text' name='driver_license_number' onChange={handleTextChange} />
                                <label>Expiration Date</label>
                                <input type='date' name='driver_license_expiration_date'  onChange={handleTextChange}/>
                            </div>
                        }
                      
                    </fieldset>
                </div>
                <div>
                    <div className="form_title">
                        <p>Reference</p>
                        {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
                    </div>

                    <fieldset>
                        <p>Who referred you to this company?</p>
                        <label>First Name</label>
                        <input type='text' name='reference_firstName' onChange={handleTextChange}/>
                        <label>Last Name</label>
                        <input type='text' name='reference_lastName' onChange={handleTextChange} />
                        <label>Middle Name</label>
                        <input type='text' name='reference_middleName' onChange={handleTextChange} />
                        <label>Phone</label>
                        <input type='text' name='reference_phone' onChange={handleTextChange} />
                        <label>Email</label>
                        <input type='text' name='reference_email' onChange={handleTextChange} />
                        <label>Relationship</label>
                        <input type='text' name='reference_relationship' onChange={handleTextChange} />                   
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
                            <input type='text' name='emerency_firstName1' onChange={handleTextChange}/>
                            <label>Last Name</label>
                            <input type='text' name='emerency_lastName1' onChange={handleTextChange} />
                            <label>Middle Name</label>
                            <input type='text' name='emerency_middleName1' onChange={handleTextChange} />
                            <label>Preferred Name</label>
                            <input type='text' name='emerency_preferredName1' onChange={handleTextChange} />
                            <label>Phone</label>
                            <input type='text' name='emerency_phone1' onChange={handleTextChange} />
                            <label>Email</label>
                            <input type='text' name='emerency_email1' onChange={handleTextChange} />
                            <label>Relationship</label>
                            <input type='text' name='emerency_relationship1' onChange={handleTextChange} />  
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
                <button type='submit'>Submit</button>
            </form>
        </div> 
    )
}

export default OnboardingApplication;