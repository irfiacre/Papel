
const eyeSlash = document.querySelector('.eyeSlash');


const change=()=>{
  const eye = document.querySelector('.eye');
  const eyeSlash = document.querySelector('.eyeSlash');
  const input = document.querySelector('#password');

  if(eye.className ==='eye' && eyeSlash.className ==='eyeSlash'){
    eye.className ='active';
    eyeSlash.className = 'actived';
    input.type='text';
  }
  
}
const change2 =()=>{
  const eye = document.querySelector('.active');
  const eyeSlash = document.querySelector('.actived');
  const input = document.querySelector('#password');

  if(eye.className ==='active' && eyeSlash.className ==='actived'){
    eye.className ='eye';
    eyeSlash.className = 'eyeSlash'; 
    input.setAttribute('type','password') 
  }
}
const capslock =()=>{
  const input = document.querySelector('#password');
  const warn =document.querySelector('.warning')
  
  if (event.getModifierState("CapsLock")) {
    warn.style.display = "block";
  } else {
    warn.style.display = "none"
  }
}

const signup = document.querySelector('.signup');
const signin = document.querySelector('.signin');

const color =()=>{
  const signin = document.querySelector('.signin');
  const signup = document.querySelector('.signup');

  if(signin.className=='signin' && signup.className=='signup'){
    signin.className='signin2';
    signup.className='signup2';
  }
}
const color2 =()=>{
  const signin = document.querySelector('.signin');
  const signup = document.querySelector('.signup');

  if(signin.className=='signin2' && signup.className=='signup2'){
      signin.className='signin';
      signup.className='signup';
  }
}

signup.addEventListener('click',color);
signin.addEventListener('click',color2);





const loginDirecton = () => {
  const submit = document.querySelector(".submit");
  const signinAction = document.querySelector("#signIn")
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const adminEmail = "admin@papel.com";
  const adminPassword = "admin@123";
  const cashierEmail = "cashier@papel.com";
  const cashierPassword = "cashier@123"

  submit.addEventListener("click", () => {
      if(email.value === adminEmail && password.value === adminPassword){
          signinAction.setAttribute("action", "admin.html");
      }
      if(email.value === cashierEmail && password.value === cashierPassword){
          signinAction.setAttribute("action", "cashier.html");
      }
  })
}
loginDirecton();





















filterSelection("sign-in")

function filterSelection(c) {

  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }

  // color();

}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}









