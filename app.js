class Token {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.player = 0  
    }
  }

let currentPlayer = 1
const gameOver = false 
const boardMatrix = new Array();
const board = document.querySelector(".board")
const button = document.querySelector(".reset-button")
const titleCurrentPlayer = document.getElementById('title-current-player')

let currentColumn
window.onload = function() {
  createBoard()
  console.log(boardMatrix)
}
function createBoard(){
  for (let i = 0; i < 6; i++) {
    boardMatrix[i] = new Array()
    currentColumn = [5,5,5,5,5,5,5]
    for (let j = 0; j < 7; j++) {

      let token = new Token(i, j)
      boardMatrix[i].push(token)
      let tokenBoard = document.createElement("div")
      tokenBoard.id = (`${i}-${j}`)
      tokenBoard.classList.add("token-container")
      tokenBoard.addEventListener('click', setPiece)
      board.appendChild(tokenBoard)

    }

  }
  
}
function search(x, y){
  for (let i = 0; i<6; i++){
    for (let j = 0; j<7; j++){
      if (boardMatrix[i][j].x === x && boardMatrix[i][j].y === y){
        boardMatrix[i][j].player = currentPlayer
        console.log(boardMatrix[i][j])
      }
    }
  }
}

function isWinner(){

  
  for (let i = 0; i<6; i++){
    for (let j = 0; j<4; j++){
      if (boardMatrix[i][j].player != 0){
        //check horizontal
        if (boardMatrix[i][j].player == boardMatrix[i][j+1].player  && boardMatrix[i][j+1].player == boardMatrix[i][j+2].player && boardMatrix[i][j+2].player == boardMatrix[i][j+3].player){
          if (boardMatrix[i][j].player == 1){
            alert('Player One Won!')
          }else{
            alert('Player Two Won!')
          }
          //check vertical
        }else if(boardMatrix[i][j].player == boardMatrix[i+1][j].player  && boardMatrix[i+1][j].player == boardMatrix[i+2][j].player && boardMatrix[i+2][j].player == boardMatrix[i+3][j].player){
          if (boardMatrix[i][j].player == 1){
            alert('Player One Won!')
          }else{
            alert('Player Two Won!')
          }
        }
      }
    }
  }
  
}

function setPiece(){
  console.log(this)
  let coords = this.id.split("-")
  
  let x = parseInt(coords[0])
  let y = parseInt(coords[1])

  x = currentColumn[y]
  if (x < 0){
    return 
  }
  let piece = document.getElementById(x.toString()+"-"+ y.toString())
  if (currentPlayer == 1) {
    piece.classList.add('red-piece')
    search(x, y)
    currentPlayer = 2
  }else{
    piece.classList.add('yellow-piece')
    search(x, y)
    currentPlayer = 1
  }
  x-=1
  currentColumn[y] = x
  isWinner()
  
}

//follow cursor position in board
titleCurrentPlayer.addEventListener('mousemove', function(e){
  let xPosition = e.clientX
  let yPosition = e.clientY

  titleCurrentPlayer.style.left = xPosition + 'px'
  titleCurrentPlayer.style.top = yPosition + 'px'
})