class tochka {
    constructor(x,y,color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class claster{
  constructor(x,y,color,inpoints){
    this.centrex = x;
    this.centrey = y;
    this.color = color;
    this.inpoints = new Array();
  }
}


let points = new Array();
let clasters = new Array();


var ammountP = 0;
var canv = document.getElementById('pole');
var ctx = canv.getContext('2d');
canv.addEventListener('mousedown', function(e) {
    ctx.beginPath(); 
    var rect = canv.getBoundingClientRect(); 
    ctx.arc(e.clientX-rect.left,e.clientY-rect.top,10,0,Math.PI*2);
    ctx.fill();
    ammountP++;
    let Tochka = new tochka;
    Tochka.x = e.clientX-rect.left;
    Tochka.y = e.clientY-rect.top;
    points.push(Tochka);
}); 


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function randomColor(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}

function drawPoint(point){
  ctx.beginPath(); 
  ctx.arc(point.x,point.y,10,0,Math.PI*2);
  ctx.fillStyle = point.color;
  ctx.fill();
}

var ammountC = 0;


function getnumber() {
 
  clasters.length = 0;
  var input = document.getElementById('number');
  ammountC = input.value; 
  for(let i = 0; i < ammountC; i++){
    let Claster = new claster;
    // Claster.centrex = getRandomIntInclusive(0,400);
    // Claster.centrey = getRandomIntInclusive(0,400);
    Claster.centrex = points[i].x;
    Claster.centrey = points[i].y;
    Claster.color = randomColor();
    clasters.push(Claster);
  }
  

  var markdot = 0;
  var mindist = 10000;
  var minmark = 0;

  

while(markdot != ammountC){
    
    markdot = 0;
    mindist = 100000;
    minmark = 0;
    
  
    for(let i = 0; i < ammountP; i++){
      for(let j = 0; j < ammountC; j++){
          if(Math.sqrt(Math.pow(points[i].x-clasters[j].centrex,2)+Math.pow(points[i].y-clasters[j].centrey,2)) <= mindist){
            mindist = Math.sqrt(Math.pow(points[i].x-clasters[j].centrex,2)+Math.pow(points[i].y-clasters[j].centrey,2));
            minmark = j;
          }
      }
      clasters[minmark].inpoints.push(points[i]);
      points[i].color = clasters[minmark].color;
      drawPoint(points[i]);
      mindist = 100000;
      minmark = 0;
    }

    var newcentrex = 0;
    var newcentrey = 0;
    
    var previousCentrex = 0;
    var previousCentrey = 0;

    for(let i = 0; i < ammountC; i++){
      previousCentrex = clasters[i].centrex;
      previousCentrey = clasters[i].centrey;
      if(clasters[i].inpoints.length > 0){
      for(let j = 0; j < clasters[i].inpoints.length; j++){
        newcentrex += clasters[i].inpoints[j].x;
        newcentrey += clasters[i].inpoints[j].y;
      }

        newcentrex = newcentrex / clasters[i].inpoints.length;
        newcentrey = newcentrey / clasters[i].inpoints.length;
        clasters[i].centrex = newcentrex;
        clasters[i].centrey = newcentrey;
    }
        if(previousCentrex == clasters[i].centrex && previousCentrey == clasters[i].centrey) {
          markdot++;
        }
         newcentrex = 0;
         newcentrey = 0;
         
      }
        
      for(let i = 0; i < ammountC; i++){
        clasters[i].inpoints.length = 0;
      }
        
        
    }
  }

  













