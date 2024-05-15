#!/bin/bash

# Step 1: Create S3 Bucket
echo "---> Creating S3 Bucket..."
if aws s3api head-bucket --bucket "bucket-cloud-computing-bmi-calculator" 2>/dev/null; then
    echo "Bucket already exists."
else
    echo "Bucket does not exist."
    aws s3api create-bucket --bucket bucket-cloud-computing-bmi-calculator --region us-east-1
fi

# Step 2: Zip the Lambda functions code
echo "---> Zipping Lambda functions code..."
cd ..
mkdir "zips"
zip zips/calculateBMI.zip aws_lambda/calculateBMI.py
zip zips/searchPerson.zip aws_lambda/searchPerson.py

# Step 3: Upload the zips (lambda functions) to S3 bucket
echo "---> Uploading zips to S3 bucket..."
aws s3 cp zips/calculateBMI.zip s3://bucket-cloud-computing-bmi-calculator
aws s3 cp zips/searchPerson.zip s3://bucket-cloud-computing-bmi-calculator

## Step 4: Zip the react app code
#echo "---> Zipping Lambda functions code..."
#zip -r zips/reactApp.zip react-app/*

## Step 5: Upload the zip (react-app) to S3 bucket
#echo "---> Uploading zips to S3 bucket..."
#aws s3 cp zips/reactApp.zip s3://bucket-cloud-computing-bmi-calculator

# Step 6: Verify the upload
echo "---> Verifying the upload..."
aws s3 ls s3://bucket-cloud-computing-bmi-calculator/

# Step 7: Delete the zips locally
echo "---> Delete zips locally"
rm -rf zips