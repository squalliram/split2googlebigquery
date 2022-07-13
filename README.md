# split2googlebigquery

Integrate Split impressions with Google BigQuery by way of a Node.js Lambda
This is a Node.js lambda that acts as a Split impressions webhook: parse the impressions to create rows within a BigQuery table, and send them to the BigQuery via the Google BigQuery insert function.

# Pre-requisites

These instructions expect a reader that is adept with AWS lambdas and AWS API gateway. You must also have the node.js package manager, 'npm', installed. If you have never used npm or git, you can

```
brew install npm
brew install git
```
... on any OSX terminal.

You will be cloning the Node.js repository locally, installing its dependencies, and creating a ZIP archive for upload to AWS. On AWS, you'll make a new lambda and upload your zip to define it. Then you'll create an API in the AWS API Gateway to expose your lambda. Finally, you'll link your service account json key file using the same key file name within your ``index.js`` code.

Also, make sure you have Billing enabled on your BigQuery account without which the API calls to insert rows within the BigQuery table do not work. Work with your IT Administrator to get that enabled.

# Installing 

From the OSX command line (other platforms will be virtually the same), make a new directory and

```
git clone https://github.com/squalliram/split2googlebigquery.git
cd split2googlebigquery
npm install 
zip -r split2googlebigquery.zip .
```

In AWS, create a new lambda called split2googlebigquery. Using the code interface, upload the split2googlebigquery.zip you just created.

Your lambda is ready for action, but needs an REST API gateway. In AWS, build a new REST API. Give it a POST method and link it to your lambda. Check the box *'Use Lambda Proxy Integration'*.

# POST Setup 

Deploy the POST method and copy the URL, which will look something like this:

```
https://abcdefgxyz.execute-api.us-west-2.amazonaws.com/prod
```

* Now create a url. Start with the API gateway URL from the next step, and add a query parameter `'s'`
* Specify your service account json file name as a URL parameter within the Rest API URL. In order to get a service account JSON file, login to your Google Cloud Platform instance, select IAM & Admin on the left hand side of the menu and then select "Service Account"
* Follow instructions to create your service account JSON file over here:
<https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account>

```
https://<webhook-url>?s=<service-account-file-name>.json
```
* Make sure you include your service account key file within the root directory of your Node.js folder

# Configure a Split Impressions webhook

From Split's Admin Settings and Integrations, find and create an Impressions webhook for the workspace and environments you want to integrate.

For the URL, use the URL you just created.

The test button should come back a success. If not, consult the author.

# Author

iram.khan@split.io
