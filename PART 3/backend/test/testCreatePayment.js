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
      verified: true
    }, {
      headers: {
        Authorization: 'Bearer your_mocked_token' 
      }
    });

    console.log(true);
    
  } catch (error) {
    if (error.response) {
      console.log('Error Status Code:', error.response.status);
      console.log('Error Response Body:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }

    // Output false for any errors
    console.log(false);
  }
}

// Run the test function to initiate the test
testCreatePayment();
