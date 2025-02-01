import { Account } from '../model/Account.js';
import { AccountCollection } from '../collection/AccountCollection.js';
import { AccountView } from '../view/AccountView.js';

export class AccountController {
  constructor() {
    this.AccountCollection = new AccountCollection();
    this.accountView = new AccountView();
  }

  getAccountCount() {
    return this.AccountCollection.renderLengthAccounts();
  }

  createAccount(name, initialBalance) {
    try {
      const account = new Account(name, initialBalance);
      this.AccountCollection.create(account)
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      throw error;
    }
  }

  editAccount(accountId, name) {
    try {
      const account = this.AccountCollection.update(accountId, name, 'name');
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      throw error;
    }
  }

  depositAccount(accountId, deposit) {
    try {
      const account = this.AccountCollection.update(accountId, deposit, 'deposit');
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      throw error;
    }
  }

  transferAccount(fromAccountId, toAccountId, transfer) {
    try {
      const account = this.AccountCollection.transfer(fromAccountId, toAccountId, transfer);
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      throw error;
    }
  }

  getAccountDetails(accountId) {
    try {
      const account = this.AccountCollection.findById(accountId);
      return this.accountView.renderAccountDetails(account);
    } catch (error) {
      throw error;
    }
  }
}