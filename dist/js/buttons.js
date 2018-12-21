document.addEventListener("DOMContentLoaded", function(event) { 
   document.getElementById('button-git').onclick = function() {myFunction()};
   document.getElementById('button-linkedin').onclick = function() {myFunction2()};
   document.getElementById('button-google').onclick = function() {myFunction3()}; 
});

const myFunction = elementId => {
    window.open("https://github.com/pdevenpo");
}
const myFunction2 = elementId => {
    window.open("https://www.linkedin.com/in/benjaminpdevenport/");
}
const myFunction3 = elementId => {
    window.open("https://mail.google.com/mail/");
}