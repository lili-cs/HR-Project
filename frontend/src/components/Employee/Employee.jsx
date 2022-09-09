import { React, useState, useReducer, useEffect } from 'react'
import axios from 'axios'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const EmployeeApplication = () => {
  const [formData, setFormData] = useReducer(formReducer, {})
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const localHost = 'http://localhost:4000'
      try {
        const { data: res } = await axios.get(`${localHost}/personalInfo`)
        setData(res)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  const handleTextChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleRadioChange = (event) => {}

  return (
    <div>
      <div className="onboarding-application-wrapper">
        <h2>Perosnal Info</h2>
        {/* {submitting && <div>Submitting Form Data...</div>} */}

        {/* {data ? data.map((e) => <p>{e._id}</p>) : ''} */}
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-title">
              <p>Name</p>
              {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
            </div>

            <fieldset>
              <div className="form-row">
                <div class="data-field">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    onChange={handleTextChange}
                    value={data.userName ? data.userName.firstName : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    onChange={handleTextChange}
                    value={data.userName ? data.userName.lastName : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Middle Name</label>
                  <input
                    name="middleName"
                    onChange={handleTextChange}
                    value={data.userName ? data.userName.middleName : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Preferred Name</label>
                  <input
                    name="preferredName"
                    onChange={handleTextChange}
                    value={data.userName ? data.userName.preferredName : ''}
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div class="data-field">
                  <label>Email</label>
                  <input name="email" onChange={handleTextChange}></input>
                </div>
                <div class="data-field">
                  <label>SSN</label>
                  <input
                    name="SSN"
                    onChange={handleTextChange}
                    value={data.SSN ? data.SSN : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="DOB"
                    onChange={handleTextChange}
                    value={data.SSN ? data.SSN : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Gender</label>
                  <select name="gender" onChange={handleTextChange}>
                    <option
                      value="Male"
                      selected={data.gender === 'Male' ? true : ''}
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      selected={data.gender === 'Female' ? true : ''}
                    >
                      Female
                    </option>
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
                <div class="data-field">
                  <label>Street Name</label>
                  <input
                    name="streetName"
                    onChange={handleTextChange}
                    value={data.address ? data.address.streetName : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Building/Apt#</label>
                  <input
                    name="aptNum"
                    onChange={handleTextChange}
                    value={data.address ? data.address.aptNum : ''}
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div class="data-field">
                  <label>City</label>
                  <input
                    name="city"
                    onChange={handleTextChange}
                    value={data.address ? data.address.city : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>State</label>
                  <input
                    name="state"
                    onChange={handleTextChange}
                    value={data.address ? data.address.state : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Zip Code</label>
                  <input
                    name="zip"
                    onChange={handleTextChange}
                    value={data.address ? data.address.zip : ''}
                  ></input>
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
                <div class="data-field">
                  <label>Cell Phone</label>
                  <input
                    name="cellphone"
                    onChange={handleTextChange}
                    value={data.phone ? data.phone.cellPhone : ''}
                  ></input>
                </div>
                <div class="data-field">
                  <label>Work Phone</label>
                  <input
                    name="workphone"
                    onChange={handleTextChange}
                    value={data.phone ? data.phone.workPhone : ''}
                  ></input>
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
                <div class="data-field">
                  <label>First Name</label>
                  <input
                    name="emer_contact_firstName"
                    onChange={handleTextChange}
                    value={
                      data.emergencyContact
                        ? data.emergencyContact.name.firstName
                        : ''
                    }
                  ></input>
                </div>
                <div class="data-field">
                  <label>Last Name</label>
                  <input
                    name="emer_contact_lastName"
                    onChange={handleTextChange}
                    value={
                      data.emergencyContact
                        ? data.emergencyContact.name.lastName
                        : ''
                    }
                  ></input>
                </div>
                <div class="data-field">
                  <label>Middle Name</label>
                  <input
                    name="emer_contact_middleName"
                    onChange={handleTextChange}
                    value={
                      data.emergencyContact
                        ? data.emergencyContact.name.middleName
                        : ''
                    }
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div class="data-field">
                  <label>Email</label>
                  <input
                    name="emer_contact_email"
                    onChange={handleTextChange}
                    value={
                      data.emergencyContact ? data.emergencyContact.email : ''
                    }
                  ></input>
                </div>
                <div class="data-field">
                  <label>Phone</label>
                  <input
                    name="emer_contact_phone"
                    onChange={handleTextChange}
                    value={
                      data.emergencyContact ? data.emergencyContact.phone : ''
                    }
                  ></input>
                </div>
                <div class="data-field">
                  <label>Relationship</label>
                  <input
                    name="emer_contact_relationship"
                    onChange={handleTextChange}
                    value={
                      data.emergencyContact
                        ? data.emergencyContact.relationship
                        : ''
                    }
                  ></input>
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
              <div class="data-field">
                <label>Visa Type</label>
                <input
                  name="emer_contact_relationship"
                  onChange={handleTextChange}
                  value={data.visa ? data.visa.visaType : ''}
                ></input>

                <label>Visa Start Date</label>
                <input
                  name="emer_contact_relationship"
                  onChange={handleTextChange}
                  value={data.visa ? data.visa.startDate : ''}
                ></input>
                <label>Visa End Date</label>
                <input
                  name="emer_contact_relationship"
                  onChange={handleTextChange}
                  value={data.visa ? data.visa.endDate : ''}
                ></input>
              </div>
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
              <input
                type="radio"
                name="hasDriverLicense"
                value="true"
                onChange={handleRadioChange}
              />
              <label>No</label>
              <input
                type="radio"
                name="hasDriverLicense"
                value="false"
                onChange={handleRadioChange}
              />

              {formData.hasDriverLicense === true && (
                <div>
                  <label>License Number</label>
                  <input
                    type="text"
                    name="driver_license_number"
                    onChange={handleTextChange}
                  />
                  <label>Expiration Date</label>
                  <input
                    type="date"
                    name="driver_license_expiration_date"
                    onChange={handleTextChange}
                  />
                </div>
              )}
            </fieldset>
          </div>

          <div>
            <div className="form-title">
              <p>Uploaded Files</p>
              {/* {editting ? <button type='button' > Edit </button> : <button type='button' > Save </button>} */}
            </div>

            <fieldset></fieldset>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
export default EmployeeApplication
