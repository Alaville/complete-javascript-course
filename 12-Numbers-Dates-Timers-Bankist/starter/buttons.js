'use strict';

let currentAccount;

//login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = false;
  const user = inputLoginUsername.value;
  const pin = +inputLoginPin.value;

  currentAccount = accounts.find(acc => acc.username === user);

  if (
    currentAccount &&
    currentAccount.username === user &&
    currentAccount.pin === pin
  ) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }😎`;

    containerApp.style.opacity = 100;
    updateUI(currentAccount);
    labelDate.textContent = modifyDate(new Date());
    clearInterval(timer);
    displayTimer();
  }
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();
});

//transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const amount = +inputTransferAmount.value;

  const to = accounts.find(acc => acc.username === transferTo);

  if (to && currentAccount.balance >= amount && amount > 0) {
    to.movements.push(amount);
    currentAccount.movements.push(-amount);

    const date = new Date();
    to.movementsDates.push(date.toISOString());
    currentAccount.movementsDates.push(date.toISOString());

    updateUI(currentAccount);
    clearInterval(timer);
    displayTimer();
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

//loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  setTimeout(() => {
    if (
      amount &&
      amount > 0 &&
      amount &&
      amount >= currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      clearInterval(timer);
      displayTimer();
    }
  }, 3000);

  inputLoanAmount.value = '';
});

//close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = +inputClosePin.value;

  if (currentAccount.username === user && currentAccount.pin === pin) {
    const index = accounts.indexOf(currentAccount);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

//sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
