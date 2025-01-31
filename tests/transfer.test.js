// account.test.js
import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';

describe('deposit', () => {
    it('Should transfer a valid amount', () => {
        const account1 = new Account('Artur Seppa', 100);
        const account2 = new Account('Ana Maria', 250);

        account1.transfer(50);
        account2.deposit(50);

        expect(account1.getBalance()).toBe(50);
        expect(account2.getBalance()).toBe(300);
    });

    it('Should handle invalid transfer value of any type other than number', () => {
        const account1 = new Account('Artur Seppa', 100);

        expect(() => account1.transfer('50')).toThrow('A transferência deve ser apenas do tipo Number.');
        expect(() => account1.transfer(undefined)).toThrow('A transferência deve ser apenas do tipo Number.');
        expect(() => account1.transfer('')).toThrow('A transferência deve ser apenas do tipo Number.');
    });

    it('Should throw an error for incorrect deposit values: negative and zero', () => {
        const account = new Account('Artur Seppa', 100);

        expect(() => account.transfer(0)).toThrow('A transferência tem que ser de valor maior do que zero.');
        expect(() => account.transfer(-1)).toThrow('A transferência tem que ser de valor maior do que zero.');
    });
});