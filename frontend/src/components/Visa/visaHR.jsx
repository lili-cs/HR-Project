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
                                    <p>Receipt: {user.opt_receipt}</p>
                                    <p>EAD: {user.opt_ead}</p>
                                    <p>I983: {user.i983}</p>
                                    <p>I20: {user.i20}</p>
                                    <hr />
                                </div>
                            )
                        })}
                        <h2>In Progress</h2>
                        {this.state.users.map((user) => {
                            return (
                                <div key="user-in-progress">
                                    <h3>ID: {user.userId}</h3>
                                    <p>Receipt: {user.opt_receipt}</p>
                                    <p>EAD: {user.opt_ead}</p>
                                    <p>I983: {user.i983}</p>
                                    <p>I20: {user.i20}</p>
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