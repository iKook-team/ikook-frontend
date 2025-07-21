import axios from '@/src/lib/axios';

export const paymentsService = {
  async pay(quoteId: number) {
    const response = await axios.post('/payments/', {
      quote: quoteId,
      use_checkout: true,
      use_wallet: false,
      use_bonus: false,
      action: 'pay',
    });
    return response.data;
  },
  async verify(reference: string) {
    const response = await axios.post('/payments/', {
      action: 'verify',
      reference,
    });
    return response.data;
  },
  async getWalletDetails() {
    const response = await axios.get('/payments/wallets/details/');
    return response.data;
  },
  async getWalletTransactions() {
    const response = await axios.get('/payments/wallets/transactions/');
    return response.data;
  }
}; 