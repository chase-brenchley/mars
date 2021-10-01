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

test('should parse an F command', () => {
  const spy = jest.spyOn(rover, 'move')
  
  rover.parseCommand('F')
  expect(spy).toHaveBeenCalledTimes(1)
})

test('should rotate when given rotate command', () => {
  const rotateSpy = jest.spyOn(rover, 'rotate');
  
  rover.parseCommand('L')
  expect(rotateSpy).toHaveBeenCalledTimes(1);

  rover.parseCommand('R')
  expect(rotateSpy).toHaveBeenCalledTimes(2);

  rover.parseCommand('F')
  expect(rotateSpy).toHaveBeenCalledTimes(2);
})

it('rover should print its location', () => {
  const rover = new Rover(startingX, startingY, startingOrientation);
  const locationText = `${startingX} ${startingY} ${startingOrientation}`
  console.log = jest.fn();
  
  rover.printCurrentLocation();
  expect(console.log).toHaveBeenCalledWith(locationText);
})
