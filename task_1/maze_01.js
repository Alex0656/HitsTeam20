const n = 7;
let First = [4, 0];
let Second = [1, 4];

let temp = true;
let flag = true;
let End = true;
var OpenMass = []; //distanse - G
var CloseMass = []; // индекс для востановления маршрута
var Active = {ActiveCordX: 0, ActiveCordY: 0, ActiveG: 0, ActiveF: 0, ind: -1} // клетка, которую смотрю в моменте 
var Finish = {FinishX: Second[0], FinishY: Second[1], FinishG: 0, FinishF: 0}
Active.ActiveCordY = First[1], Active.ActiveCordX = First[0];

const potentials = createMatrixx(n, n);
function createMatrixx(n, n) {
	const matrix = [];
	for (let y = 0; y < n; y++) {
		const row = [];
		for (let x = 0; x < n; x++) {
			row.push(1);
		}
		matrix.push(row);
	}
	return matrix;
}

potentials[1][2] = 0;
potentials[1][3] = 0;
potentials[1][4] = 0;
potentials[1][5] = 0;
//potentials[1][0] = 0;
//potentials[1][1] = 0;
//potentials[1][6] = 0;
potentials[3][1] = 0;
potentials[3][2] = 0;

while (End == true)  {  
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
			OpenMass.push({x: x, y: y - 1, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10, id: CloseMass.length});
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
			OpenMass.push({x: x - 1, y: y - 1, G: Active.ActiveG + 14,F: H + Active.ActiveG + 14, id: CloseMass.length});
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
			OpenMass.push({x: x + 1, y: y, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10, id: CloseMass.length});
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
			OpenMass.push({x: x + 1, y: y + 1, G: Active.ActiveG + 14, F: H + Active.ActiveG + 14, id: CloseMass.length});
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
			OpenMass.push({x: x, y: y + 1, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10, id: CloseMass.length});
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
			OpenMass.push({x: x - 1, y: y + 1, G: Active.ActiveG + 14, F: H + Active.ActiveG + 14, id: CloseMass.length});
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
			OpenMass.push({x: x - 1, y: y, G: Active.ActiveG + 10, F: H + Active.ActiveG + 10, id: CloseMass.length});
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
			OpenMass.push({x: x + 1, y: y - 1, G: Active.ActiveG + 14, F: H + Active.ActiveG + 14, id: CloseMass.length});
		}
	}

	CloseMass.push({CloseCordX: Active.ActiveCordX, CloseCordY: Active.ActiveCordY, CloseG: Active.ActiveG, CloseF: Active.ActiveF, PreID: Active.ind});
	Active.ind = CloseMass.length - 1;
	if (End == false) {
		CloseMass.push({ind: CloseMass.length - 1});  //CloseG: FinishG, CloseF: FinishF, 
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
console.log(potentials) 
console.log(OpenMass)
console.log(CloseMass)



// var OpenMass = [{x: 0, y: 0, G: 0, F: 0}]; //distanse - G
// var CloseMass = [{x: 0, y: 0, G: 0, F: 0, ind: -1}]; // индекс для востановления маршрута
// var Active = {ActiveCordX: 0, ActiveCordY: 0, ActiveG: 0, ActiveF: 0} // клетка, которую смотрю в моменте 
// var NewActive = {ActiveCordX: 0, ActiveCordY: 0, ActiveG: 0, ActiveF: 0}
// var NewCloseMass = {x: 0, y: 0, G: 0, F: 0, ind: 0};
