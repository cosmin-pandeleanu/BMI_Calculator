// Lambda Function Code
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const { name, weight, height } = requestBody;

    // Calcul BMI
    const bmi = (weight / (height * height)).toFixed(2);

    // Salvează detaliile în DynamoDB
    const params = {
        TableName: 'PersonDetails',
        Item: {
            name: name,
            weight: weight,
            height: height,
            bmi: bmi
        }
    };

    try {
        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ bmi: bmi, message: 'BMI calculat și stocat cu succes.' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Eroare la salvarea în DynamoDB.' })
        };
    }
};
