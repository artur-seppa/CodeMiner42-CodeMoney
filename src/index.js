import { AccountController } from './controller/AccountController.js';
import { TransactionController } from './controller/TransactionController.js';
import readline from 'readline';

class AccountApp {
  constructor() {
    this.accountController = new AccountController();
    this.transactionController = new TransactionController();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.currentAccount = null;
  }

  start() {
    this.showMainMenu();
  }

  showMainMenu() {
    console.clear();
    console.log('===== CODEMONEY BANK =====');
    console.log('1. Criar Nova Conta');

    if (this.accountController.getAccountCount() > 0) {
      console.log('2. Selecionar Conta');
    }

    console.log('3. Sair');

    this.rl.question('Escolha uma opção: ', (choice) => {
      switch (choice) {
        case '1':
          this.createAccountPrompt();
          break;
        case '2':
          if (this.accountController.getAccountCount() > 0) {
            this.selectAccountPrompt();
          } else {
            console.log('Não há contas disponíveis.');
            this.pause(this.showMainMenu);
          }
          break;
        case '3':
          this.exit();
          break;
        default:
          console.log('Opção inválida!');
          this.pause(this.showMainMenu);
      }
    });
  }

  createAccountPrompt() {
    this.rl.question('Digite o nome do usuário: ', (name) => {
      this.rl.question('Digite o saldo inicial (padrão 0): ', (initialBalance) => {
        const balance = initialBalance ? parseFloat(initialBalance) : 0;

        try {
          const account = this.accountController.createAccount(name, balance)
          this.currentAccount = account;
          this.showAccountMenu();
        } catch (error) {
          console.error('Erro ao criar conta:', error.message);
          this.pause(this.showMainMenu);
        }
      });
    });
  }

  selectAccountPrompt() {
    this.rl.question('Digite o número da conta: ', (accountId) => {
      try {
        const account = this.accountController.getAccountDetails(accountId);

        if (!account.error) {
          this.currentAccount = account;
          this.showAccountMenu();
        } else {
          console.log('\nConta não encontrada.');
          this.pause(this.showMainMenu);
        }
      } catch (error) {
        console.error('Erro ao selecionar conta:', error.message);
        this.pause(this.showMainMenu);
      }
    });
  }

  showAccountMenu() {
    console.log('===== MENU DA CONTA =====');
    console.log(`Conta: ${this.currentAccount.numberAccount}`);
    console.log(`Proprietário: ${this.currentAccount.name}`);
    console.log(`Saldo: R$ ${this.currentAccount.balance.toFixed(2)}`);
    console.log('1. Editar Nome de Proprietário');
    console.log('2. Realizar deposito na conta');
    console.log('3. Realizar transferencia para uma conta');
    console.log('4. Visualizar extrato da conta');
    console.log('5. Voltar ao Menu Principal');

    this.rl.question('Escolha uma opção: ', (choice) => {
      switch (choice) {
        case '1':
          this.editNamePrompt(this.currentAccount.numberAccount);
          break;
        case '2':
          this.depositPrompt(this.currentAccount.numberAccount);
          break;
        case '3':
          this.transferPrompt(this.currentAccount.numberAccount);
          break;
        case '4':
          this.extractPrompt(this.currentAccount.numberAccount);
          break;
        case '5':
          this.showMainMenu();
          break;
        default:
          console.log('Opção inválida!');
          this.pause(this.showAccountMenu);
      }
    });
  }

  editNamePrompt(accountId) {
    this.rl.question('Digite o novo nome de proprietário da conta: ', (name) => {
      try {
        const account = this.accountController.editAccount(accountId, name);
        this.currentAccount = account;
        this.showAccountMenu();
      } catch (error) {
        console.error('Erro ao atualizar conta:', error.message);
        this.pause(this.showAccountMenu);
      }
    });
  }

  depositPrompt(accountId) {
    this.rl.question('Digite o valor que deseja realizar o deposito: ', (value) => {
      const deposit = value ? parseFloat(value) : 0;

      try {
        const account = this.accountController.depositAccount(accountId, deposit);
        this.transactionController.createTransaction(accountId, null, deposit, 'deposit');

        this.currentAccount = account;
        this.showAccountMenu();
      } catch (error) {
        console.error('Erro ao realizar o deposito: ', error.message);
        this.pause(this.showAccountMenu);
      }
    });
  }

  transferPrompt(fromAccountId) {
    this.rl.question('Digite o número da conta que deseja realizar a transferência: ', (toAccountId) => {
      this.rl.question('Digite o valor que deseja realizar transferir: ', (value) => {
        try {
          const transfer = value ? parseFloat(value) : 0;

          const account = this.accountController.transferAccount(fromAccountId, toAccountId, transfer);
          this.transactionController.createTransaction(fromAccountId, toAccountId, transfer, 'transfer');

          this.currentAccount = account;
          this.showAccountMenu();
        } catch (error) {
          console.error('Erro ao realizar o deposito: ', error.message);
          this.pause(this.showAccountMenu);
        }
      });
    });
  }

  extractPrompt(accountId) {
    try {
      const extract = this.transactionController.getTransactionsById(accountId);
      console.log('===== EXTRATO =====');
      console.log(extract)

      this.showAccountMenu();
    } catch (error) {
      console.error('Erro ao visualizar o extrato: ', error.message);
      this.pause(this.showAccountMenu);
    }
  }

  pause(nextAction) {
    this.rl.question('\nPressione Enter para continuar...', () => {
      nextAction.call(this);
    });
  }

  exit() {
    console.log('Obrigado por usar o CodemMoney Bank!');
    this.rl.close();
    process.exit(0);
  }
}

// Iniciar a aplicação
function main() {
  const app = new AccountApp();
  app.showMainMenu();
}

main();