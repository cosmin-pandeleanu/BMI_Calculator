import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculeazaBMI from './CalculeazaBMI';
import CautaRezultate from './CautaRezultate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/calculeaza-bmi" element={<CalculeazaBMI />} />
                <Route path="/cauta-rezultate" element={<CautaRezultate />} />
                <Route path="/" element={<CalculeazaBMI />} />
            </Routes>
        </Router>
    );
}

export default App;
