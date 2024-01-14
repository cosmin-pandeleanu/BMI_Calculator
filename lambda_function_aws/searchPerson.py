import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PersonDetailsBMI')


def lambda_handler(event, context):
    # Extract values from the Lambda service's event object
    first_name = event['firstName']
    last_name = event['lastName']

    # Query the DynamoDB table to search for a person by firstName and lastName
    response = table.query(
        IndexName='FirstNameLastNameIndex',
        KeyConditionExpression='firstName = :fn and lastName = :ln',
        ExpressionAttributeValues={
            ':fn': first_name,
            ':ln': last_name
        }
    )

    # Extract the items from the response
    items = response.get('Items', [])

    return {
        'statusCode': 200,
        'body': items
    }
