// account.test.js
import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';

describe('Account', () => {
  it('Should create a valid account', () => {
    const account = new Account('Artur Seppa', 100);
    
    expect(account).toBeDefined();
    expect(account.getName()).toBe('Artur Seppa');
    expect(account.getBalance()).toBe(100);
    expect(account.getNumAccount()).toBe('000001');
    expect(account.getCreatedAt()).toBeInstanceOf(Date);
  });

  it('Should generate an account number in the correct format', () => {
    const account = new Account('Artur Seppa');
    
    expect(account.getNumAccount()).toMatch(/^\d{6}$/);
  });

  it('Should create an account with default balance of 0', () => {
    const account = new Account('Artur Seppa');
    
    expect(account.getBalance()).toBe(0);
  });

  it('Should throw an error for creating an account with an empty name', () => {
    expect(() => new Account('')).toThrow('O nome não pode ser vazio.');
    expect(() => new Account('  ')).toThrow('O nome não pode ser vazio.');
    expect(() => new Account()).toThrow('O nome não pode ser vazio.');
  });

  it('Should throw an error for updating an account with an empty name', () => {
    const account = new Account('Artur Seppa', 100);

    expect(() => account.setName('')).toThrow('O valor de nome do proprietário não deve ser vazio.');
    expect(() => account.setName(undefined)).toThrow('O valor de nome do proprietário não deve ser vazio.');
  });

  it('Should throw an error for invalid balance value', () => {
    expect(() => new Account('Artur Seppa', -100)).toThrow('O saldo inicial deve ser um número não negativo.');
    expect(() => new Account('Artur Seppa', NaN)).toThrow('O valor de saldo deve ser apenas de tipo Number.');
    expect(() => new Account('Artur Seppa', '2')).toThrow('O valor de saldo deve ser apenas de tipo Number.');
  });

  it('Should generate unique account numbers', () => {
    const account1 = new Account('Solange Seppa');
    const account2 = new Account('Artur Seppa');
    
    expect(account1.getNumAccount()).not.toBe(account2.getNumAccount());
  });
});