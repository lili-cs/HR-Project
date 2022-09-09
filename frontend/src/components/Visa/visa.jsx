import React from "react";
import axios from "axios";
// import AWS from 'aws-sdk';
import { uploadFile } from 'react-s3';
// import { Document, Page } from 'react-pdf';
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET ='mybucketforhrproject';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIAR6M2ZVOWQKSQ22FB';
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
            userId: "6315c9816bec8a6d8a0361fa",
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
        this.fetch = this.fetchProfile.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this)
        // this.handleUpload = this.handleUpload.bind(this)
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile() {
        const localHost = "http://localhost:4000"
        axios.get(`${localHost}/visa_user/${this.state.userId}`)
            .then(res => {
                this.setState({
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
        await uploadFile(this.state.selectedFile, config)
            .then(data => {
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/visa_user/${this.state.userId}/opt_receipt`, {
                    status: "Pending",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                    .then(res => {
                        console.log("===");
                        console.log(res.data);
                        console.log("===");
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
                    status: "Pending",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                    .then(res => {
                        console.log(res.data);
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
                    status: "Pending",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    handleUpload_I20 = async (e) => {
        await uploadFile(this.state.selectedFile, config)
            .then(data => {
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/visa_user/${this.state.userId}/i20`, {
                    status: "Pending",
                    link: data.location,
                    name: this.state.selectedFile.name,
                })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    showReceipt() {
        return (
            <div>
                <h2>OPT Receipt</h2>
                <div className="upload-file">
                    <input type="file" name="opt-receipt-file" id="opt-receipt-file" onChange={(e) => {this.handleFileInput(e)}}/>
                    <label>Choose a file</label>
                    <button type="button" id="opt-receipt-button" onClick={() => this.handleUpload_Receipt()}>Upload</button>
                </div>
            </div>
        );
    }

    showEad() {
        return(
            <div>
                <h2>OPT EAD</h2>
                <div className="upload-file">
                    <input type="file" name="opt-ead-file" id="opt-ead-file" onChange={(e) => {this.handleFileInput(e)}} />
                    <label>Choose a file</label>
                    <button type="button" id="opt-ead-button" onClick={() => this.handleUpload_Ead()}>Upload</button>
                </div>
            </div>
        );
    }

    showI983() {
        return (
            <div>
                <h2>I-983</h2>
                <div className="upload-file">
                    <input type="file" name="i-983-file" id="i-983-file" onChange={(e) => {this.handleFileInput(e)}} />
                    <label>Choose a file</label>
                    <button type="button" id="i-983-button" onClick={() => this.handleUpload_I983()}>Upload</button>
                </div>
            </div>
        );
    }

    showI20(){
        return(
            <div>
                <h2>I-20</h2>
                <div className="upload-file">
                    <input type="file" name="i-20-file" id="i-20-file" onChange={(e) => {this.handleFileInput(e)}} />
                    <label>Choose a file</label>
                    <button type="button" id="i-20-button" onClick={() => this.handleUpload_I20()}>Upload</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="visa-main">
                <h2>Visa</h2>
                <hr />
                <h3>ID:{this.state.userId}</h3>
                {this.showReceipt()}
                <a href={this.state.receipt.link}>{this.state.receipt.name}</a>
                <p>Status: {this.state.receipt.status}</p>
                {this.showEad()}
                <a href={this.state.ead.link}>{this.state.ead.name}</a>
                <p>Status: {this.state.ead.status}</p>
                {this.showI983()}
                <a href={this.state.i983.link}>{this.state.i983.name}</a>
                <p>Status: {this.state.i983.status}</p>
                {this.showI20()}
                <a href={this.state.i20.link}>{this.state.i20.name}</a>
                <p>Status: {this.state.i20.status}</p>
            </div>
        )
    }
}

export default Visa;