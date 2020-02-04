
const Delete =()=>{
   const delBtn=document.querySelector('.delete');
   const content=document.querySelector('.user');
    
   if(delBtn){
    content.className='none'
   }
}


var modal = document.getElementById("modal1");
var btn = document.getElementById("user");

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
}


const deactive=()=>{
  const deactiveBtn=document.querySelector('.deactiveBtn');
  const active=document.querySelector('.active');
  const deactive=document.querySelector('.none');

  if(deactiveBtn){
    active.className ='none';
    deactive.className ='deactive';
    deactiveBtn.value = 'Activate Account';
    deactiveBtn.className = 'activeBtn';
    
  }
}
