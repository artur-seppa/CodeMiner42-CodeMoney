export class AccountView {
    renderAccountDetails(account) {
      return {
        numberAccount: account.getNumAccount(),
        name: account.getName(),
        balance: account.getBalance(),
        createdAt: account.getCreatedAt()
      };
    }
  
    renderError(error) {
      return {
        error: true,
        message: error.message
      };
    }
  }