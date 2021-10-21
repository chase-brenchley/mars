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

    if (orientation == 'N') {
      this.setState(new NorthState(this))
    } else if (orientation == 'E') {
      this.setState(new EastState(this))
    } else if (orientation == 'S') {
      this.setState(new SouthState(this))
    } else if (orientation == 'W') {
      this.setState(new WestState(this))
    }
  }

  setState(state) {
    this.state = state;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  parseCommand (cmd) {
    switch (cmd) {
      case 'L':
        this.state.moveLeft()
        // forgot this break
        break;
      case 'R':
        this.state.moveRight()
        break;
      case 'F':
        this.state.moveForward()
        break;
    }
  }

  printCurrentLocation() {
    console.log(`${this.x} ${this.y} ${this.orientation}`);
  }
}

class NorthState {

  constructor(rover) {
    this.rover = rover
  }
  
  moveRight() {
    this.rover.orientation = 'E'
    this.rover.setState(new EastState(this.rover))
  }

  moveLeft() {
    this.rover.orientation = 'W'
    this.rover.setState(new WestState(this.rover))
  }

  moveForward() {
    if (this.rover.y < this.rover.grid.sizeY) {
      this.rover.y++
    } else {
      this.rover.y = 0
    }
  }
}

class WestState {

  constructor(rover) {
    this.rover = rover
  }
  
  moveRight() {
    this.rover.orientation = 'N'
    this.rover.setState(new NorthState(this.rover))
  }

  moveLeft() {
    this.rover.orientation = 'S'
    this.rover.setState(new SouthState(this.rover))
  }

  moveForward() {
    if (this.rover.x === 0) {
      this.rover.x = this.rover.grid.sizeX - 1
    } else {
      this.rover.x--
    }
  }
}

class SouthState {

  constructor(rover) {
    this.rover = rover
  }
  
  moveRight() {
    this.rover.orientation = 'W'
    this.rover.setState(new WestState(this.rover))
  }

  moveLeft() {
    this.rover.orientation = 'E'
    this.rover.setState(new EastState(this.rover))
  }

  moveForward() {
    if (this.rover.y === 0) {
      this.rover.y = this.rover.grid.sizeY - 1
    } else {
      this.rover.y--
    }
  }
}

class EastState {

  constructor(rover) {
    this.rover = rover
  }
  
  moveRight() {
    this.rover.orientation = 'S'
    this.rover.setState(new SouthState(this.rover))
  }

  moveLeft() {
    this.rover.orientation = 'N'
    this.rover.setState(new NorthState(this.rover))
  }

  moveForward() {
    if (this.rover.x < this.rover.grid.sizeX) {
      this.rover.x++
    } else {
      this.rover.x == 0
    }
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
      // console.debug(`Rover is parsing ${input[i]} command. Its current position is x: ${rover.x}, y: ${rover.y}, ${rover.orientation}`)
      rover.parseCommand(input[i])
      // console.debug(`After parsing command, its current position is x: ${rover.x}, y: ${rover.y}, ${rover.orientation}`)
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

// main()

module.exports = { InputParser, Rover };
