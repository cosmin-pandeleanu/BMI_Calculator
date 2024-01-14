import React from 'react';
import {Link} from "react-router-dom";


function CalculateBMI() {
    return (<div>
        <header>
            <h1>BMI Calculator</h1>
        </header>
        <nav>
            <Link to="/calculate-bmi">Calculate BMI</Link>
            <Link to="/search-bmi-results">Search BMI results</Link>
        </nav>
        <form id="bmiForm">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName"/><br/>

            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName"/><br/>

            <label htmlFor="weight">Weight* (kg):</label>
            <input type="number" id="weight" name="weight" required/><br/>

            <label htmlFor="height">Height* (cm):</label>
            <input type="number" id="height" name="height" required/><br/>

            <button type="button" onClick={calculateBMI}>Calculate BMI</button>

        </form>
        <div id="result"></div>
        <div id="message"></div>
    </div>);
}

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
    if (result.hasOwnProperty("body")) {
        const messageElement = document.getElementById('message')
        messageElement.innerText = displayBMIMessage(result.body);
        messageElement.classList.add('result');
    }
}

function displayBMIMessage(bmi) {
    if (bmi < 18.5) {
        return "Underweight. Try to consume nutritious foods and maintain a healthy balance."
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal. Congratulations on maintaining a healthy lifestyle! Keep it up."
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight. Consider adopting a plan of regular exercise and a balanced diet."
    } else {
        return "Obesity. Consult a healthcare specialist to develop a personalized plan for you."
    }
}


export default CalculateBMI;
