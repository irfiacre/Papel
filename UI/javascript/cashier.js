
const change = () => {
  const type1 = document.querySelector('.type1');
  const type = document.querySelector('.type2');
  const view1 = document.querySelector('.viewDebit');
  const view2 = document.querySelector('.viewCredit');

  if (type.className == 'type2' && view2.className == 'viewCredit') {
    view1.className = 'viewDebit2';
    view2.className = 'viewCredit2';
    type.setAttribute('id', 'credit2');
    type1.setAttribute('id', 'debit');
  }
};

const change2 = () => {
  const type1 = document.querySelector('.type1');
  const view1 = document.querySelector('.viewDebit2');
  const view2 = document.querySelector('.viewCredit2');
  const type = document.querySelector('.type2');

  if (type1.className == 'type1' && view1.className == 'viewDebit2') {
    view1.className = 'viewDebit';
    view2.className = 'viewCredit';
    type1.setAttribute('id', 'debit2');
    type.setAttribute('id', 'credit');
  }
};

const view = () => {
  const owner = document.querySelector('.none2');
    owner.className = 'accountOwner';
};

function getDate() {
  let today = new Date();

  document.getElementById('date').value = `${today.getFullYear() }-${(`0${  today.getMonth() + 1}`).slice(-2) }-${(`0${  today.getDate()}`).slice(-2)}`;
}

function getDate2() {
  let today = new Date();
  document.getElementById('date2').value = `${today.getFullYear() }-${(`0${  today.getMonth() + 1}`).slice(-2) }-${(`0${  today.getDate()}`).slice(-2)}`;
}


