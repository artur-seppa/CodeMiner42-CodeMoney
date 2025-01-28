export class Account {
  static counter = 0

  constructor(name, initialBalance = 0) {

    if (!name || name.trim() === '') {
      throw new Error('O nome não pode ser vazio.');
    }

    if (initialBalance < 0) {
      throw new Error('O saldo inicial deve ser um número não negativo.');
    }

    if (isNaN(initialBalance) || typeof initialBalance === 'string') {
      throw new Error('O valor de saldo deve ser apenas de tipo Number.');
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