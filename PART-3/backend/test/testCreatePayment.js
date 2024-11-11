const axios = require('axios');

//test the /createPayment route with hardcoded data
async function testCreatePayment() {
  try {
    // Sending a POST request with hardcoded payment data to the /createPayment endpoint
    const response = await axios.post('https://renbank-api.oa.r.appspot.com/pay/CreatePayment/', {
      amount: 1000.00,
      currency: 'USD',
      provider: 'Bank of America',
      recipient_name: 'Alice Johnson',
      recipient_account_number: '987654321',
      recipient_bank_name: 'Bank of America',
      recipient_bank_branch_code: '123456',
      swift_code: 'BOFAUS3NXXX',
      verified: false,
      submit_swift: false
    }, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZmZDkxN2U4OWIyM2E3OWFkYThhMjcxIiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNzMxMzI3NzYxLCJleHAiOjE3MzEzMzEzNjF9.jRuMT5JjhPlLlZHsSGxH7ZtzLWiU7q_l59jL7EoILH4' 
      }
    });

    console.log(true);
    process.exit(0)
    
  } catch (error) {
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
testCreatePayment();
