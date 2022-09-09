import React from "react";
import axios from "axios";

class VisaHR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        const localHost = "http://localhost:4000"
        axios.get(`${localHost}/visa`,{
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
            alert(error)
        })
    }

    render() {
        return (
            <div className="visa-main">
                <h2>Visa-HR</h2>
                <hr />
                <form>
                    <div className="form-group">
                        <h2>All</h2>
                        {this.state.users.map((user) => {
                            return (
                                <div key="user-all">
                                    <h3>ID: {user.userId}</h3>
                                    <p>Receipt: </p>
                                    <li>Status: {user.opt_receipt.status}</li>
                                    <li></li>
                                    <li><a href={user.opt_receipt.link}>{user.opt_receipt.name}</a></li>
                                    <p>EAD: </p>
                                    <li>Status: {user.opt_ead.status}</li>
                                    <li><a href={user.opt_ead.link}>{user.opt_ead.name}</a></li>
                                    <p>I983: </p>
                                    <li>Status: {user.i983.status}</li>
                                    <li><a href={user.i983.link}>{user.i983.name}</a></li>
                                    <p>I20: </p>
                                    <li>Status: {user.i20.status}</li>
                                    <li><a href={user.i20.link}>{user.i20.name}</a></li>
                                    <hr />
                                </div>
                            )
                        })}
                        <h2>In Progress</h2>
                        {this.state.users.map((user) => {
                            return (
                                <div key="user-in-progress">
                                    <h3>ID: {user.userId}</h3>
                                    <p>Receipt: </p>
                                    <li>Status: {user.opt_receipt.status}</li>
                                    <li></li>
                                    <li><a href={user.opt_receipt.link}>{user.opt_receipt.name}</a></li>
                                    <p>EAD: </p>
                                    <li>Status: {user.opt_ead.status}</li>
                                    <li><a href={user.opt_ead.link}>{user.opt_ead.name}</a></li>
                                    <p>I983: </p>
                                    <li>Status: {user.i983.status}</li>
                                    <li><a href={user.i983.link}>{user.i983.name}</a></li>
                                    <p>I20: </p>
                                    <li>Status: {user.i20.status}</li>
                                    <li><a href={user.i20.link}>{user.i20.name}</a></li>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                </form>
            </div>
        );
    }
}

export default VisaHR;