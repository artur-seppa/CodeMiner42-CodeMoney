export class AccountCollection {
    #accounts = [];

    create(account) {
        this.#accounts.push(account);
        return account;
    }

    renderLengthAccounts() {
        return this.#accounts.length;
    }

    findById(accountId) {
        const account = this.#accounts.find(acc => acc.getNumAccount() === accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return account;
    }

    update(accountId, name) {
        const account = this.findById(accountId);
        account.setName(name);

        return account;
    }
}