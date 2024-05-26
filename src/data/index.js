import { getRandomNumber } from "../utils/index.js";

const rawData = "우주선 '알테어'가 외계 신호를 추적해 어느 행성에 도착했다.\n";

const words = rawData.split("");

let currentIndex = 0;
function getNextWord() {
  if (currentIndex >= words.length) {
    currentIndex = 0;
  }
  const word = words[currentIndex];
  currentIndex += 1;
  return word;
}

let timeout = undefined;
export function startGeneratingWord(cb) {
  timeout = setTimeout(() => {
    console.log("Generating word", getRandomNumber(1, 10));
    const word = getNextWord();
    cb(word);
    if (word !== "\n") {
      startGeneratingWord(cb);
    }
  }, getRandomNumber(100, 700));
}

export function stopGeneratingWord() {
  clearTimeout(timeout);
}
