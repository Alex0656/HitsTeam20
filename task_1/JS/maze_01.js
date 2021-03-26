const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const FRAME = 15
const BACKGROUND_COLOR = "gray"
const WELL_COLOR = "black"
const FREE_COLOR = "white"
const ERASER_COLOR = "red"
const DELAY_TIME = 0
const WIDTH_1 = 500
const HEIGHT_1 = 500
const ERASER = {
    x: 0,
    y: 0,
};

//let n = prompt("Размер матрицы")
let n = 20
if (n % 2 === 0) {
    n++;
}
const SIZE = WIDTH_1 / n

const Matrix = CreateMatrix(n,n)
Matrix[ERASER.y][ERASER.x] = true

function RandomItem(mass) {
    const index = Math.floor(Math.random() * mass.length)
    return mass[index]
}
function CreateMatrix(columns, rows) {
    const Matrix = []
    for (let y = 0; rows > y; y++){
        const row = []
        for (let x = 0; columns > x; x++){
            row.push(false)
        }
        Matrix.push(row)
    }
    return Matrix
}
function DrawMaze(){
    canvas.width = FRAME * 2 + WIDTH_1
    canvas.height = FRAME * 2 + HEIGHT_1
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fillStyle = BACKGROUND_COLOR
    context.fill()
    for(let y = 0; n > y; y++){
        for(let x = 0; n > x; x++) {
            //const color = Matrix[y][x] ? FREE_COLOR : WELL_COLOR
            if (Matrix[y][x] === true) {
                color = FREE_COLOR
            }
            else {
                color = WELL_COLOR
            }
            context.beginPath()
            context.rect(FRAME + SIZE * x, FRAME + SIZE * y, SIZE, SIZE)
            context.fillStyle = color
            context.fill()
        }
    }
    context.beginPath()
    context.rect(FRAME + ERASER.x * SIZE, FRAME + ERASER.y * SIZE, SIZE, SIZE)
    context.fillStyle = ERASER_COLOR
    context.fill()

}
function DrawMaze_1(){
    canvas.width = FRAME * 2 + WIDTH_1
    canvas.height = FRAME * 2 + HEIGHT_1
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fillStyle = BACKGROUND_COLOR
    context.fill()
    for(let y = 0; n > y; y++){
        for(let x = 0; n > x; x++) {
            //const color = Matrix[y][x] ? FREE_COLOR : WELL_COLOR
            if (Matrix[y][x] === true) {
                color = FREE_COLOR
            }
            else {
                color = WELL_COLOR
            }
            context.beginPath()
            context.rect(FRAME + SIZE * x, FRAME + SIZE * y, SIZE, SIZE)
            context.fillStyle = color
            context.fill()
        }
    }
}
function Move() {
    Ways = []
    if (ERASER.x > 0) {
        Ways.push([-2, 0])
    }
    if (ERASER.x < n - 1) {
        Ways.push([2, 0])
    }
    if (ERASER.y > 0) {
        Ways.push([0, -2])
    }
    if (ERASER.y < n - 1) {
        Ways.push([0, 2])
    }
    const [x_0, y_0] = RandomItem(Ways)
    ERASER.x += x_0
    ERASER.y += y_0
    if (Matrix[ERASER.y][ERASER.x] === false){
        Matrix[ERASER.y][ERASER.x] = true
        Matrix[ERASER.y - y_0 / 2][ERASER.x - x_0 / 2] = true
    }
}
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}
function CompletedMaze(){
    for (let y = 0; y < n; y += 2){
        for (let x = 0; x < n; x += 2){
            if (Matrix[y][x] === false){
                return false
            }
        }
    }
    return true
}
// разобраться с задержкой, узнать чо такое "async", узнать чо такое "await"

// 1) сделать кнопку для включения анимации
// 2) Добавить возможность регулировки количества ластиков
// 3) как-то зафиксировать экран для норм интерфейса, 
//    можно сделать кнопку количества размера одной ячейки для генерации 
//    более больших лабиринтов
main()

async function main () {
    while(!CompletedMaze()) { 
        Move()
        DrawMaze ()
        await delay(DELAY_TIME)
    }
    DrawMaze_1()
}

console.log(Matrix)

canvas.addEventListener("click", function(e) {
console.log(e.offsetX);
console.log(e.offsetY);
Matrix[e.offsetY][e.offsetX] = true
});
{/* <label> Значение матрицы</label><input name = "n" type="number"/>
        <div class = "button-div">
            <button type = "submit">Генерация</button> */}
