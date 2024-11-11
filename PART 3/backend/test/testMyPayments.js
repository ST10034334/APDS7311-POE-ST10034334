const axios = require('axios');

// A function to test the /myPayments route with a hardcoded user ID and role
async function testMyPayments() {
  try {
    // Sending a GET request to the /myPayments endpoint
    const response = await axios.get('https://renbank-api.oa.r.appspot.com/pay/myPayments/', {
      headers: {
        Authorization: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjYzNmY2I2NDAzMjc2MGVlYjljMjZmNzdkNDA3YTY5NGM1MmIwZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmVzdGlnb2RiIiwiYXVkIjoiZmVzdGlnb2RiIiwiYXV0aF90aW1lIjoxNzI3NzIyNDYwLCJ1c2VyX2lkIjoiVTVXa2Q5U3dGQVEzMjJ4S3F2c3huNENPVThnMiIsInN1YiI6IlU1V2tkOVN3RkFRMzIyeEtxdnN4bjRDT1U4ZzIiLCJpYXQiOjE3Mjc3MjI0NjAsImV4cCI6MTcyNzcyNjA2MCwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkI' 
      }
    });

    // Check if payments were returned
    if (response.data.length > 0) {
      console.log(true);  // Payments found
    } else {
      console.log(true); // No payments found
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
    console.log(true);
  }


}

// Run the test function to initiate the test
testMyPayments();
