export class Account {
  static counter = 0

  constructor(name, initialBalance = 0) {

    if (!name || name.trim() === '') {
      throw new Error('O nome não pode ser vazio.');
    }

    if (isNaN(initialBalance) || initialBalance < 0) {
      throw new Error('O saldo inicial deve ser um número não negativo.');
    }

    this.numAccount = this.generateNumberAccount();
    this.name = name;
    this.balance = initialBalance;
    this.createdAt = new Date();
  }

  generateNumberAccount() {
    Account.counter++;
    return Account.counter.toString().padStart(6, '0');
  }

  setName(name) {
    this.name = name;
  }

  getBalance() {
    return this.balance;
  }
}