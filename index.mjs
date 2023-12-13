import fetch from "node-fetch";

const responses = {
  success: (data, code) => {
    return {
      "statusCode": code,
      "body": JSON.stringify(data)
    }
  }, 
  failure: (err) => {
    return {
      "statusCode": err.status,
      "body": JSON.stringify(err)
    }
  }
}

export const handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const author = event.queryStringParameters.author;
    const endpoint = `https://openlibrary.org/search/authors.json?q=${author}`;
    const fetchResult = await fetch(endpoint);
    const resultJson = await fetchResult.json();
    callback(null, responses.success(resultJson, fetchResult.status));
  } catch(err) {
    callback(null, responses.failure(err));
  }
}