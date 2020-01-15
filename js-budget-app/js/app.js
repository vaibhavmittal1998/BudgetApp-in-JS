class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }


  // Submit budget method
  submitBudgetForm(){
    //console.log('hello budget');
    let value = this.budgetInput.value;
    if (value === '' || value<0){
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>Value can't be negative or Zero</p>`;
      this.budgetInput.value = '';
      setTimeout(() => this.budgetFeedback.classList.remove('showItem') , 3000);
    }
    else{
      this.budgetAmount.textContent = value;
      // this.balanceAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  } 

  //show Balance
  showBalance(){
    // console.log('hey he balance is : ');
    const expense = this.totalExpense();
    const total = (this.budgetAmount.textContent)-expense;
    this.balanceAmount.textContent = total;
    console.log(total);
    if(total<0){
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    else if(total>0){
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
    else if(total===0){
      this.balance.classList.remove('showGreen', 'showRed');
      this.balance.classList.add('showBlack');
    }
  }

  //submit Expense form
  submitExpenseForm(){
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if(expenseValue ==='' || amountValue === '' || amountValue < 0){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `Expense value is not tobe less than zero or expense should be mention`;
      setTimeout(() => this.expenseFeedback.classList.remove('showItem') , 3000);
    }
    else{
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';
      
      let expense = {
        id: this.itemID,
        title: expenseValue,
        value: amount
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance()
    }
  }

  // Add expense to the no

  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">

      <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
      <h5 class="expense-amount mb-0 list-item">${expense.value}</h5>

      <div class="expense-icons list-item">

      <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
        <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="delete-icon" data-id="${expense.id}">
        <i class="fas fa-trash"></i>
      </a>
        </div>
        </div>
    `;
    this.expenseList.appendChild(div);
  }


  //Total Expense
  totalExpense(){
    let total = 0;
    if(this.itemList.length > 0){
      this.itemList.forEach(item => {
        // console.log(item);
        total+=item.value;
        console.log(total);
      })
    }
    this.expenseAmount.textContent = total;
    // for(i=0; i<this.expenseList)
    return total;
  } 

  // Edit expence by clicking on edit icon
  editExpense(element){
    let id = parseInt(element.dataset.id);
    // console.log(id);
    let parent = element.parentElement.parentElement.parentElement;
    // console.log(parent);
    this.expenseList.removeChild(parent);
    // console.log(this.itemList);
    let edititem;
    this.itemList.forEach(item => {
      if (item.id === id){
        let index = this.itemList.indexOf(item);
        edititem = this.itemList.slice(index,index+1); 
        this.itemList.splice(index,1);
      }
    });
    //console.log(edititem);
    this.expenseInput.value = edititem[0].title;
    this.amountInput.value = edititem[0].value;
 
    // console.log(this.itemList);
    this.showBalance();
  }
  // delete expence by clicking on delete icon
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    // console.log(id);
    let parent = element.parentElement.parentElement.parentElement;
    // console.log(parent);
    this.expenseList.removeChild(parent);
    // console.log(this.itemList);
    this.itemList.forEach(item => {
      if (item.id === id){
        let index = this.itemList.indexOf(item);
        this.itemList.splice(index,1);        
      }
    });
    // console.log(this.itemList);
    this.showBalance();
  }

}

function eventListners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  //instace of UI class

  const ui = new UI();

  budgetForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitBudgetForm(); 
  });

  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  });

  expenseList.addEventListener('click', function(event){
    if(event.target.parentElement.classList.contains('edit-icon')){
      ui.editExpense(event.target.parentElement);
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement);
    }

  });

}

document.addEventListener('DOMContentLoaded', function(){
  eventListners();
});
