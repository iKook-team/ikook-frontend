import axios from '@/src/lib/axios';

export const paymentsService = {
  async pay(quoteId: number) {
    try {
      // Get the base URL for the current environment
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const callbackUrl = `${baseUrl}/dashboard/payment/callback`;
      
      console.log('Initiating payment with callback URL:', callbackUrl);
      
      const response = await axios.post('/payments/', {
        quote: quoteId,
        use_checkout: true,
        use_wallet: false,
        use_bonus: false,
        action: 'pay',
        callback_url: callbackUrl,
      });
      
      console.log('Payment API response:', response);
      
      // Ensure the response has the expected structure
      if (response.data && response.data.data && response.data.data.checkout_url) {
        return {
          ...response.data.data,
          status: response.data.status,
          message: response.data.message
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error in pay:', error);
      throw error;
    }
  },
  
  async verify(reference: string) {
    try {
      console.log('Sending verification request for reference:', reference);
      const response = await axios.post('/payments/', {
        action: 'verify',
        reference: reference,
      });
      console.log('Verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },
  
  async getWalletDetails() {
    try {
      const response = await axios.get('/payments/wallets/details/');
      return response.data;
    } catch (error) {
      console.error('Error getting wallet details:', error);
      throw error;
    }
  },
  
  async getWalletTransactions() {
    try {
      const response = await axios.get('/payments/wallets/transactions/');
      return response.data;
    } catch (error) {
      console.error('Error getting wallet transactions:', error);
      throw error;
    }
  }
}; 