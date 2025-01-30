// account.test.js
import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';

describe('deposit', () => {
  it('Should deposit a valid amount', () => {
    const account = new Account('Artur Seppa', 100);
    account.deposit(200)

    expect(account.getBalance()).toBe(300);
  });

  it('Should handle invalid deposit value of string type', () => {
    const account = new Account('Artur Seppa', 100);

    expect(() => account.deposit('200')).toThrow('O valor do deposito deve ser apenas do tipo Number.');
  });

  it('Should throw an error for incorrect deposit values: negative and zero', () => {
    const account = new Account('Artur Seppa', 100);

    expect(() => account.deposit(0)).toThrow('O deposito tem que ser de valor maior do que zero.');
    expect(() => account.deposit(-1)).toThrow('O deposito tem que ser de valor maior do que zero.');
  });
});