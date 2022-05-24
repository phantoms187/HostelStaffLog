import React from "react";
import { useState } from 'react';

import { Link, useLocation, useNavigate } from "react-router-dom";

import FormInput from "./FormInput";
import { addEntry, updateEntry } from "../services/EntriesDB";

import hostelLogo from "../../assets/images/portlandHostel.png";

import "../../assets/stylesheets/logEntry.styles"


const NewLogEntry = ( ) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [stafflog, setStafflog] = useState([]);


    const entry = location.state ? location.state.entry : false;
 
    const defaultFormFields = {
        date: entry ? entry.date : '',
        subject: entry ? entry.subject : '',
        message: entry ? entry.message : ''
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { date, subject, message } = formFields;


    const handleSubmit = async (event) => {
        event.preventDefault();
        await addEntry(formFields);
        navigate("/stafflog");
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const updateSelectedEntry = async () => {
        await updateEntry(formFields, entry.id);
        navigate("/stafflog");
    }
   
    return (
    <div className="d-flex align-items-center justify-content-center container mt-5">
        <div className="col-sm-12">
            <div className="d-flex justify-content-around align-items-baseline">
                <Link to="/" >
                    <img src={hostelLogo} alt="Hostel Logo" />
                </Link>
                <div>
                    <h1 className="font-weight-normal">
                    Add an Incident to the Staff Log
                    </h1>
                    <div className="text-right mt-5">
                        <Link to="/stafflog" className="btn border border border-secondary">
                            Back to Staff Log
                        </Link>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Date"
                    type="date"
                    name="date"
                    value={date}
                    required
                    onChange={handleChange}
                />
                <FormInput
                    label="Subject"
                    type="text"
                    name="subject"
                    value={subject}
                    required
                    onChange={handleChange}
                />
                <textarea
                    className="form-control"
                    label="Message"
                    name="message"
                    rows="5"
                    value={message}
                    required
                    onChange={handleChange}
                />
                { entry ? 
                    (<button type="button" onClick={() => updateSelectedEntry()} className="btn custom-button mt-3">
                        Update Log Entry
                     </button>
                    ) : (
                     <button type="submit" className="btn custom-button mt-3">
                        Create Log Entry
                     </button>
                    )
                }
            </form>
        </div>
    </div>
    );
  }
  
  export default NewLogEntry;