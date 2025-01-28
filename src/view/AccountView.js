export class AccountView {
    renderAccountDetails(account) {
      return {
        numberAccount: account.numAccount,
        name: account.name,
        balance: account.balance,
        createdAt: account.createdAt
      };
    }
  
    renderError(error) {
      return {
        error: true,
        message: error.message
      };
    }
  }