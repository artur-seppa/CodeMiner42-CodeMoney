import { describe, it, expect } from 'vitest';
import { Account } from '../src/model/Account.js';
import { AccountCollection } from '../src/collection/AccountCollection.js';

describe('transfer', () => {
    it('Should transfer a valid amount', () => {
        const account1 = new Account('Artur Seppa', 100);
        const account2 = new Account('Ana Faria', 250);

        const accountCollection = new AccountCollection();
        accountCollection.create(account1);
        accountCollection.create(account2);

        accountCollection.transfer(account1.getNumAccount(), account2.getNumAccount(), 20);

        expect(account1.getBalance()).toBe(80);
        expect(account2.getBalance()).toBe(270);
    });

    it('Should handle invalid transfer value of any type other than number', () => {
        const account1 = new Account('Artur Seppa', 100);
        const account2 = new Account('Ana Faria', 250);

        const accountCollection = new AccountCollection();
        accountCollection.create(account1);
        accountCollection.create(account2);

        expect(() => accountCollection.transfer(account1.getNumAccount(), account2.getNumAccount(), '20'))
            .toThrow('A transferência deve ser apenas do tipo Number.');
        expect(() => accountCollection.transfer(account1.getNumAccount(), account2.getNumAccount(), undefined))
            .toThrow('A transferência deve ser apenas do tipo Number.');
        expect(() => accountCollection.transfer(account1.getNumAccount(), account2.getNumAccount(), ''))
            .toThrow('A transferência deve ser apenas do tipo Number.');
    });

    it('Should throw an error for incorrect deposit values: negative and zero', () => {
        const account1 = new Account('Artur Seppa', 100);
        const account2 = new Account('Ana Faria', 250);

        const accountCollection = new AccountCollection();
        accountCollection.create(account1);
        accountCollection.create(account2);

        expect(() => accountCollection.transfer(account1.getNumAccount(), account2.getNumAccount(), 0))
            .toThrow('A transferência tem que ser de valor maior do que zero.');
        expect(() => accountCollection.transfer(account1.getNumAccount(), account2.getNumAccount(), -1))
            .toThrow('A transferência tem que ser de valor maior do que zero.');
    });

    it('Should throw an error for incorrect account number values', () => {
        const account1 = new Account('Artur Seppa', 100);
        const account2 = new Account('Ana Faria', 250);

        const accountCollection = new AccountCollection();
        accountCollection.create(account1);
        accountCollection.create(account2);

        expect(() => accountCollection.transfer(account1.getNumAccount(), '2', 20))
            .toThrow('Account not found');
        expect(() => accountCollection.transfer(account1.getNumAccount(), account1.getNumAccount(), 20))
            .toThrow('A transferência não pode ser feita para a mesma conta.');
    });
});