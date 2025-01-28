export class AccountCollection {
    constructor() {
      this.accounts = [];
    }
  
    create(account) {
      this.accounts.push(account);
      return account;
    }
  
    findById(accountId) {
      const account = this.accounts.find(acc => acc.numAccount === accountId);
      if (!account) {
        throw new Error('Account not found');
      }
      return account;
    }
  }