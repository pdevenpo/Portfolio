document.addEventListener("DOMContentLoaded", function(event) { 
    //code to be used to change the story on each card. Add to new js file?
    // var element = document.getElementById('text-1');
    // element.innerHTML = "Hello World!";
    
    var elementCard1 = document.getElementById('card-1');
    var elementCard2 = document.getElementById('card-2');
    var elementCard3 = document.getElementById('card-3');
    setInterval(function(){detectClassColor(elementCard1, elementCard1.classList.item(2))},5000);
    setInterval(function(){detectClassColor(elementCard2, elementCard2.classList.item(2))},6000);
    setInterval(function(){detectClassColor(elementCard3, elementCard3.classList.item(2))},7000);
    
});

//jquery code to enable popovers
$(function () {
    $('[data-toggle="popover"]').popover()
})


//function to detect the current-state of the background color
function detectClassColor(elementCardNumber,classColor){
    switch(classColor){
        case 'bg-dark':
            colorChange(elementCardNumber,'bg-dark');
        break;
        case 'bg-primary':
            colorChange(elementCardNumber,'bg-primary');
        break;
        case 'bg-light':
            colorChange(elementCardNumber,'bg-light');
        break;
        case 'bg-secondary':
            colorChange(elementCardNumber,'bg-secondary');
        break;
        default:

    }
}
//function to handle the current background to determine the next background color
function colorChange(elementCard,bgColor){
    //var num = Math.floor(Math.random()*3+1);
    
    switch(bgColor){
        case 'bg-dark':
            elementCard.classList.replace('bg-dark','bg-light')
            //setTimeout(function(){elementCard.classList.replace('bg-light','bg-dark')},3000)
        break;
        case 'bg-light':
            elementCard.classList.replace('bg-light','bg-primary')
            //setTimeout(function(){elementCard.classList.replace('bg-primary','bg-dark')},3000)
        break;
        case 'bg-primary':
            elementCard.classList.replace('bg-primary','bg-secondary')
            //setTimeout(function(){elementCard.classList.replace('bg-secondary','bg-dark')},3000)
        break;
        case 'bg-secondary':
            elementCard.classList.replace('bg-secondary','bg-dark')
        break;
        default:
            elementCard.classList.replace('bg-dark','bg-dark')
    }
    
    //elementCard.classList.replace('bg-dark','bg-light')
}
//bg-primary
//bg-secondary
//bg-success
//bg-danger
//bg-warning
//bg-info
