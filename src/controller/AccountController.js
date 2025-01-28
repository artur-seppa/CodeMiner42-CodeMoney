import { Account } from '../model/Account.js';
import { AccountCollection } from '../collection/AccountCollection.js';
import { AccountView } from '../view/AccountView.js';

export class AccountController {
  constructor() {
    this.AccountCollection = new AccountCollection();
    this.accountView = new AccountView();
  }

  createAccount(name, initialBalance) {
    try {
      const account = new Account(name, initialBalance);
      this.AccountCollection.create(account);
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      return this.accountView.renderError(error);
    }
  }

  editAccount(accountId, name) {
    try {
      const account = this.AccountCollection.findById(accountId);

      account.setName(name);
      this.AccountCollection.update(account);
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      return this.accountView.renderError(error);
    }
  }

  getAccountDetails(accountId) {
    try {
      const account = this.AccountCollection.findById(accountId);
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      return this.accountView.renderError(error);
    }
  }

  getAccountCount() {
    return this.AccountCollection.accounts.length;
  }
}