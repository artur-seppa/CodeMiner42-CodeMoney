import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';
import { AccountController } from '../src/controller/AccountController.js';
import { TransactionController } from '../src/controller/TransactionController.js';

describe('Bank Statement', () => {
    it('Should successfully transfer funds between accounts and record the transaction in the bank statement', () => {
        const accountController = new AccountController();
        const account1 = accountController.createAccount('Artur Seppa', 100);
        const account2 = accountController.createAccount('Ana Faria', 250);

        const transfer = 20;
        accountController.transferAccount(account1.numberAccount, account2.numberAccount, transfer)

        const transactionController = new TransactionController();
        transactionController.createTransaction(account1.numberAccount, account2.numberAccount, transfer, 'transfer')

        const extract = transactionController.getTransactionsById(account2.numberAccount)

        expect(extract[0].type).toBe('transfer');
        expect(extract[0].amount).toBe('20.00');
        expect(extract[0].fromAccountNumber).toBe('000001');
        expect(extract[0].toAccountNumber).toBe('000002');
    });

    it('Should successfully deposit funds and record the transaction in the bank statement', () => {
        const accountController = new AccountController();
        const account = accountController.createAccount('Artur Seppa', 100);

        const deposit = 20;
        accountController.depositAccount(account.numberAccount, deposit);

        const transactionController = new TransactionController();
        transactionController.createTransaction(account.numberAccount, null, deposit, 'deposit')

        const extract = transactionController.getTransactionsById(account.numberAccount)

        expect(extract[0].type).toBe('deposit');
        expect(extract[0].amount).toBe('20.00');
        expect(extract[0].fromAccountNumber).toBe('000003');
        expect(extract[0].toAccountNumber).toBe('N/A');
    });
});