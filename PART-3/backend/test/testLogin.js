const axios = require('axios');

//Loads environment variables from .env file.
dotenv.config();

// Function to delay execution for a specified number of milliseconds
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// A function to test the /login route with valid credentials and retry if rate-limited
async function testLogin(retryCount = 3) {
  try {
    // Sending a POST request with hardcoded credentials to the /login endpoint
    const response = await axios.post('https://renbank-api.oa.r.appspot.com/auth/login/', {
      name: process.env.API_NAME,
      account_number: process.env.API_ACCOUNT_NUMBER,
      password: process.env.API_PASSWORD,
    });

    // Check if the response has a 'name' field and its value is 'Joelene Peters'
    const isValid = response.data.name === 'Joelene Peters';
    
    // Output only 'true' or 'false'
    console.log(isValid);

  } catch (error) {
    // If rate-limited (HTTP 429), retry after delay
    if (error.response && error.response.status === 429 && retryCount > 0) {
      console.log('Rate limited. Retrying after delay...');
      await delay(5000); // Wait for 5 seconds before retrying
      return testLogin(retryCount - 1); // Retry the request
    } else if (error.response) {
      console.log('Error Status Code:', error.response.status);
      console.log('Error Response Body:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }

    // If there was any error (including rate limit exhaustion), return false
    console.log(false);
  }
}

// Run the testLogin function to initiate the test
testLogin();
