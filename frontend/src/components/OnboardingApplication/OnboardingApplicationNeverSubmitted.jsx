import React, { useReducer, useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { uploadFile } from 'react-s3';
// require('dotenv').config();

// const S3_BUCKET = 'hr-project-beaconfire';
const S3_BUCKET = 'hrprojectbucket';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIA4CWBNUZZOLWQ3AWP';
const SECRET_ACCESS_KEY = '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';
// const S3_BUCKET = process.env.S3_BUCKET;
// const REGION = process.env.REGION;
// const ACCESS_KEY = process.env.ACCESS_KEY;
// const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;


const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
};

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
};

function OnboardingApplicationNeverSubmitted() {
    const { userName } = useParams();
    const navigate = useNavigate();

    // const [submittingName, setSubmittingName] = useState(false);
    const [visaTypeOther, setVisaTypeOther] = useState(false);
    const [isF1, setIsF1] = useState(false);
    const [ formData, setFormData ] = useReducer(formReducer, {});
    const [picturePreview, setPicturePreview] = useState();
    const [profilePicture, setProfilePicture] = useState();
    const [driverLicenseCopy, setDriverLicenseCopy] = useState(null);
    const [OPTReceiptCopy, setOPTReceiptCopy] = useState(null);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);

    const handleTextChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        });
    };

    const handleRadioChange = event => {
        if(event.target.checked){
            if(event.target.name === 'isCitizenOrGreencard' || event.target.name === 'hasDriverLicense'){
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
                return;
            }
            if(event.target.name === 'visaType'){
                if(event.target.value === 'F1'){
                    setIsF1(true);
                }
                else{
                    setIsF1(false);
                }
                if(event.target.value === 'other'){
                    setVisaTypeOther(true);
                }
                else{
                    setVisaTypeOther(false);
                }

                    setFormData({
                        name: event.target.name,
                        value: event.target.value
                    });
                

                return;
            }
        }
        else{
            setFormData({
                name: event.target.name,
                value: ''
            });
        }
    };

    const handleFileInput = (event) => {
        if(event.target.name === 'OPT-file'){
            setOPTReceiptCopy(event.target.files[0]);
        }

        if(event.target.name === 'driver_license_copyDoc'){
            setDriverLicenseCopy(event.target.files[0]);
        }

        if(event.target.name === 'profilePicture'){
            setProfilePicture(event.target.files[0]);
            setPicturePreview(URL.createObjectURL(event.target.files[0]));
        }
    };


    // const uploadFile = async () => {
    //     if(driverLicenseCopy){
    //         const response = await uploadFile(driverLicenseCopy, config);
    //         console.log(response);

    //         const location = response.result.url + driverLicenseCopy.name;
    //         setUploadedDocuments([...uploadedDocuments, location]);

    //     }
    //     if(OPTReceiptCopy){
    //         const response2 = await uploadFile(OPTReceiptCopy, config);
    //         console.log(response2);
    //         const location2 = response2.result.url + OPTReceiptCopy.name;
    //         setUploadedDocuments([...uploadedDocuments, location2]);
    //     }
    // };

    const uploadProfilePicture = async () =>{
        if(profilePicture){
            try{
                const response = await uploadFile(profilePicture, config);
                console.log(response);
                if(response.result.ok){
                    console.log('uploaded profile picture');
                }
                // const location = response.result.url + profilePicture.name;
                setUploadedDocuments([...uploadedDocuments, response.location]);
            }
            catch(err){
                console.log(err);
            }
        }
    };

    const uploadDriverLicenseCopy = async () => {
        if(driverLicenseCopy){
            try{
                const response = await uploadFile(driverLicenseCopy, config);
                console.log(response);
                if(response.result.ok){
                    console.log('uploaded driver license copy');
                }
    
                // const location = response.result.url + driverLicenseCopy.name;
                setUploadedDocuments([...uploadedDocuments, response.location]);
            }
            catch(err){
                console.log(err);
            }
        }
    };

    const uploadOPTCopy = async () => {
        if(OPTReceiptCopy){
            try{
                const response = await uploadFile(OPTReceiptCopy, config);
                console.log(response);
                if(response.result.ok){
                    console.log('uploaded OPT Receipt');
                }
                // const location2 = response2.result.url + OPTReceiptCopy.name;
                setUploadedDocuments([...uploadedDocuments, response.location]);
            }
            catch(err){
                console.log(err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setSubmitting(true);
        // const userId = localStorage.getItem('userId');
        // const userId = '63196efaf0ccf12c5be573cb';
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

        // const documents = [];

        try{
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
                documents: uploadedDocuments,
                car: car,
                driverLicense: driverLicense,
                reference: reference
            };
            
            const res = await axios.post(`http://localhost:4000/onboarding-application/add/${userName}`, 
            newApplication,
            //  {headers: {'Content-Type': 'multipart/form-data'}}
             );
            console.log(res);
            if(res.status === 200){
                alert('application submitted succsessfully!');
                return navigate(`/OnboardingApplication/Pending/${userName}`);
            }        
        }
        catch(err){
            console.log(err);
        }
    };

    // const handleVisaTypeOther = () => {
    //     setVisaTypeOther(!visaTypeOther);
    // };


    return(
        <div className="onboarding-application-wrapper">
            <h2>Onboarding Application (Never Submitted)</h2>
            {/* {submitting && <div>Submitting Form Data...</div>} */}

            <form onSubmit={handleSubmit}>
                <div className="profilePictureWrapper">
                            {/* <label>Add profile picture</label> */}
                        <div className="profilePicture"><img alt='Profile Picture' src={picturePreview}></img></div>
                            <input type='file' id='profilePicture' name='profilePicture' onChange={handleFileInput}></input>
                            <button type='button' onClick={uploadProfilePicture}>Upload</button>
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
                                <input required name = 'firstName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Last Name</label>
                                <input  required name = 'lastName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Middle Name</label>
                                <input  name = 'middleName' onChange={handleTextChange}></input>
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
                                <input  required name = 'SSN' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Date of Birth</label>
                                <input  required type='date' name = 'DOB' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Gender</label>
                                <select name='gender' onChange={handleTextChange}>
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
                                <input required  name = 'streetName' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Building/Apt#</label>
                                <input required  name = 'aptNum' onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                        <div class='data-field'>
                                <label>City</label>
                                <input required name = 'city' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>State</label>
                                <input  required name = 'state' onChange={handleTextChange}></input>
                            </div>
                            <div class='data-field'>
                                <label>Zip Code</label>
                                <input  required name = 'zip' onChange={handleTextChange}></input>
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
                                <input  required  name = 'cellphone' onChange={handleTextChange}></input>
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
                        <p>Visa Status</p>
                    </div>

                    <fieldset>
                        <p>Are you a citizen or permanent resident of the U.S.?</p>
                        <label>Yes</label>
                        <input  required type='radio' name='isCitizenOrGreencard' value="true" onChange={handleRadioChange}/>
                        <label>No</label>
                        <input type='radio' name='isCitizenOrGreencard' value="false" onChange={handleRadioChange} />

                        {formData.isCitizenOrGreencard === true &&
                            <div>
                                <label>Green Card</label>
                                <input  required type='radio' name='visaType' value='Green Card' onChange={handleRadioChange} />
                                <label>Citizen</label>
                                <input type='radio' name='visaType' value='Citizen' onChange={handleRadioChange}/>
                            </div>
                        }
                        {   
                            formData.isCitizenOrGreencard === false &&
                            <div>
                                <p>What is your work authorization?</p>
                                <div>
                                    <label>H1-B</label>
                                    <input  required  type='radio' name='visaType' value='H1-B' onChange={handleRadioChange} />
                                </div>
                                <div>
                                    <label>L2</label>
                                    <input type='radio' name='visaType' value='L2' onChange={handleRadioChange} />
                                </div>
                                <div>
                                    <label>F1(CPT/OPT)</label>
                                    <input type='radio' name='visaType' value='F1' onChange={handleRadioChange} />
                                    {isF1 &&
                                    <div>
                                        <label>Upload your OPT receipt</label>
                                        <input type='file' name='OPT-file' onChange={handleFileInput} ></input>
                                        <button type='button' onChange={uploadOPTCopy}>Upload</button>
                                    </div>
                                }
                                </div>
                                <div>
                                    <label>Other</label>
                                    <input type='radio' name='visaType' checked={visaTypeOther} value='Other' onChange={handleRadioChange} />
                                    { visaTypeOther &&
                                    <input type='text' name ='visaType' onChange={handleTextChange} />}
                                </div>
                               <hr></hr>
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
                        <input  required type='radio' name='hasDriverLicense' value="true" onChange={handleRadioChange}/>
                        <label>No</label>
                        <input type='radio' name='hasDriverLicense' value="false" onChange={handleRadioChange} />

                        {formData.hasDriverLicense === true &&
                            <div>
                                <label>License Number</label>
                                <input  required type='text' name='driver_license_number' onChange={handleTextChange} />
                                <label>Expiration Date</label>
                                <input  required type='date' name='driver_license_expiration_date'  onChange={handleTextChange}/>
                                <hr></hr>
                                <label> Upload driver license</label>
                                <input type='file' name='driver_license_copyDoc' onChange={handleFileInput}></input>
                                <button onChange={uploadDriverLicenseCopy}>Upload</button>
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
                        <input  required type='text' name='reference_firstName' onChange={handleTextChange}/>
                        <label>Last Name</label>
                        <input  required type='text' name='reference_lastName' onChange={handleTextChange} />
                        <label>Middle Name</label>
                        <input type='text' name='reference_middleName' onChange={handleTextChange} />
                        <label>Phone</label>
                        <input  required type='text' name='reference_phone' onChange={handleTextChange} />
                        <label>Email</label>
                        <input required  type='text' name='reference_email' onChange={handleTextChange} />
                        <label>Relationship</label>
                        <input  required type='text' name='reference_relationship' onChange={handleTextChange} />                   
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

                <button type='submit'>Submit</button>
            </form>
        </div> 
    )
}

export default OnboardingApplicationNeverSubmitted;