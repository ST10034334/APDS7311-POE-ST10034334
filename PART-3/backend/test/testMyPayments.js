const axios = require('axios');

// A function to test the /myPayments route with a hardcoded user ID and role
async function testMyPayments() {
  try {
    // Sending a GET request to the /myPayments endpoint
    const response = await axios.get('https://renbank-api.oa.r.appspot.com/pay/myPayments/', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZmZTcyNjY0YjA2ZDcyZGI5MWE1NzQwIiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNzMxMzQxNTM3LCJleHAiOjE3MzEzNDUxMzd9.eorjhoxM9DMF6d5-hTiGwE0UGEVkek4BiOQ02arZUAQ' 
      }
    });

    // Check if payments were returned
    if (response.data.length > 0) {
      console.log(true);  // Payments found
      process.exit(0)
    } 
    
  } catch (error) {
    // Log any errors and return false
    if (error.response) {
      console.log('Error Status Code:', error.response.status);
      console.log('Error Response Body:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }

    // Output false for any errors
    console.log(false);
    process.exit(1)
  }


}

// Run the test function to initiate the test
testMyPayments();
