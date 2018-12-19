
document.addEventListener("DOMContentLoaded", function(event) { 
    let person;
    //person = prompt("Please enter your name: ");
     if(person != null){
        document.getElementById('intro-text').innerHTML = "Welcome " + person + "!"
     }else{
        document.getElementById('intro-text').innerHTML = "Welcome!"
     }
     
    
});
  
