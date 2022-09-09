import React from "react";
import axios from "axios";


class VisaHR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "6319a53889857ffd2112069c",
            users: [],
        };
    }

    componentDidMount() {
        const localHost = "http://localhost:4000"
        axios.get(`${localHost}/visaHR`,{
            email: "lishiyu6@msu.edu"
        })
        .then((res)=>{
            // console.log(res.data);
            try{
                this.setState({users: res.data});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    receiptStatus(user, status) {
        const localHost = "http://localhost:4000"
        axios.post(`${localHost}/visa_receipt_status`,{
            // email: "lishiyu6@msu.edu",
            userId: user.userId,
            receipt: {
                status: status,
                link: user.opt_receipt.link,
                name: user.opt_receipt.name,
            }
        })
        .then(async (res) => {
            try{
                await this.setState({users: [res.data]});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    eadStatus(user, status) {
        const localHost = "http://localhost:4000"
        axios.post(`${localHost}/visa_ead_status`,{
            // email: "lishiyu6@msu.edu",
            userId: user.userId,
            ead: {
                status: status,
                link: user.opt_ead.link,
                name: user.opt_ead.name,
            }
        })
        .then(async (res) => {
            try{
                await this.setState({users: [res.data]});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    i983Status(user, status) {
        const localHost = "http://localhost:4000"
        axios.post(`${localHost}/visa_i983_status`,{
            // email: "lishiyu6@msu.edu",
            userId: user.userId,
            i983: {
                status: status,
                link: user.i983.link,
                name: user.i983.name,
            }
        })
        .then(async (res) => {
            try{
                await this.setState({users: [res.data]});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    i20Status(user, status) {
        const localHost = "http://localhost:4000"
        axios.post(`${localHost}/visa_i20_status`,{
            // email: "lishiyu6@msu.edu",
            userId: user.userId,
            i20: {
                status: status,
                link: user.i20.link,
                name: user.i20.name,
            }
        })
        .then(async (res) => {
            console.log(res.data);
            try{
                await this.setState({users: [res.data]});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }
            
    render() {
        return (
            <div className="visa-main">
                <h2>Visa-HR</h2>
                <hr />
                <form>
                    <div className="visa-form-group">
                        <div className="visa-all">
                            <h2>All</h2>
                            {console.log(this.state.users)}
                            {this.state.users.map((user) => {
                                return (
                                    <div className="user-all" key={user.userId+"all"}>
                                        <h3>ID: {user.userId}</h3>
                                        <p>Receipt: </p>
                                        <li><a href={user.opt_receipt.link}>{user.opt_receipt.name}</a></li>
                                        <li>Status: {user.opt_receipt.status}</li>
                                        <button type="button" id="approved-receipt-button" onClick={() => this.receiptStatus(user, "Approved")}>Approved</button>
                                        <button type="button" id="rejected-receipt-button" onClick={() => this.receiptStatus(user, "Rejected")}>Rejected</button>
                                        <p>EAD: </p>
                                        <li><a href={user.opt_ead.link}>{user.opt_ead.name}</a></li>
                                        <li>Status: {user.opt_ead.status}</li>
                                        <button type="button" id="approved-ead-button" onClick={() => this.eadStatus(user, "Approved")}>Approved</button>
                                        <button type="button" id="rejected-ead-button" onClick={() => this.eadStatus(user, "Rejected")}>Rejected</button>
                                        <p>I983: </p>
                                        <li><a href={user.i983.link}>{user.i983.name}</a></li>
                                        <li>Status: {user.i983.status}</li>
                                        <button type="button" id="approved-ead-button" onClick={() => this.i983Status(user, "Approved")}>Approved</button>
                                        <button type="button" id="rejected-ead-button" onClick={() => this.i983Status(user, "Rejected")}>Rejected</button>
                                        <p>I20: </p>
                                        <li><a href={user.i20.link}>{user.i20.name}</a></li>
                                        <li>Status: {user.i20.status}</li>
                                        <button type="button" id="approved-ead-button" onClick={() => this.i20Status(user, "Approved")}>Approved</button>
                                        <button type="button" id="rejected-ead-button" onClick={() => this.i20Status(user, "Rejected")}>Rejected</button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="visa-in-progress">
                            <h2>In Progress</h2>
                            {this.state.users.map((user) => {
                                if(user.i20.status !== "Approved" && user.i20.status !== "Rejected"){
                                    return (
                                        <div className="user-in-progress" key={user.userId+"inprogress"}>
                                            <h3>ID: {user.userId}</h3>
                                            <p>Receipt: </p>
                                            <li><a href={user.opt_receipt.link}>{user.opt_receipt.name}</a></li>
                                            <li>Status: {user.opt_receipt.status}</li>
                                            <button type="button" id="approved-receipt-button" onClick={() => this.receiptStatus(user, "Approved")}>Approved</button>
                                            <button type="button" id="rejected-receipt-button" onClick={() => this.receiptStatus(user, "Rejected")}>Rejected</button>
                                            <p>EAD: </p>
                                            <li><a href={user.opt_ead.link}>{user.opt_ead.name}</a></li>
                                            <li>Status: {user.opt_ead.status}</li>
                                            <button type="button" id="approved-ead-button" onClick={() => this.eadStatus(user, "Approved")}>Approved</button>
                                            <button type="button" id="rejected-ead-button" onClick={() => this.eadStatus(user, "Rejected")}>Rejected</button>
                                            <p>I983: </p>
                                            <li><a href={user.i983.link}>{user.i983.name}</a></li>
                                            <li>Status: {user.i983.status}</li>
                                            <button type="button" id="approved-ead-button" onClick={() => this.i983Status(user, "Approved")}>Approved</button>
                                            <button type="button" id="rejected-ead-button" onClick={() => this.i983Status(user, "Rejected")}>Rejected</button>
                                            <p>I20: </p>
                                            <li><a href={user.i20.link}>{user.i20.name}</a></li>
                                            <li>Status: {user.i20.status}</li>
                                            <button type="button" id="approved-ead-button" onClick={() => this.i20Status(user, "Approved")}>Approved</button>
                                            <button type="button" id="rejected-ead-button" onClick={() => this.i20Status(user, "Rejected")}>Rejected</button>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default VisaHR;