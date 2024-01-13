async function calculateBMI() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    const response = await fetch('https://lcz9wk45a1.execute-api.us-east-1.amazonaws.com/dev', {
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
    document.getElementById('result').innerText = `BMI: ${result.body}`;
}
