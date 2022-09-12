import { React, useState, useReducer, useEffect } from 'react'
import axios from 'axios'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const EmployeeApplication = () => {
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useReducer(formReducer, {})
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async (test) => {
      const localHost = 'http://localhost:4000'
      try {
        const { data: res } = await axios.get(`${localHost}/personalInfoAll`)
        setData(res)
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData('')
  }, [])
  const handleTextChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchData = async (test) => {
      const localHost = 'http://localhost:4000'
      try {
        const { data: res } = await axios.get(
          `${localHost}/personalInfoAll?search=${test}`,
        )
        setData(res)
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData(search)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div className="onboarding-application-wrapper">
        <h2>HR Perosnal Info</h2>
        <h3>total employees: {data.length}</h3>
        <input
          type="text"
          className="input"
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button onClick={handleSubmit}>Search</button>
        {data
          ? data.map((item, key) => (
              <section>
                <ul>
                  <li>user Id :{item.userId}</li>
                  <li>
                    Name : {item.userName ? item.userName.firstName : ''}{' '}
                    {item.userName ? item.userName.lastName : ''}
                  </li>
                  <li>SSN : {item.SSN}</li>
                  <li>
                    Work Authorization Title :{' '}
                    {item.visa ? item.visa.visaType : ''}
                  </li>
                  <li>
                    Phone Number : {item.phone ? item.phone.cellPhone : ''}
                  </li>
                  {/* <li>Email : {item.userName.firstName}</li> */}
                </ul>
              </section>
            ))
          : ''}
      </div>
    </div>
  )
}
export default EmployeeApplication
