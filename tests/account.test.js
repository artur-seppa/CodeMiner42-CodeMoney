// account.test.js
import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';

describe('Account', () => {
  it('Criacao de uma conta valida', () => {
    const account = new Account('Artur Seppa', 100);
    
    expect(account).toBeDefined();
    expect(account.name).toBe('Artur Seppa');
    expect(account.balance).toBe(100);
    expect(account.numAccount).toBe('000001');
    expect(account.createdAt).toBeInstanceOf(Date);
  });

  it('Geracao de um numero de conta no formato correto', () => {
    const account = new Account('Artur Seppa');
    
    expect(account.numAccount).toMatch(/^\d{6}$/);
  });

  it('Deve criar uma conta com valor default igual a 0', () => {
    const account = new Account('Artur Seppa');
    
    expect(account.balance).toBe(0);
  });

  it('Erro para name vazio', () => {
    expect(() => new Account('')).toThrow('O nome não pode ser vazio.');
    expect(() => new Account('  ')).toThrow('O nome não pode ser vazio.');
    expect(() => new Account()).toThrow('O nome não pode ser vazio.');
  });

  it('Erro para valor de balance invalido', () => {
    expect(() => new Account('Artur Seppa', -100)).toThrow('O saldo inicial deve ser um número não negativo.');
    expect(() => new Account('Artur Seppa', NaN)).toThrow('O valor de saldo deve ser apenas de tipo Number.');
    expect(() => new Account('Artur Seppa', '2')).toThrow('O valor de saldo deve ser apenas de tipo Number.');
  });

  it('Generate unique account numbers', () => {
    const account1 = new Account('Solange Seppa');
    const account2 = new Account('Artur Seppa');
    
    expect(account1.numAccount).not.toBe(account2.numAccount);
  });
});