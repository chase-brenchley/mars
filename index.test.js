const { Rover, Grid } = require('./index');

const startingX = 1
const startingY = 2
const startingOrientation = 'N'
const rover = new Rover(startingX, startingY, startingOrientation);

test('given the first line of input, create a rover', () => {
  expect(rover.x).toEqual(startingX)
  expect(rover.y).toEqual(startingY)
  expect(rover.orientation).toEqual(startingOrientation)
})

test('should move rover forward', () => {
  rover.move()
  expect(rover.x).toEqual(startingX)
  expect(rover.y).toEqual(startingY + 1)
  expect(rover.orientation).toEqual(startingOrientation)
})

test('should rotate the rover right', () => {
  rover.rotate('R')
  expect(rover.orientation).toEqual('E')

  rover.rotate('R')
  expect(rover.orientation).toEqual('S')

  rover.rotate('R')
  expect(rover.orientation).toEqual('W')

  rover.rotate('R')
  expect(rover.orientation).toEqual('N')
})
