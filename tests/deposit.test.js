// account.test.js
import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';
import { AccountController } from '../src/controller/AccountController.js';

describe('deposit', () => {
  it('Deposito de um valor valido', () => {
    const accountController = new AccountController();
    
    const account = accountController.createAccount('Artur Seppa', 100);
    const currentAccount = accountController.depositAccount(account.numberAccount, parseFloat(200));

    expect(currentAccount).toBeDefined();
    expect(currentAccount.name).toBe('Artur Seppa');
    expect(currentAccount.balance).toBe(300);
    expect(currentAccount.numberAccount).toBe('000001');
    expect(currentAccount.createdAt).toBeInstanceOf(Date);
  });

  it('Deposito de um valor do tipo string invalido', () => {
    const accountController = new AccountController();
    
    const account = accountController.createAccount('Artur Seppa', 100);
    const currentAccount = accountController.depositAccount(account.numberAccount, '200');

    expect(currentAccount).toBeDefined();
    expect(currentAccount.message).toBe('O valor do deposito deve ser apenas do tipo Number.');
  });

  it('Erro para valor incorreto: negativo e igual a zero', () => {
    const accountController = new AccountController();
    const account = accountController.createAccount('Artur Seppa', 100);

    expect(accountController.depositAccount(account.numberAccount, 0).message).toBe('O deposito tem que ser de valor maior do que zero.');
    expect(accountController.depositAccount(account.numberAccount, -1).message).toBe('O deposito tem que ser de valor maior do que zero.');
  });
});