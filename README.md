## Sumplete game

This simple game is a combination of Sudoku and Japanese crossword puzzles. The goal is to use the numbers in the grid to ensure that the sum of the remaining numbers in each row and column equals the specified value.

## Install 

To run the game, follow these commands:

- Install dependencies using `npm install` or `yarn`.
- Build the game with `npm build`.
- Start the game using `npm start`.
- Open [http://localhost:3000](http://localhost:3000) in your web browser.

Alternatively, you can run the game in a container using `docker-compose up`, and then access the game at [http://localhost](http://localhost) in your web browser.

## Features

- Save unfinished games in local storage for later continuation.
- Quickly cross all unused numbers or select all remaining numbers by pressing the line sum number.
- Press the "Check" button to verify your solution and highlight cells with incorrect marks.
- Press the "Hint" button to reveal one random number.
- Press the "Reveal" button to view the solution.

You can see preview below

![Demo1](https://github.com/Iluxmas/sumplete/blob/main/public/demo1.gif)

![Demo3](https://github.com/Iluxmas/sumplete/blob/main/public/demo3.gif)
