
//js for the circle  moves along with the cursor
let div = document.querySelector('#circle')
document.querySelector('html').onmousemove = function(event){
//track mouse position and change for custom cursor
    div.style.left = event.clientX-5+'px'
    div.style.top = event.clientY-5+'px'
};

