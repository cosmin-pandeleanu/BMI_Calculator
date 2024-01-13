import json
import uuid
from datetime import datetime
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PersonDetailsBMI')
now =  datetime.utcnow().isoformat()


def calculate_bmi(weight, height):
    height_in_meters = height / 100  # Assuming height is in centimeters
    bmi = weight / (height_in_meters ** 2)
    return round(bmi, 2)


def lambda_handler(event, context):
    # Extract values from the Lambda service's event object
    first_name = event['firstName']
    last_name = event['lastName']
    weight = event['weight']
    height = event['height']

    # Generate a UUID for the id field
    person_id = str(uuid.uuid4())

    # Calculate BMI
    bmi = calculate_bmi(weight, height)

    if first_name != "":
        # Save data to DynamoDB
        response = table.put_item(
            Item={
                'id': person_id,
                'firstName': first_name,
                'lastName': last_name,
                'weight': str(weight),
                'height': str(height),
                "bmi": str(bmi),
                "date": now
            }
        )

    return {
        'statusCode': 200,
        'body': json.dumps(f'{bmi}')
    }
