import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import moment from "moment";


import { getEntries, deleteEntry } from "../services/EntriesDB"

import hostelLogo from "../../assets/images/portlandHostel.png";

import "../../assets/stylesheets/stafflog.styles"


const Stafflog = () => {
    
    const navigate = useNavigate();

    const [stafflog, setStafflog] = useState([]);

    useEffect(() => {
        getEntries()
          .then(entries => {
              setStafflog(entries)
          })
    }, [])

    const updateSelectedEntry =  (entry) => {
        navigate("/newLogEntry", { state: {entry: entry}} );
    }


    const deleteSelectedEntry = async (id) => {
        setStafflog(stafflog.filter(stafflog => stafflog.id !== id));
        await deleteEntry(id);
    }

    const formatDate = (date) => {
        
        const newDate = moment(date, 'YYYY-MM-DD').format('dddd MMMM Do, YYYY');
        if(newDate){
            return newDate;
        } else {
            return date;
        }
    }



    const logEntries = stafflog.map((stafflog) => (
        <div key={stafflog.id} className="col-md-12">
            <div className="card mb-4">
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">Date: {formatDate(stafflog.date)} </h5>
                        <h4> Subject: {stafflog.subject}</h4>
                        <h5>{stafflog.message}</h5>
                    </div>
                    <div className="col-lg-2 d-flex flex-column justify-content-start">
                        <div className="mb-3">
                            <button type="button" className="btn btn-warning" onClick={() => updateSelectedEntry(stafflog)}> 
                                Edit Entry
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-danger" onClick={() => deleteSelectedEntry(stafflog.id)}> 
                                Delete Entry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    const noLogs = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
            No entries yet. <Link to="/newLogEntry">create one</Link>
            </h4>
        </div>
    );

    return (
    <>
        <section className="stafflog-title-container jumbotron jumbotron-fluid text-center">
            <div className= "primary-color d-flex justify-content-center">
                <Link to="/" >
                    <img src={hostelLogo} alt="Hostel Logo" />
                </Link>
                <div className="d-flex flex-column justify-content-center">
                    <h1 className="display-4">Staff Log</h1>
                    <p className="lead text-muted">
                    Please Add Incidents and Passdown Notable for Other Employees
                    </p>
                </div>
            </div>
        </section>
        <div className="py-5 ">
            <main className="container">
                <div className="text-left mb-3">
                    <Link to="/newLogEntry" className="btn custom-button">
                        Create New Entry
                    </Link>
                </div>
                <div className="row">
                    {stafflog.length > 0 ? logEntries : noLogs}
                </div>
            </main>
        </div>
    </>
    )
}

export default Stafflog;