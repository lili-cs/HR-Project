import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { EmailJSResponseStatus } from "emailjs-com";
import emailjs from '@emailjs/browser';

function HiringManagement(){
    // let history = useHistory();
    // const navigate = useNavigate();

    const [pendingApplications, setPendingApplications] = useState([]);
    const [rejectedApplications, setRejectedApplications] = useState([]);
    const [approvedApplications, setApprovedApplications] = useState([]);
    const [emailInvitations, setEmailInvitations] = useState([]);
    const [invitationEmail, setInvitationEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(
        () => {
            getEmailInvitations();
            getApplications();
        },
        []
    );

    const updateEmail = e => {
        setInvitationEmail(e.target.value);
    };

    const updateName = e => {
        setName(e.target.value);
    }

    const  sendEmail = async () => {
        const token = invitationEmail + Date.now();
        const templateId = 'template_xfkplzk';
        const serviceId = 'service_fntxl7m';
        const publicKey = 'user_Z1QwnQCnScRozxezwrBqG';
        const variables = {
            name: name,
            link: 'http://localhost:3000/signup/' + token
        };
        
        try{
            await emailjs.send(serviceId, templateId, variables, publicKey);
            alert('email sent successfully!');

            const body = {
                email: invitationEmail,
                name: name,
                token: token,
                sentTime: Date.now()
            }
            await axios.post('http://localhost:4000/email-invitations', body);
        }
        catch(err){
            console.log(err)
        }
                
    };

    const getEmailInvitations = () => {
        axios.get('http://localhost:4000/email-invitations')
            .then(res => {
                setEmailInvitations(res.data);
            })
            .catch(err => console.log(err));
    };

    const getApplications = () => {
        axios.get('http://localhost:4000/onboarding-applications')
            .then(res => {
                // console.log(res);
                const pending = res.data.filter(item => item.status === 'Pending');
                setPendingApplications(pending);
                const rejected = res.data.filter(item => item.status === 'Rejected');
                setRejectedApplications(rejected);
                const approved = res.data.filter(item => item.status === 'Approved');
                setApprovedApplications(approved);
                console.log(res.data);
            })
            .catch(err => console.log(err));
        // try{
        //     const pendingResults = await axios.get('http://localhost:4000/onboarding-applications/pending');
        //     // const rejectedResults = await axios.get('http://localhost:4000/onboarding-applications/rejected');
        //     // const approvedResults = await axios.get('http://localhost:4000/onboarding-applications/approved');
        //     setPendingApplications(pendingResults);
        //     // setRejectedApplications(rejectedResults);
        //     // setApprovedApplications(approvedResults);
        // }
        // catch(err){
        //     console.log(err);
        // }           
    };

    // const viewApplication = (e) => {
    //     const applicationId = e.target.value;
    //     navigate('/SingleApplicationView', {
    //         state: {
    //             applicationId: applicationId
    //         }
    //     });      
    // };


    return (
        <div className="hiringManagementWrapper">
            <div>
                <p>Email Invitations History ({emailInvitations.length})</p>
                {emailInvitations.length>0 && <table>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Onboarding Application Status</th>
                    </tr>
                    {emailInvitations.map((invitation, index) => {
                        return (
                            <tr key={index}>
                                <td>{invitation.email}</td>
                                <td>{invitation.name}</td>
                                <td>http://localHost:3000/{invitation.token}</td>
                                <td>{invitation.status}</td>
                            </tr>
                        )
                    })}
                    
                </table>}
                
            </div>
            <div>
                <input type='text' placeholder="name" onChange={updateName}></input>
                <input type='text' placeholder="email address" onChange={updateEmail}></input>
                <button onClick={sendEmail}>Generate token and send email</button>
            </div>
            <hr></hr>
            <br></br>

            <h2>Onboarding Application Review</h2>
            <div>
                <p>Pending Applications  ({pendingApplications.length})</p>
                {pendingApplications.length > 0 && <table >
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        {/* <th>View Application</th> */}
                    </tr>               
                    {pendingApplications.map((application, index) => {
                        return (
                           <tr key={index}>
                                {application.userInfoId && application.userInfoId.userName 
                                ? 
                                <td>{application.userInfoId.userName.firstName} {application.userInfoId.userName.middleName} {application.userInfoId.userName.lastName}</td> 
                                :
                                <td></td>
                            }
                                {/* {application.userInfoId && application.userInfoId.userName && } */}
                                <td>{ application.userId.email }</td>
                                {/* <td><button value={application._id} onClick={viewApplication}>View Application</button></td> */}
                                <td><Link to={`/SingleApplicationView/${application._id}`} target='_blank'>View Application</Link> </td>
                           </tr>)
                    })}
                </table>}
            </div>
            <hr></hr>
            <div>
                <p>Rejected Applications ({rejectedApplications.length})</p>
                {rejectedApplications.length > 0 && <table >
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        {/* <th>View Application</th> */}
                    </tr>               
                    {rejectedApplications.map((application, index) => {
                        return (
                           <tr key={index}>
                                {application.userInfoId && application.userInfoId.userName 
                                ? 
                                <td>{application.userInfoId.userName.firstName} {application.userInfoId.userName.middleName} {application.userInfoId.userName.lastName}</td> 
                                :
                                <td></td>
                            }
                                {/* {application.userInfoId && application.userInfoId.userName && } */}
                                <td>{ application.userId.email }</td>
                                {/* <td><button value={application._id} onClick={viewApplication}>View Application</button></td> */}
                                <td><Link to={`/SingleApplicationView/${application._id}`} target='_blank'>View Application</Link> </td>
                           </tr>)
                    })}
                </table>}
            </div>
            <hr></hr>
            <div>
                <p>Approved Applications ({approvedApplications.length})</p>
                {approvedApplications.length > 0 &&  <table >
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        {/* <th>View Application</th> */}
                    </tr>               
                    {approvedApplications.map((application, index) => {
                        return (
                           <tr key={index}>
                                {application.userInfoId && application.userInfoId.userName 
                                ? 
                                <td>{application.userInfoId.userName.firstName} {application.userInfoId.userName.middleName} {application.userInfoId.userName.lastName}</td> 
                                :
                                <td></td>
                            }
                                {/* {application.userInfoId && application.userInfoId.userName && } */}
                                <td>{ application.userId.email }</td>
                                {/* <td><button value={application._id} onClick={viewApplication}>View Application</button></td> */}
                                <td><Link to={`/SingleApplicationView/${application._id}`} target='_blank'>View Application</Link> </td>
                           </tr>)
                    })}
                </table>}
            </div>
            <hr></hr>
        </div>
    );
}


export default HiringManagement;