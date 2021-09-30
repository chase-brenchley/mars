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
