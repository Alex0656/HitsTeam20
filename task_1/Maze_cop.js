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
const n = 11
let Start = document.getElementById("radio0");
let Finish = document.getElementById("radio1");
let Wall = document.getElementById("radio3");
let Free = document.getElementById("radio2");
const newButton = document.getElementById('newButton');
const newButton1 = document.getElementById('newButton1');

let Size_11 = document.getElementById("radi11");
let Size_19 = document.getElementById("radi19");
let Size_51 = document.getElementById("radi51");
let Size_101 = document.getElementById("radi101");

if (Size_11.checked) {
	const n = 11;
}
else if (Size_19.checked) {
	const n = 19
}
else if (Size_51.checked) {
	const n = 51
}
else if (Size_101.checked) {
	const n = 101
}



const SIZE = WIDTH_1 / n
let First = null;
let Second = null;
let SecondMat = null;
let path = null;

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
	requestAnimationFrame(tick);
}




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

	if (path) {
		for (const [x, y] of path) {
			context.fillStyle = "purple";
			context.fillRect(FRAME + x * SIZE,FRAME + y * SIZE, SIZE, SIZE);
		}
	}

	if (mouse.x < FRAME || mouse.y < FRAME || mouse.x > canvas.width - FRAME || mouse.y > canvas.height - FRAME) {
		return;
	}

	const x = Math.floor((mouse.x - FRAME) / SIZE);
	const y = Math.floor((mouse.y - FRAME) / SIZE);

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
		if (Matrix_main[y][x]) {

			if (First && Second) {
				potentials = getPotentialsMatrix(Matrix_main, First, Second);
	
				let [x, y] = First;
				let potential = potentials[y][x];
				path = [[x, y]];
	
				while (potential !== 0) {
					potential--;
	
					if (y > 0 && potentials[y - 1][x] === potential) {
						path.push([x, y - 1]);
						y--;
						continue;
					}
	
					if (y < n - 1 && potentials[y + 1][x] === potential) {
						path.push([x, y + 1]);
						y++;
						continue;
					}
	
					if (x > 0 && potentials[y][x - 1] === potential) {
						path.push([x - 1, y]);
						x--;
						continue;
					}
	
					if (x < n - 1 && potentials[y][x + 1] === potential) {
						path.push([x + 1, y]);
						x++;
						continue;
					}
				}
	
				console.log(path);
			}
		}
	
// 		if (potentials) {
// 			for (let y = 0; y < n; y++) {
// 				for (let x = 0; x < n; x++) {
// 					if (potentials[y][x] === null || potentials[y][x] === false) {
// 						continue;
// 					}
	
// 					context.fillStyle = "red";
// 					context.font = "30px serif";
// 					context.textAlign = "center";
// 					context.textBaseline = "middle";
// 					context.fillText(
// 						potentials[y][x],
// 						FRAME + x * SIZE + SIZE * 0.5,
// 						FRAME + y * SIZE + SIZE * 0.5
// 					);
// 				}
// 			}
// 		}
// 		mouse.update();

// 	}	
// }

	}
}

function getPotentialsMatrix(matrix, [x1, y1], [x2, y2]) {
	const potentials = [];

	for (let y = 0; y < matrix.length; y++) {
		const row = [];

		for (let x = 0; x < matrix[y].length; x++) {
			row.push(null);
		}

		potentials.push(row);
	}

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] === 0) {
				potentials[y][x] = false;
			}
		}
	}

	potentials[y2][x2] = 0;
	
	while (potentials[y1][x1] === null) {
		for (let y = 0; y < matrix.length; y++) {
			for (let x = 0; x < matrix[y].length; x++) {
				
				if (potentials[y][x] === false || potentials[y][x] === null) {
					continue;
				}

				const number = potentials[y][x] + 1;

				if (y > 0 && potentials[y - 1][x] !== false) {
					if (potentials[y - 1][x] === null) {
						potentials[y - 1][x] = number;
					} else {
						potentials[y - 1][x] = Math.min(potentials[y - 1][x], number);
					}
				}
				if (y < matrix.length - 1 && potentials[y + 1][x] !== false) {
					if (potentials[y + 1][x] === null) {
						potentials[y + 1][x] = number;
					} else {
						potentials[y + 1][x] = Math.min(potentials[y + 1][x], number);
					}
				}
				if (x > 0 && potentials[y][x - 1] !== false) {
					if (potentials[y][x - 1] === null) {
						potentials[y][x - 1] = number;
					} else {
						potentials[y][x - 1] = Math.min(potentials[y][x - 1], number);
					}
				}
				if (x < matrix[0].length - 1 && potentials[y][x + 1] !== false) {
					if (potentials[y][x + 1] === null) {
						potentials[y][x + 1] = number;
					} else {
						potentials[y][x + 1] = Math.min(potentials[y][x + 1], number);
					}
				}
			}
		}
	}

	return potentials;
}

