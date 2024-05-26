// generate random number between min and max
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to convert websocket raw data to string
export function decode(data) {
  return new TextDecoder("utf-8").decode(data);
}
