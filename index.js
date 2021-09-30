class Grid {
  
}

class Rover {
  constructor(x, y, orientation) {
    this.x = x
    this.y = y
    this.orientation = orientation
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
