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

    console.log(`After the command ${cmd}, the rover is now at position ${this.x}, ${this.y}, ${this.orientation}`)
  }

  move () {
    switch (this.orientation) { 
      case 'N':
        this.y++
        break;
      
      case 'E':
        this.x++
        break;

      case 'S':
        this.y--
        break;

      case 'W':
        this.x--
        break;
    }
    console.log(this.y);
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
    // const [gridSize, roverPos, cmds] = input.split('\n')
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

module.exports = { InputParser, Rover };
