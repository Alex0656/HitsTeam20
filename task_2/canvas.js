var canv = document.getElementById('pole');
var ctx = canv.getContext('2d');


canv.addEventListener('mousedown', function(e) {
    ctx.beginPath(); 
    var rect = canv.getBoundingClientRect(); 
    ctx.arc(e.clientX-rect.left,e.clientY-rect.top,10,0,Math.PI*2);
    ctx.fill();
}); 