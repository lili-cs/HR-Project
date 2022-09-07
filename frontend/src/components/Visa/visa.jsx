import React from "react";
// import axios from "axios";
import { uploadFile } from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET ='mybucketforhrproject';
const REGION ='US East (N. Virginia) us-east-1';
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
            userId: "123",
            receipt: "Pending",
            ead: "",
            i983: "",
            i20: "",
            selectedFile: null,
            // setSelectedFile: null,
        };
        // this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        // this.fetch();
    }

    fetch() {
        //
    }

    handleFileInput = async (e) => {
        this.selectedFile = e.target.files[0];
    }

    handleUpload = async (file) => {
        // console.log(file);
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    showReceipt() {
        return (
            <div>
                <h2>OPT Receipt</h2>
                <div className="upload-file">
                    <input type="file" name="opt-receipt-file" id="opt-receipt-file" onChange={(e) => {this.handleFileInput(e)}}/>
                    <label>Choose a file</label>
                    <button type="button" id="opt-receipt-button" onClick={() => this.handleUpload(this.selectedFile)}>Upload</button>
                </div>
            </div>
        );
    }

    showEad() {
        return(
            <div>
                <h2>OPT EAD</h2>
                <div className="upload-file">
                    <input type="file" name="opt-ead-file" id="opt-ead-file" />
                    <label>Choose a file</label>
                    <button type="button" id="opt-ead-button">Upload</button>
                </div>
            </div>
        );
    }

    showI983() {
        return (
            <div>
                <h2>I-983</h2>
                <div className="upload-file">
                    <input type="file" name="i-983-file" id="i-983-file" />
                    <label>Choose a file</label>
                    <button type="button" id="i-983-button">Upload</button>
                </div>
            </div>
        );
    }

    showI20(){
        return(
            <div>
                <h2>I-20</h2>
                <div className="upload-file">
                    <input type="file" name="i-20-file" id="i-20-file" />
                    <label>Choose a file</label>
                    <button type="button" id="i-20-button">Upload</button>
                </div>
            </div>
        );
    }
    


    render() {
        // if(this.state.receipt.status === "Pending"){
        //     return (
        //         <div className="visa-main">
        //         <h2>Visa</h2>
        //         <hr />
        //         {this.showReceipt()}
        //         <p>Status: {this.state.receipt.status}</p>
        //     </div>
        //     )
        // }

        // if(this.state.ead.status === "Pending"){
        //     return (
        //         <div className="visa-main">
        //         <h2>Visa</h2>
        //         <hr />
        //         {this.showReceipt()}
        //         <p>Status: {this.state.receipt.status}</p>
        //         {this.showEad()}
        //         <p>Status: {this.state.ead.status}</p>
        //     </div>
        //     )
        // }

        // if(this.state.i983.status === "Pending"){
        //     return (
        //         <div className="visa-main">
        //         <h2>Visa</h2>
        //         <hr />
        //         {this.showReceipt()}
        //         <p>Status: {this.state.receipt.status}</p>
        //         {this.showEad()}
        //         <p>Status: {this.state.ead.status}</p>
        //         {this.showI983()}
        //         <p>Status: {this.state.i983.status}</p>
        //     </div>
        //     )
        // }

        // if(this.state.i20.status){
            return (
                <div className="visa-main">
                    <h2>Visa</h2>
                    <hr />
                    <h3>ID:{this.state.userId}</h3>
                    {this.showReceipt()}
                    <p>Status: {this.state.receipt}</p>
                    {this.showEad()}
                    <p>Status: {this.state.ead}</p>
                    {this.showI983()}
                    <p>Status: {this.state.i983}</p>
                    {this.showI20()}
                    <p>Status: {this.state.i20}</p>
                </div>
            )
        // }

        // return (
        //     <div className="visa-main">
        //         <h2>Visa</h2>
        //     </div>
        // );
    }
}

export default Visa;