import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TestA from './components/TestA.jsx'
import TestB from './components/TestB.jsx'
import NotFoundComponent from './components/NotFoundComponent.jsx';
import MainPage from './components/MainPage.jsx';
import IndividualPage from './components/IndividualPage.jsx';


//create app HTML structure
const App = () => {
    return (
        <Router>
            <h1>Oak Labs</h1>
            <img className='headerImg' src="https://cdn.costumewall.com/wp-content/uploads/2017/02/professor-oak.jpg" alt="Oak!" style={{width: "120px"}} />
            <nav>
                <ul>
                    <li><Link to="/ipage">Look at Individual Pokemon Stats</Link></li>
                </ul>
            </nav>
            <div className="router">
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        path="/ipage"
                        element={<IndividualPage />}
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