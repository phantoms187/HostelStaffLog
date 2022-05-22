import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getEntries, deleteEntry } from "../services/EntriesDB"

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

    const logEntries = stafflog.map((stafflog) => (
        <div key={stafflog.id} className="col-md-12 ">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Date: {stafflog.date} </h5>
                    <h3> Subject: {stafflog.subject}</h3>
                    <p>{stafflog.message}</p>
                    <div className="col-lg-2 d-flex justify-content-between">
                        <button type="button" className="btn btn-warning" onClick={() => updateSelectedEntry(stafflog)}> 
                            Edit Entry
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteSelectedEntry(stafflog.id)}> 
                            Delete Entry
                        </button>
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
        <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
            <h1 className="display-4">Staff Log</h1>
            <p className="lead text-muted">
            Please add incidents and passdown notable for other employees:
            </p>
        </div>
        </section>
        <div className="py-5">
        <main className="container">
            <div className="text-right mb-3">
                <Link to="/newLogEntry" className="btn custom-button">
                    Create New Entry
                </Link>
            </div>
            <div className="row">
                {stafflog.length > 0 ? logEntries : noLogs}
            </div>
            <Link to="/" className="btn btn-link">
                Home
            </Link>
        </main>
        </div>
    </>
    )
}

export default Stafflog;