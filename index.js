class Grid {
  
}

class Rover {
  constructor(x, y, orientation) {
    this.x = x
    this.y = y
    this.orientation = orientation
  }

  parseCommand () {
    
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
    // let circleArr = directionArr[(directionArr.index % 4 + 4) % 4];

    if (direction === 'R') {
      directionNum++

      if (directionNum === 4) {
        directionNum = 0
      }
    } else if (direction === 'L') {
      directionNum--

      if (directionNum === 0) {
        directionNum = 3
      }
    }

    this.orientation = directionArr[directionNum]
  }

  // private moveBasedOnCurrentDirection() {
  //   switch this.orientation:
  //     case 'N':
  //       this.y++
  //       break;
      
  //     case 'E':
  //       this.x++
  //       break;

  //     case 'S':
  //       this.y--
  //       break;

  //     case 'W':
  //       this.x--
  //       break;
  // }
}

module.exports = { Grid, Rover };
