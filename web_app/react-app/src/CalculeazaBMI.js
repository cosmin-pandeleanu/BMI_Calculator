import React from 'react';
import {Link} from "react-router-dom";

async function calculateBMI() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    const response = await fetch('https://lcz9wk45a1.execute-api.us-east-1.amazonaws.com/dev/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "firstName": firstName,
                "lastName": lastName,
                "weight": weight,
                "height": height
            }),
    });

    const result = await response.json();
    const resultElement = document.getElementById('result');
    resultElement.innerText = `BMI: ${result.body}`
    resultElement.classList.add('result');
}

function CalculeazaBMI() {
    return (<div>
        <header>
            <h1>BMI Calculator</h1>
        </header>
        <nav>
            <Link to="/calculeaza-bmi">Calculează BMI</Link>
            <Link to="/cauta-rezultate">Caută rezultate BMI</Link>
        </nav>
        <form id="bmiForm">
            <label htmlFor="lastName">Nume:</label>
            <input type="text" id="lastName" name="lastName"/><br/>

            <label htmlFor="firstName">Prenume:</label>
            <input type="text" id="firstName" name="firstName"/><br/>

            <label htmlFor="weight">Greutate* (kg):</label>
            <input type="number" id="weight" name="weight" required/><br/>

            <label htmlFor="height">Înălțime* (m):</label>
            <input type="number" id="height" name="height" required/><br/>

            <button type="button" onClick={calculateBMI}>Calculează BMI</button>

        </form>
        <div id="result"></div>
    </div>);
}

export default CalculeazaBMI;
