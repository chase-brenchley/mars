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
  constructor (sizeString) {
    const sizeX = parseInt(sizeString.split(' ')[0])
    const sizeY = parseInt(sizeString.split(' ')[1])
    this.grid = new Grid(sizeX, sizeY);
  }
}

module.exports = { Rover, InputParser };
