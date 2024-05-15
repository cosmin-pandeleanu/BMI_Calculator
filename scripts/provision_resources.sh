#!/bin/bash


echo "------------------------------------------------------>"
echo "---> Provision DynamoDB..."
echo "---> Provision Lambda Functions..."
#aws cloudformation create-stack --stack-name "$STACK_NAME" --template-body file://../aws_cloudformation/resources.yaml  --capabilities CAPABILITY_IAM
aws cloudformation update-stack --stack-name "$STACK_NAME" --template-body file://../aws_cloudformation/resources.yaml  --capabilities CAPABILITY_IAM



