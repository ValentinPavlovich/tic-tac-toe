var boardSize = prompt('Размер игрового поля (3-8):', 3); // Размер игрового поля

if (!parseInt(boardSize)) {
  alert( "Введите число от 3 до 8!" );
} else if (boardSize < 3) {
  boardSize = 3;
} else if (boardSize > 8) {
  boardSize = 8;
}

/* Отрисовка в игре корректно работает для размера игрового поля не больше 8x8. Для этого пришлось изменить данные в файле style.css в строках 12, 13, 19, 30 */

// Начальные объявления
let boardL = [];
let players = [];
let activePlayer;

// Функция startGame
function startGame() {
  players = ['x', 'o'];
  activePlayer = 0; // Установить активного игрока

  // Создать игровое поле. Оно должно представлять из себя массив массивов. Для обращения к ячейке игрового поля нужно знать строку и колонку этого поля.
  for (let i = 0; i < boardSize; i++) {
      boardL[i] = [];
    for (let k = 0; k < boardSize; k++) {
      boardL[i][k] = '';
    }
  }
  renderBoard(boardL); // Вызвать функцию renderBoard для отрисовки игрового поля
 }

// Функция click
function click(rowL, columnL) {

  // Обновить игровое поле, записать в нужную ячейку символ игрока
  boardL[rowL][columnL] = players[activePlayer];  
  renderBoard(boardL); // Вызвать функцию renderBoard для отрисовки игрового поля

  /* Проверить, выигрышная ли сложилась ситуация.
  Если ситуация выигрышная, вызвать функцию showWinner и передать в нее номер игрока */

    // Начальные присваивания в функции click
    let sumRow; // Счетчик меток активного игрока по горизонтали
    let sumColumn; // Счетчик меток активного игрока по вертикали
    let sumDiag1 = 0; // Счетчик меток активного игрока по диагонали1 (сверху-вниз-направо)
    let sumDiag2 = 0; // Счетчик меток активного игрока по диагонали2 (снизу-вверх-направо)
    
    // Внешний цикл
    for (let i = 0; i < boardL.length; i++) {

      // Проверка меток активного игрока по диагоналям
      if (boardL[i][i] === players[activePlayer]) {
        sumDiag1 += 1;
      }
      if (boardL[Math.abs(i-(boardL.length-1))][i] === players[activePlayer]) {
        sumDiag2 += 1;
      }

      sumRow = 0; // Очистка счетчика меток активного игрока по горизонтали
      sumColumn = 0; // Очистка счетчика меток активного игрока по вертикали

      // Внутренний цикл
      for (let k = 0; k < boardL.length; k++) {

        // Проверка меток активного игрока
        if (boardL[i][k] === players[activePlayer]) {  // По горизонтали
          sumRow += 1;
        }

        if (boardL[k][i] === players[activePlayer]) { // По вертикали
          sumColumn += 1;
        }
      }

        // Если сумма меток активного игрока по горизонтали или вертикали максимальна   
        if (sumRow === boardL.length || sumColumn === boardL.length) {
          showWinner(activePlayer); // Вызвать функцию showWinner и передать в нее номер игрока
        } 
    }
     
        // Если сумма меток активного игрока по какой-либо диагонали максимальна
        if (sumDiag1 === boardL.length || sumDiag2 === boardL.length) {
          showWinner(activePlayer); // Вызвать функцию showWinner и передать в нее номер игрока
        }

      // Если нужно играть дальше, то передать ход следующему игроку
      activePlayer = Math.abs(activePlayer - 1) 
}