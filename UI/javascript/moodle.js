var modal = document.getElementById("modal1");
var btn = document.getElementById("transaction");

var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const bBtn = document.getElementById('balenceBtn');
const balanc = ()=>{
  const bala = document.getElementById('none');

  bala.setAttribute('id', 'totalBalance');
}

bBtn.addEventListener('click', balanc);
