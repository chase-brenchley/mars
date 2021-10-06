class Grid {
  constructor (sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
  }
}

class Rover {
  constructor (x, y, orientation) {
    this.x = x
    this.y = y
    this.orientation = orientation
    this.grid = null
  }

  setGrid(grid) {
    this.grid = grid;
  }

  parseCommand (cmd) {
    switch (cmd) {
      case 'L':
      case 'R':
        this.rotate(cmd)
        break;
      case 'F':
        this.move()
        break;
    }
  }

  move () {
    switch (this.orientation) { 
      case 'N':
        if (this.y < this.grid.sizeY) {
          this.y++
        } else {
          this.y = 0
        }
        break;
      
      case 'E':
        if (this.x < this.grid.sizeX) {
          this.x++
        } else {
          this.x == 0
        }
        break;

      case 'S':
        if (this.y === 0) {
          this.y = this.grid.sizeY - 1
        } else {
          this.y--
        }
        break;

      case 'W':
        if (this.x === 0) {
          this.x = this.grid.sizeX - 1
        } else {
          this.x--
        }
        break;
    }
  }

  rotate (direction) {
    let directions = { N: 0, E: 1, S: 2, W: 3 }
    let directionArr = ['N', 'E', 'S', 'W']
    let directionNum = directions[this.orientation]

    if (direction === 'R') {
      directionNum++

      if (directionNum === 4) {
        directionNum = 0
      }
    } else if (direction === 'L') {
      directionNum--

      if (directionNum === -1) {
        directionNum = 3
      }
    }

    this.orientation = directionArr[directionNum]
  }

  printCurrentLocation() {
    console.log(`${this.x} ${this.y} ${this.orientation}`);
  }
}

class InputParser {
  constructor (input) {

  }

  parseGridInput(input) {
    const sizeX = parseInt(input.split(' ')[0])
    const sizeY = parseInt(input.split(' ')[1])
    return new Grid(sizeX, sizeY)
  }

  parseRoverCreateInput(input) {
    const xPos = parseInt(input.split(' ')[0])
    const yPos = parseInt(input.split(' ')[1])
    const orientation = input.split(' ')[2]
    return new Rover(xPos, yPos, orientation)
  }

  sendCommandToRover(input, rover) {
    for (let i = 0; i < input.length; i++) {
      rover.parseCommand(input[i])
    }
  }
}

const main = () => {
  const readline = require("readline");
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  const inputParser = new InputParser()

  rl.question("First line of input: ", function(firstLine) {
      rl.question("Second line of input: ", function(secondLine) {
        rl.question("Third line of input: ", thirdLine => {
          const grid = inputParser.parseGridInput(firstLine)
          const rover = inputParser.parseRoverCreateInput(secondLine)
          rover.setGrid(grid)

          inputParser.sendCommandToRover(thirdLine, rover)
          rover.printCurrentLocation()
          rl.close();
        });
      });
  });

  rl.on("close", function() {
      console.log("\nBYE BYE !!!");
      process.exit(0);
  });
}

main()

module.exports = { InputParser, Rover };
