require('dotenv').config();

// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const { table } = require('console');
const bigquery = new BigQuery();

exports.handler =  async function insertRowsAsStream(event) {
  // Inserts the JSON objects into my_dataset:my_table.

  
  const datasetId = 'split_impressions';
  const tableId = 'impressions';

  const body = JSON.parse(event.body);
  
   let events = [];
    for (const impression of body) {
        let ev = {
            treatment: impression.treatment,
            properties: impression.properties,
            split: impression.split,
            key: impression.key,
            time: Math.trunc(parseInt(impression.time) / 1000),
            label: impression.label,
            environmentId: impression.environmentId,
            environmentName: impression.environmentName,
            sdk: impression.sd,
            machineIp: impression.machineIp,
            machineName: impression.machineName,
            sdkVersion: impression.sdkVersion,
            bucketingKey: impression.bucketingKey,
            splitVersionNumber: impression.splitVersionNumber
        }
        events.push(ev);
    }
    
    console.log(events);

  // Insert data into a table
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(events)
    .then(function(response) {
      console.log(`Inserted ${events.length} rows`);
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });

    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
}