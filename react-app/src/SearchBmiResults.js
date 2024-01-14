import React from 'react';
import {Link} from "react-router-dom";

function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}

async function searchBMIresults() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const response = await fetch('https://lcz9wk45a1.execute-api.us-east-1.amazonaws.com/dev/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "firstName": firstName,
                "lastName": lastName,
            }),
    });

    const results = await response.json();
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.add('result');
    resultsContainer.innerHTML = '';
    if (results.body.length > 0) {
        const resultsTable = document.createElement('table');
        resultsTable.setAttribute('border', '1');

        const headerRow = resultsTable.insertRow(0);
        const headerCells = ['Weight(kg)', 'Height(cm)', 'BMI', 'Date of record'];
        headerCells.forEach((headerText, index) => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });

        results.body.forEach(result => {
            const row = resultsTable.insertRow();
            const cells = ['weight', 'height', 'bmi', 'date'];
            cells.forEach(cellName => {
                const cell = row.insertCell();
                if (cellName !== 'date')
                    cell.textContent = result[cellName];
                else
                    cell.textContent = formatDateString(result[cellName])
            });
        });


        resultsContainer.appendChild(resultsTable);
    } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'There are no records for this user!';
        resultsContainer.appendChild(noResultsMessage)
        resultsContainer.style.color = 'red';
    }


}

function SearchBMIResults() {
    return (<div>
        <header>
            <h1>BMI Calculator</h1>
        </header>
        <nav>
            <Link to="/calculate-bmi">Calculate BMI</Link>
            <Link to="/search-bmi-results">Search BMI results</Link>
        </nav>
        <form id="bmiForm">
            <label htmlFor="lastName">Last Name*:</label>
            <input type="text" id="lastName" name="lastName" required/><br/>

            <label htmlFor="firstName">FirstName*:</label>
            <input type="text" id="firstName" name="firstName" required/><br/>

            <button type="button" onClick={searchBMIresults}>Search BMI results</button>

        </form>
        <div id="results"></div>
    </div>);
}

export default SearchBMIResults;
