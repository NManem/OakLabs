import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TestA from './components/TestA.jsx'
import TestB from './components/TestB.jsx'
import NotFoundComponent from './components/NotFoundComponent.jsx';
import MainPage from './components/MainPage.jsx';


//create app HTML structure
const App = () => {
    return (
        <Router>
            <h1>Test Page</h1>
            <nav>
                <ul>
                    <li><Link to="/testb">TestB</Link></li>
                </ul>
            </nav>
            <div className="router">
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        path="/testb"
                        element={<TestB />}
                    />
                    {/* Catch-all route for undefined routes */}
                    <Route
                        path="*"
                        element={<NotFoundComponent />}
                    />
                </Routes>
            </div>
        </Router>
    )
}
export default App;