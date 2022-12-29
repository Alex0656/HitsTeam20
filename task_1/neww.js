const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const mouse = createMouse(canvas);


const BACKGROUND_COLOR = "gray";
const WALL_COLOR = "black";
const FREE_COLOR = "white";
let color = FREE_COLOR;
const FINISH_COLOR = "blue";
const START_COLOR = "yellow";
const ERASER_COLOR = "red";
const Anime_COLOR = "pink"
const Anime1_COLOR = "blue"
const FRAME = 5;
const DELAY = 100;
const WIDTH_1 = 500
const HEIGHT_1 = 500
canvas.width = FRAME * 2 + WIDTH_1;
canvas.height = FRAME * 2 + HEIGHT_1;
let SPre_y = 0, SPre_x = 0
let FPre_y = 0, FPre_x = 0

const ERASER_COUNT = 1;
const ANIMATION = document.getElementById("checkbox1");
//const n = 11
let Start = document.getElementById("radio0");
let Finish = document.getElementById("radio1");
let Wall = document.getElementById("radio3");
let Free = document.getElementById("radio2");
const newButton = document.getElementById('newButton');
const newButton1 = document.getElementById('newButton1');

let Size_11 = document.getElementById("radi11").value;
let Size_19 = document.getElementById("radi19").value;
let Size_51 = document.getElementById("radi51").value;
let Size_101 = document.getElementById("radi101").value;
let n_1 = 11;
if (Size_11.checked) {
	n_1 = 11;
}
else if (Size_19.checked) {
	n_1 = 19
}
else if (Size_51.checked) {
	n_1 = 51
}
else if (Size_101.checked) {
	n_1 = 101
}
let n = n_1;


const SIZE = WIDTH_1 / n
let First = null;
let Second = null;
let SecondMat = null;
let path = null;

// let First = [1, 2];
// let Second = [5, 2];
// let flag = true;
// let End = true;
// var OpenMass = []; //distanse - G
// var CloseMass = []; // индекс для востановления маршрута
// var Active = {ActiveCordX: 0, ActiveCordY: 0, ActiveG: 0, ActiveF: 0} // клетка, которую смотрю в моменте 
// var Finish = {FinishX: Second[0], FinishY: Second[1], FinishG: 0, FinishF: 0}
// Active.ActiveCordY = First[1], Active.ActiveCordX = First[0];

const potentials = createMatrixx(n, n);
function createMatrixx(n, n) {
	const matrix = [];
	for (let y = 0; y < n; y++) {
		const row = [];
		for (let x = 0; x < n; x++) {
			row.push(null);
		}
		matrix.push(row);
	}
	return matrix;
}


const Matrix_main = createMatrix(n, n);
const ERASERS = [];
for (let i = 0; ERASER_COUNT > i; i++) {
	ERASERS.push({
		x: 0,
		y: 0,
	});
}
Matrix_main[0][0] = 1;

newButton1.addEventListener('click', search1);
function search1(){
	main();
}

//main()

async function main() {
	while (CompletedMaze() == false) {
		for (const eraser of ERASERS) {
			Move(eraser);
		}
		if (ANIMATION.checked) {
			DrawMaze();
			for (const eraser of ERASERS) {
				DrawEraser(eraser);
			}

			await delay(DELAY);
		}
	}
	//DrawMaze();
}
requestAnimationFrame(tick)




function createMatrix(columns, rows) {
	const matrix = [];
	for (let y = 0; y < rows; y++) {
		const row = [];
		for (let x = 0; x < columns; x++) {
			row.push(0);
		}
		matrix.push(row);
	}
	return matrix;
}
function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}



function DrawMaze() {
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = BACKGROUND_COLOR;
	context.fill();

	for (let y = 0; y < n; y++) {
		for (let x = 0; x < n; x++) {
			if (Matrix_main[y][x] == 1) {
				color = FREE_COLOR;
			}
			else if (Matrix_main[y][x] == 0) {
				color = WALL_COLOR;
			}
			else if (Matrix_main[y][x] == 2) {
				color = FINISH_COLOR
			}
			else if (Matrix_main[y][x] == 3) {
				color = START_COLOR
			}
			else if (Matrix_main[y][x] == 4) {
				color = Anime_COLOR
			}
			else if (Matrix_main[y][x] == 5) {
				color = Anime1_COLOR
			}

			context.beginPath();
			context.rect(FRAME + x * SIZE, FRAME + y * SIZE, SIZE, SIZE);
			context.fillStyle = color;
			context.fill();
		}
	}
}

function DrawEraser(eraser) {
	context.beginPath();
	context.rect(
		FRAME + eraser.x * SIZE,FRAME + eraser.y * SIZE, SIZE, SIZE);
	context.fillStyle = ERASER_COLOR;
	context.fill();
}

function Move(eraser) {
	const Ways = [];

	if (eraser.x > 0) {
		Ways.push([-2, 0]);
	}

	if (eraser.x < n - 1) {
		Ways.push([2, 0]);
	}

	if (eraser.y > 0) {
		Ways.push([0, -2]);
	}

	if (eraser.y < n - 1) {
		Ways.push([0, 2]);
	}

	const [dx, dy] = RandomItem(Ways);

	eraser.x += dx;
	eraser.y += dy;

	if (!Matrix_main[eraser.y][eraser.x]) {
		Matrix_main[eraser.y][eraser.x] = 1;
		Matrix_main[eraser.y - dy / 2][eraser.x - dx / 2] = 1;
	}
}

function RandomItem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function CompletedMaze() {
	for (let y = 0; y < n; y += 2) {
		for (let x = 0; x < n; x += 2) {
			if (!Matrix_main[y][x]) {
				return false;
			}
		}
	}

	return true;
}

function createMouse(element) {
	const mouse = {
		x: 0,
		y: 0,

		over: false,
		left: false,
		pLeft: false,

		update() {
			this.pLeft = this.left;
		},
	};

	element.addEventListener("mouseenter", mouseenterHandler);
	element.addEventListener("mouseleave", mouseleaveHandler);
	element.addEventListener("mousemove", mousemoveHandler);
	element.addEventListener("mousedown", mousedownHandler);
	element.addEventListener("mouseup", mouseupHandler);

	function mouseenterHandler() {
		mouse.over = true;
	}

	function mouseleaveHandler() {
		mouse.over = false;
	}

	function mousemoveHandler(event) {
		const rect = element.getBoundingClientRect();
		mouse.x = event.clientX - rect.left;
		mouse.y = event.clientY - rect.top;
	}

	function mousedownHandler(event) {
		mouse.left = true;
	}

	function mouseupHandler(event) {
		mouse.left = false;
	}

	return mouse;
}






function tick() {
	requestAnimationFrame(tick);
	DrawMaze();

	if (mouse.x < FRAME || mouse.y < FRAME || mouse.x > canvas.width - FRAME || mouse.y > canvas.height - FRAME) {
		return;
	}

	let x = Math.floor((mouse.x - FRAME) / SIZE);
	let y = Math.floor((mouse.y - FRAME) / SIZE);

	if (mouse.left && !mouse.pLeft) { // постановка или удаление стены
		if (Wall.checked) {
			Matrix_main[y][x] = 0
		}
		else if (Free.checked) {
			Matrix_main[y][x] = 1
		}
		else if (Start.checked && Matrix_main[y][x] != 0) {
			First = [x, y];
			Matrix_main[SPre_y][SPre_x] = 1;
			Matrix_main[y][x] = 3
			SPre_y = y, SPre_x = x

		}
		else if (Finish.checked && Matrix_main[y][x] != 0) {
			Second = [x, y];
			Matrix_main[FPre_y][FPre_x] = 1;
			Matrix_main[y][x] = 2
			FPre_y = y, FPre_x = x
		}
	}

    newButton.addEventListener('click', search);
	function search(){
		for (let y1 = 0; y1 < n; y1++) {
			for (let x1 = 0; x1 < n; x1++) {
				if (Matrix_main[y1][x1] == 4) {
					Matrix_main[y1][x1] = 1;
				}
			}
		}
		if (Matrix_main[y][x]) {
			if (First && Second) {
				let potentialss = getPotentialsMatrix(Matrix_main, First, Second);
				
				for (let y1 = 0; y1 < n; y1++) {
					for (let x1 = 0; x1 < n; x1++) {
						if (potentialss[y1][x1] == 2) {
							Matrix_main[y1][x1] = 4;
						}
					}
				}
				// let [x, y] = First;
				// let potentials = potentials[y][x];
				// path = [[x, y]];

				

				//console.log(potentialss);
			}
		}

	}
}

function getPotentialsMatrix(matrix, First, Second) {
	let potentials = [];

	for (let y = 0; y < matrix.length; y++) {
		const row = [];

		for (let x = 0; x < matrix[y].length; x++) {
			row.push(null);
		}

		potentials.push(row);
	}

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 0) {
				potentials[y][x] = 0;
			}
		}
	}
	let flag = true;
	let End = true;
	var OpenMass = []; //distanse - G
    var CloseMass = []; // индекс для востановления маршрута
	var Active = {ActiveCordX: 0, ActiveCordY: 0, ActiveG: 0, ActiveF: 0} // клетка, которую смотрю в моменте 
	var Finish = {FinishX: Second[0], FinishY: Second[1], FinishG: 0, FinishF: 0}
	Active.ActiveCordY = First[1], Active.ActiveCordX = First[0];

	while (End == true || OpenMass.length == 0)  {  
		x = Active.ActiveCordX, y = Active.ActiveCordY;
	
		if (y > 0 && potentials[y - 1][x] != 0 && potentials[y - 1][x] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - x)) + (Math.abs(Finish.FinishY - (y - 1)))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x && OpenMass[j].y == y - 1) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 10) {
						OpenMass[j].G = Active.ActiveG + 10;
						OpenMass[j].F =  H + Active.ActiveG + 10;
						flag = false;
						break;
					}
				}	
			}
	
			if ((y - 1) == Finish.FinishY && x == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x, y: y - 1, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10});
			}
		}
		
		if (y > 0 && x > 0 && potentials[y - 1][x - 1] != 0 && potentials[y - 1][x - 1] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - (x - 1))) + (Math.abs(Finish.FinishY - (y - 1)))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x - 1 && OpenMass[j].y == y - 1) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 14) {
						OpenMass[j].G = Active.ActiveG + 14;
						OpenMass[j].F =  H + Active.ActiveG + 14;
						flag = false;
						break;
					}
				}	
			}
	
			if ((y - 1) == Finish.FinishY && (x - 1) == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x - 1, y: y - 1, G: Active.ActiveG + 14,F: H + Active.ActiveG + 14});
			}
		}
	
		if (x < n - 1 && potentials[y][x + 1] != 0 && potentials[y][x + 1] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - (x + 1))) + (Math.abs(Finish.FinishY - y))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x + 1 && OpenMass[j].y == y) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 10) {
						OpenMass[j].G = Active.ActiveG + 10;
						OpenMass[j].F =  H + Active.ActiveG + 10;
						flag = false;
						break;
					}
				}	
			}
	
			if (y == Finish.FinishY && (x + 1) == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x + 1, y: y, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10});
			}
		}
	
		if (y < n - 1 && x < n - 1 && potentials[y + 1][x + 1] != 0 && potentials[y + 1][x + 1] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - (x + 1))) + (Math.abs(Finish.FinishY - (y + 1)))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x + 1 && OpenMass[j].y == y + 1) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 14) {
						OpenMass[j].G = Active.ActiveG + 14;
						OpenMass[j].F =  H + Active.ActiveG + 14;
						flag = false;
						break;
					}
				}	
			}
	
			if ((y + 1) == Finish.FinishY && (x + 1) == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x + 1, y: y + 1, G: Active.ActiveG + 14, F: H + Active.ActiveG + 14});
			}
		}
	
		if (y < n - 1 && potentials[y + 1][x] != 0 && potentials[y + 1][x] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - x)) + (Math.abs(Finish.FinishY - (y + 1)))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x && OpenMass[j].y == y + 1) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 10) {
						OpenMass[j].G = Active.ActiveG + 10;
						OpenMass[j].F =  H + Active.ActiveG + 10;
						flag = false;
						break;
					}
				}	
			}
	
			if ((y + 1) == Finish.FinishY && x == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x, y: y + 1, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10});
			}
		}
	
		if (y < n - 1 && x > 0 && potentials[y + 1][x - 1] != 0 && potentials[y + 1][x - 1] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - (x - 1))) + (Math.abs(Finish.FinishY - (y + 1)))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x - 1 && OpenMass[j].y == y + 1) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 14) {
						OpenMass[j].G = Active.ActiveG + 14;
						OpenMass[j].F =  H + Active.ActiveG + 14;
						flag = false;
						break;
					}
				}	
			}
	
			if ((y + 1) == Finish.FinishY && (x - 1) == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x - 1, y: y + 1, G: Active.ActiveG + 14, F: H + Active.ActiveG + 14});
			}
		}
			
		if (x > 0 && potentials[y][x - 1] != 0 && potentials[y][x - 1] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - (x - 1))) + (Math.abs(Finish.FinishY - y))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x - 1 && OpenMass[j].y == y) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 10) {
						OpenMass[j].G = Active.ActiveG + 10;
						OpenMass[j].F =  H + Active.ActiveG + 10;
						flag = false;
						break;
					}
				}	
			}
	
			if (y == Finish.FinishY && (x - 1) == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x - 1, y: y, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10});
			}
		}
	
		if (y > 0 && x < n - 1 && potentials[y - 1][x + 1] != 0 && potentials[y - 1][x + 1] != 2 && End == true) {
			flag = true;
			let H = ((Math.abs(Finish.FinishX - (x + 1))) + (Math.abs(Finish.FinishY - (y - 1)))) * 10;
			for (j = 0; OpenMass.length > j; j++){
				if (OpenMass[j].x == x + 1 && OpenMass[j].y == y - 1) {
					flag = false;
					if(OpenMass[j].G > Active.ActiveG + 14) {
						OpenMass[j].G = Active.ActiveG + 14;
						OpenMass[j].F =  H + Active.ActiveG + 14;
						flag = false;
						break;
					}
				}	
			}
	
			if ((y - 1) == Finish.FinishY && (x + 1) == Finish.FinishX) {
				End = false;
			}
			else if (flag == true) {
				OpenMass.push({x: x + 1, y: y - 1, G: Active.ActiveG + 14, F: H + Active.ActiveG + 14});
			}
		}
	
		CloseMass.push({CloseCordX: Active.ActiveCordX, CloseCordY: Active.ActiveCordY, CloseG: Active.ActiveG, CloseF: Active.ActiveF, ind: CloseMass.length});
		if (End == false) {
			CloseMass.push({ind: CloseMass.length});  //CloseG: FinishG, CloseF: FinishF, 
			potentials[Finish.FinishY][Finish.FinishX] = 2;
		}
		let minIndexx = -1;
		let min = 9999999999;
		potentials[y][x] = 2;
		for (j = 0; OpenMass.length > j; j++) {
			if (OpenMass[j].F < min){
				min = OpenMass[j].F;
				minIndexx = j;
			}
		}
	
		Active.ActiveCordX = OpenMass[minIndexx].x;
		Active.ActiveCordY = OpenMass[minIndexx].y;
		Active.ActiveG = OpenMass[minIndexx].G;
		Active.ActiveF = OpenMass[minIndexx].F;
		OpenMass.splice(minIndexx, 1);
		
	}
	//console.log(potentials)
	return potentials;
}
//console.log(CloseMass)

