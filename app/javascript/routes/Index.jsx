import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Stafflog from "../components/Stafflog";
import NewLogEntry from "../components/NewLogEntry";

export default (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/stafflog" exact element={<Stafflog />} />
            <Route path="/newLogEntry" exact element={<NewLogEntry />} />
        </Routes>
    </BrowserRouter>
);

