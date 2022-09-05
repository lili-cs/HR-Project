import React from "react";

class VisaHR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
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

        return (
            <div className="visa-main">
                <h2>Visa-HR</h2>
                <hr />
                <form>
                    <div className="form-group">
                        <h2>In Porgress</h2>
                        <label htmlFor="exampleFormControlSelect1">Select User</label>
                        
                    </div>
                </form>
            </div>
        );
    }
}

export default VisaHR;