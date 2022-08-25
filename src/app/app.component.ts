import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="statusArea" className="status">
      It's your turn
      <span
        ><b>{{ currentPlayer }}</b></span
      >
    </div>
    <div id="winnerArea" className="winner">
      Winner: <span>{{ winner }}</span>
    </div>
    <button (click)="resetGame()">Reset Game</button>
    <section style="margin: 10px auto">
      <div class="board" *ngFor="let row of [0, 1, 2]">
        <button
          *ngFor="let col of [0, 1, 2]"
          style="width:40px;height:40px;"
          (click)="switch(row, col)"
        >
          {{ grid[row][col] }}
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .board {
        display: flex;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-tic-tac-toe';
  grid: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  winner: string = '';
  currentPlayer = 'X';
  winningCombos = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  switch(row: number, col: number) {
    if (this.grid[row][col] === '' && this.winner === '') {
      this.grid[row][col] = this.currentPlayer;
      this.getWinner(0, this.currentPlayer);

      if (this.winner === '') {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      } else {
        this.currentPlayer = '__';
      }
    }
  }

  getWinner(combo: number, currentPlayer: string): string {
    if (combo > this.winningCombos.length - 1) return '';
    const map: string[] = [];

    for (let i = 0; i < this.winningCombos[combo].length; i++) {
      const [row, col] = this.winningCombos[combo][i];

      map.push(this.grid[row][col]);
    }

    console.log(combo);

    return map.every((cell: string) => cell === currentPlayer)
      ? this.winner = currentPlayer
      : this.getWinner(combo + 1, currentPlayer);
  }

  resetGame() {
    this.grid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.winner = '';
    this.currentPlayer = 'X';
  }
}
