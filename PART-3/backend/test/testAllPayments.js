const axios = require('axios');

// A function to test the pay/ route with a hardcoded user ID and role.
async function testAllPayments() {
  try {
    // Sending a GET request to the pay/ endpoint
    const response = await axios.get('https://renbank-api.oa.r.appspot.com/pay/', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZmZThmNmNhZTg2MDdhOWIyMjUyMmViIiwicm9sZSI6IkVtcGxveWVlIiwiaWF0IjoxNzMxMzQxNjEzLCJleHAiOjE3MzEzNDUyMTN9.QgcSxVLx7BghhAxuAgPLQK1f5_LVVqkMThToFifdhbE' 
      }
    });

    //Check if payments were returned
    if (response.data.length > 0) {
      console.log(true);  //Payments found
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
testAllPayments();
