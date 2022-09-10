import React from "react";
import axios from "axios";
// import AWS from 'aws-sdk';
import { uploadFile } from 'react-s3';
// import { Document, Page } from 'react-pdf';
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET ='mybucketforhrproject';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIAR6M2ZVOW2QK5I4O7';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

class Visa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            receipt: {
                status: null,
                link: null,
                name: null
            },
            ead: {
                status: null,
                link: null,
                name: null
            },
            i983: {
                status: null,
                link: null,
                name: null
            },
            i20: {
                status: null,
                link: null,
                name: null
            },
            selectedFile: null,
        };
        // this.fetch = this.fetchProfile.bind(this);
        // this.handleFileInput = this.handleFileInput.bind(this)
        // this.handleUpload = this.handleUpload.bind(this)
    }

    componentDidMount() {
        const jwtToken = localStorage.getItem("jwtToken");
        const localHost = "http://localhost:4000"
        axios.post(`${localHost}/visa`, {
            jwtToken: jwtToken,
        })
        .then(async res => {
            console.log(res.data);
            await this.setState({
                userId: res.data.userId,
                receipt: res.data.opt_receipt,
                ead: res.data.opt_ead,
                i983: res.data.i983,
                i20: res.data.i20,
            });
            console.log(this.state.userId);
            this.fetchProfile();
        })
        .catch(err => console.log(err));
    }

    fetchProfile() {
        const localHost = "http://localhost:4000"
        axios.get(`${localHost}/visa_user/${this.state.userId}`)
            .then(async res => {
                await this.setState({
                    userId: res.data.userId,
                    receipt: res.data.opt_receipt,
                    ead: res.data.opt_ead,
                    i983: res.data.i983,
                    i20: res.data.i20
                })
            })
            .catch(err => console.log(err));
    }

    handleFileInput = async (e) => {
        await this.setState({
            selectedFile: e.target.files[0],
        })
    }

    handleUpload_Receipt = async (e) => {
        console.log(this.state.userId);
        await uploadFile(this.state.selectedFile, config)
            .then(data => {
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/visa_user/${this.state.userId}/opt_receipt`, {
                    status: "Pending. Waiting for HR to approve your OPT Receipt.",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                .then(res => {
                    console.log(res.data);
                    alert("File uploaded successfully. Please refresh the page to see the updated status.");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    handleUpload_Ead = async (e) => {
        await uploadFile(this.state.selectedFile, config)
            .then(data => {
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/visa_user/${this.state.userId}/opt_ead`, {
                    status: "Pending. Waiting for HR to approve your OPT EAD.",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                .then(res => {
                    console.log(res.data);
                    alert("File uploaded successfully. Please refresh the page to see the updated status.");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    handleUpload_I983 = async (e) => {
        await uploadFile(this.state.selectedFile, config)
            .then(data => {
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/visa_user/${this.state.userId}/i983`, {
                    status: "Pending. Waiting for HR to approve your I983.",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                .then(res => {
                    console.log(res.data);
                    alert("File uploaded successfully. Please refresh the page to see the updated status.");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    handleUpload_I20 = async (e) => {
        e.preventDefault();
        await uploadFile(this.state.selectedFile, config)
            .then(data => {
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/visa_user/${this.state.userId}/i20`, {
                    status: "Pending. Waiting for HR to approve your I20.",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                .then(res => {
                    console.log(res.data);
                    alert("File uploaded successfully. Please refresh the page to see the updated status.");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    showReceipt() {
        return (
            <div className="visa-content">
                <h2>OPT Receipt</h2>
                <div className="upload-file">
                    <input type="file" name="opt-receipt-file" id="opt-receipt-file" onChange={(e) => {this.handleFileInput(e)}}/>
                    <label>Choose a file</label>
                    <button type="button" id="opt-receipt-button" onClick={() => this.handleUpload_Receipt()}>Upload</button>
                </div>
                <a href={this.state.receipt.link}>{this.state.receipt.name}</a>
                <p>Status: {this.state.receipt.status}</p>
            </div>
        );
    }

    showEad() {
        return(
            <div className="visa-content">
                <h2>OPT EAD</h2>
                <div className="upload-file">
                    <input type="file" name="opt-ead-file" id="opt-ead-file" onChange={(e) => {this.handleFileInput(e)}} />
                    <label>Choose a file</label>
                    <button type="button" id="opt-ead-button" onClick={() => this.handleUpload_Ead()}>Upload</button>
                </div>
                <a href={this.state.ead.link}>{this.state.ead.name}</a>
                <p>Status: {this.state.ead.status}</p>
            </div>
        );
    }

    showI983() {
        return (
            <div className="visa-content">
                <h2>I-983</h2>
                <div className="upload-file">
                    <input type="file" name="i-983-file" id="i-983-file" onChange={(e) => {this.handleFileInput(e)}} />
                    <label>Choose a file</label>
                    <button type="button" id="i-983-button" onClick={() => this.handleUpload_I983()}>Upload</button>
                </div>
                <a href={this.state.i983.link}>{this.state.i983.name}</a>
                <p>Status: {this.state.i983.status}</p>
            </div>
        );
    }

    showI20(){
        return(
            <div className="visa-content">
                <h2>I-20</h2>
                <div className="upload-file">
                    <input type="file" name="i-20-file" id="i-20-file" onChange={(e) => {this.handleFileInput(e)}} />
                    <label>Choose a file</label>
                    <button type="button" id="i-20-button" onClick={(e) => this.handleUpload_I20(e)}>Upload</button>
                </div>
                <a href={this.state.i20.link}>{this.state.i20.name}</a>
                <p>Status: {this.state.i20.status}</p>
            </div>
        );
    }

    render() {
        if(this.state.i983.status === "Approved. Please upload a copy of your I-20."){
            return (
                <div className="visa-main">
                    <h2>Visa</h2>
                    <hr />
                    <h3>ID:{this.state.userId}</h3>
                    {this.showReceipt()}
                    {this.showEad()}
                    {this.showI983()}
                    {this.showI20()}
                </div>
            )
        }
        else if(this.state.ead.status === "Approved. Please upload a copy of your I-983."){
            return (
                <div className="visa-main">
                    <h2>Visa</h2>
                    <hr />
                    <h3>ID:{this.state.userId}</h3>
                    {this.showReceipt()}
                    {this.showEad()}
                    {this.showI983()}
                    {/* {this.showI20()} */}
                </div>
            )
        }
        else if(this.state.receipt.status === "Approved. Please upload a copy of your OPT EAD."){
            return (
                <div className="visa-main">
                    <h2>Visa</h2>
                    <hr />
                    <h3>ID:{this.state.userId}</h3>
                    {this.showReceipt()}
                    {this.showEad()}
                    {/* {this.showI983()} */}
                    {/* {this.showI20()} */}
                </div>
            )
        }
        else{
            return (
                <div className="visa-main">
                    <h2>Visa</h2>
                    <hr />
                    <h3>ID:{this.state.userId}</h3>
                    {this.showReceipt()}
                    {/* {this.showEad()} */}
                    {/* {this.showI983()} */}
                    {/* {this.showI20()} */}
                </div>
            )
        }
        
    }
}

export default Visa;