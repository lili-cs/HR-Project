import React from "react";
import axios from "axios";

class VisaHR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "6319a53889857ffd2112069c",
            users: [],
            userInfos: [],
            search: "",
        };
    }

    async componentDidMount() {
        const localHost = "http://localhost:4000"
        await axios.get(`${localHost}/visaHR`,{
            email: "lishiyu6@msu.edu"
        })
        .then((res)=>{
            // console.log(res.data.visa);
            // console.log(res.data.userInfos);
            try{
                this.setState({
                    users: res.data.visa,
                    userInfos: res.data.userInfos,
                });
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    async receiptStatus(user, status) {
        const localHost = "http://localhost:4000"
        await axios.post(`${localHost}/visa_receipt_status`,{
            userId: user.userId,
            receipt: {
                status: status,
                link: user.opt_receipt.link,
                name: user.opt_receipt.name,
            }
        })
        .then(async (res) => {
            try{
                await this.setState({users: res.data});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    async eadStatus(user, status) {
        const localHost = "http://localhost:4000"
        await axios.post(`${localHost}/visa_ead_status`,{
            userId: user.userId,
            ead: {
                status: status,
                link: user.opt_ead.link,
                name: user.opt_ead.name,
            }
        })
        .then(async (res) => {
            try{
                await this.setState({users: res.data});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    async i983Status(user, status) {
        const localHost = "http://localhost:4000"
        await axios.post(`${localHost}/visa_i983_status`,{
            userId: user.userId,
            i983: {
                status: status,
                link: user.i983.link,
                name: user.i983.name,
            }
        })
        .then(async (res) => {
            try{
                await this.setState({users: res.data});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    async i20Status(user, status) {
        const localHost = "http://localhost:4000"
        await axios.post(`${localHost}/visa_i20_status`,{
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
                await this.setState({users: res.data});
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }

    async searchChanges(e) {
        await this.setState({search: e.target.value});
    }

    async updateSearch(e) {
        // console.log(this.state.search);
        const localHost = "http://localhost:4000"
        await axios.post(`${localHost}/visaHR_search`,{
            search: this.state.search,
        })
        .then((res)=>{
            try{
                this.setState({
                    users: res.data.newVisa,
                    userInfos: res.data.userInfos,
                });
            }
            catch(err){
                console.log(err);
            }
            console.log(res.data);
        })
        .catch((error)=>{ // error caught
            console.log("error: ", error);
        })
    }
            
    render() {
        return (
            <div className="visa-main">
                <h2>Visa-HR</h2>
                <input type="text" className="visa-form-control" placeholder="Search" onChange={(e) => {this.searchChanges(e)}}/>
                <button type="button" className="visa-btn visa-btn-primary" onClick={(e) => {this.updateSearch(e)}}>Search</button>      
                <hr />
                <form>
                    <div className="visa-form-group">
                        <div className="visa-all">
                            <h2>All</h2>
                            {console.log(this.state.users)}
                            {this.state.users.map((user, index) => {
                                return (
                                    <div className="user-all" key={user.userId+"all"}>
                                            <div className="user-info">
                                            <h4>First Name: {this.state.userInfos[index].username.firstName}</h4>
                                            <h4>MiddleName: {this.state.userInfos[index].username.middleName}</h4>
                                            <h4>LastName: {this.state.userInfos[index].username.lastName}</h4>
                                            <h4>PreferredName: {this.state.userInfos[index].username.preferredName}</h4>
                                        </div>
                                        <h4>Work Authorization: {this.state.userInfos[index].visa}</h4>
                                        {/* <h3>ID: {user.userId}</h3> */}
                                        <p>Receipt: </p>
                                        <li><a href={user.opt_receipt.link}>{user.opt_receipt.name}</a></li>
                                        <li>Status: {user.opt_receipt.status}</li>
                                        <button type="button" id="approved-receipt-button" onClick={() => this.receiptStatus(user, "Approved. Please upload a copy of your OPT EAD.")}>Approved</button>
                                        <button type="button" id="rejected-receipt-button" onClick={() => this.receiptStatus(user, "Rejected. Please re-submit your OPT Receipt.")}>Rejected</button>
                                        <p>EAD: </p>
                                        <li><a href={user.opt_ead.link}>{user.opt_ead.name}</a></li>
                                        <li>Status: {user.opt_ead.status}</li>
                                        <button type="button" id="approved-ead-button" onClick={() => this.eadStatus(user, "Approved. Please upload a copy of your I-983.")}>Approved</button>
                                        <button type="button" id="rejected-ead-button" onClick={() => this.eadStatus(user, "Rejected. Please re-submit your OPT EAD.")}>Rejected</button>
                                        <p>I983: </p>
                                        <li><a href={user.i983.link}>{user.i983.name}</a></li>
                                        <li>Status: {user.i983.status}</li>
                                        <button type="button" id="approved-ead-button" onClick={() => this.i983Status(user, "Approved. Please upload a copy of your I-20.")}>Approved</button>
                                        <button type="button" id="rejected-ead-button" onClick={() => this.i983Status(user, "Rejected. Please re-submit your I-983.")}>Rejected</button>
                                        <p>I20: </p>
                                        <li><a href={user.i20.link}>{user.i20.name}</a></li>
                                        <li>Status: {user.i20.status}</li>
                                        <button type="button" id="approved-ead-button" onClick={() => this.i20Status(user, "All documents have bean approved.")}>Approved</button>
                                        <button type="button" id="rejected-ead-button" onClick={() => this.i20Status(user, "Rejected. Please re-submit your I-20.")}>Rejected</button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="visa-in-progress">
                            <h2>In Progress</h2>
                            {this.state.users.map((user, index) => {
                                if(user.i20.status !== "All documents have bean approved."){
                                    return (
                                            <div className="user-in-progress" key={user.userId+"inprogress"}>
                                                <div className="user-info">
                                                <h4>First Name: {this.state.userInfos[index].username.firstName}</h4>
                                                <h4>MiddleName: {this.state.userInfos[index].username.middleName}</h4>
                                                <h4>LastName: {this.state.userInfos[index].username.lastName}</h4>
                                                <h4>PreferredName: {this.state.userInfos[index].username.preferredName}</h4>
                                            </div>
                                            <h4>Work Authorization: {this.state.userInfos[index].visa}</h4>
                                            {/* <h3>ID: {user.userId}</h3> */}
                                            <p>Receipt: </p>
                                            <li><a href={user.opt_receipt.link}>{user.opt_receipt.name}</a></li>
                                            <li>Status: {user.opt_receipt.status}</li>
                                            <button type="button" id="approved-receipt-button" onClick={() => this.receiptStatus(user, "Approved. Please upload a copy of your OPT EAD.")}>Approved</button>
                                            <button type="button" id="rejected-receipt-button" onClick={() => this.receiptStatus(user, "Rejected. Please re-submit your OPT Receipt.")}>Rejected</button>
                                            <p>EAD: </p>
                                            <li><a href={user.opt_ead.link}>{user.opt_ead.name}</a></li>
                                            <li>Status: {user.opt_ead.status}</li>
                                            <button type="button" id="approved-ead-button" onClick={() => this.eadStatus(user, "Approved. Please upload a copy of your I-983.")}>Approved</button>
                                            <button type="button" id="rejected-ead-button" onClick={() => this.eadStatus(user, "Rejected. Please re-submit your OPT EAD.")}>Rejected</button>
                                            <p>I983: </p>
                                            <li><a href={user.i983.link}>{user.i983.name}</a></li>
                                            <li>Status: {user.i983.status}</li>
                                            <button type="button" id="approved-ead-button" onClick={() => this.i983Status(user, "Approved. Please upload a copy of your I-20.")}>Approved</button>
                                            <button type="button" id="rejected-ead-button" onClick={() => this.i983Status(user, "Rejected. Please re-submit your I-983.")}>Rejected</button>
                                            <p>I20: </p>
                                            <li><a href={user.i20.link}>{user.i20.name}</a></li>
                                            <li>Status: {user.i20.status}</li>
                                            <button type="button" id="approved-ead-button" onClick={() => this.i20Status(user, "All documents have bean approved.")}>Approved</button>
                                            <button type="button" id="rejected-ead-button" onClick={() => this.i20Status(user, "Rejected. Please re-submit your I-20.")}>Rejected</button>
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