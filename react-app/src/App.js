import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculateBMI from './CalculateBMI';
import SearchBMIResults from './SearchBmiResults';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/calculate-bmi" element={<CalculateBMI />} />
                <Route path="/search-bmi-results" element={<SearchBMIResults />} />
                <Route path="/" element={<CalculateBMI />} />
            </Routes>
        </Router>
    );
}

export default App;
