import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout1 />} />
                <Route path="/another" element={<Layout2 />} />
            </Routes>
        </Router>
    );
}

export default App;
