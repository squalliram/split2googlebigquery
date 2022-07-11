# split2bigquery

Integrate Split impressions with Google BigQuery by way of a node.js lambda
This is a node.js lambda that acts as a Split impressions webhook: parse the impressions to create rows within a BigQuery table, and send them to the BigQuery via the Google BigQuery insert function.

Pre-requisites
These instructions expect a reader that is adept with AWS lambdas and AWS API gateway. You must also have the node.js package manager, 'npm', installed. If you have never used npm or git, you can

brew install npm
brew install git
... on any OSX terminal.

You will be cloning the node.js repository locally, installing its dependencies, and creating a ZIP archive for upload to AWS. On AWS, you'll make a new lambda and upload your zip to define it. Then you'll create an API in the AWS API Gateway to expose your lambda. Finally, you'll create an Environment variable within the Configuration Tab of the Lambda function and link your service account json key file.

Installing
From the OSX command line (other platforms will be virtually the same), make a new directory and

git clone https://github.com/squalliram/split2bigquery.git
cd split2bigquery
npm install 
zip -r split2bigquery.zip .
In AWS, create a new lambda called split2bigquery. Using the code interface, upload the split2bigquery.zip you just created.

Your lambda is ready for action, but needs an REST API gateway. In AWS, build a new REST API. Give it a POST method and link it to your lambda. Check the box 'Use Lambda Proxy Integration'.

alt text

Deploy the POST method and copy the URL, which will look something like this:

https://ygp1r7dssxx.execute-api.us-west-2.amazonaws.com/prod

Base64 encode your MixPanel secret
Go to https://codebeautify.org/base64-encode

Put your Mixpanel secret into the Base64 Encode entry area and hit the button to Base64 encode.

Now create a url. Start with the API gateway url from the next step, and add a query parameter with your encoded secret:

https://ygp1r7cna6.execute-api.us-west-2.amazonaws.com/prod?m=MjI0OTc5YThmY2MyM2MyNjI0OTAyNjgxYmY5YzIwNmU=
Configure a Split Impressions webhook
From Split's Admin Settings and Integrations, find and create an Impressions webhook for the workspace and environments you want to integrate.

For the URL, use the URL you just created.

The test button should come back a success. If not, consult the author.
