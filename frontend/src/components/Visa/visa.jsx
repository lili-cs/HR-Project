import React from "react";

const ThemeContext = React.createContext('default');

class Visa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: {status: "Approved"},
            ead: {status: "Approved"},
            i983: {status: "Pending"},
            i20: {status: "Pending"}
        };
        // this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        // this.fetch();
    }

    fetch() {
        //
    }

    render() {
        if(this.state.receipt.status === "Pending"){
            return (
                <div className="visa-main">
                <h2>Visa</h2>
                <hr />
                {showReceipt()}
                <p>Status: {this.state.receipt.status}</p>
            </div>
            )
        }

        if(this.state.ead.status === "Pending"){
            return (
                <div className="visa-main">
                <h2>Visa</h2>
                <hr />
                {showReceipt()}
                <p>Status: {this.state.receipt.status}</p>
                {showEad()}
                <p>Status: {this.state.ead.status}</p>
            </div>
            )
        }

        if(this.state.i983.status === "Pending"){
            return (
                <div className="visa-main">
                <h2>Visa</h2>
                <hr />
                {showReceipt()}
                <p>Status: {this.state.receipt.status}</p>
                {showEad()}
                <p>Status: {this.state.ead.status}</p>
                {showI983()}
                <p>Status: {this.state.i983.status}</p>
            </div>
            )
        }

        if(this.state.i20.status === "Pending"){
            return (
                <div className="visa-main">
                <h2>Visa</h2>
                <hr />
                {showReceipt()}
                <p>Status: {this.state.receipt.status}</p>
                {showEad()}
                <p>Status: {this.state.ead.status}</p>
                {showI983()}
                <p>Status: {this.state.i983.status}</p>
                {showI20()}
                <p>Status: {this.state.i20.status}</p>
            </div>
            )
        }

        return (
            <div className="visa-main">
                <h2>Visa</h2>
            </div>
        );
    }
}

function showReceipt() {
    return (
        <div>
            <h2>OPT Receipt</h2>
            <div className="upload-file">
                <input type="file" name="opt-receipt-file" id="opt-receipt-file" />
                <label>Choose a file</label>
                <button type="button" id="opt-receipt-button">Upload</button>
            </div>
        </div>
    );
}

function showEad() {
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

function showI983() {
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

function showI20(){
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

export default Visa;