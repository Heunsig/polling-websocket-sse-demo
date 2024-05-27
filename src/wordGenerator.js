import { getRandomNumber } from "./utils/index.js";

export class WordGenerator {
  constructor(rawData) {
    this.cb = undefined;
    this.timeout = undefined;
    
    this.rawData = rawData;
    this.words = this.rawData.split("");
    this.box = [];
    // TODO: need to understand Proxy object
    this.boxProxy = new Proxy(this.box, {
      set: (target, prop, value) => {
        if (prop !== "length") {
          if (this.cb) {
            this.cb(this.getWordsFromBox());
          }
        }
        return Reflect.set(target, prop, value);
      },
    });
  }

  getNextWord() {
    return this.words.shift();
  }

  start() {
    this.timeout = setTimeout(() => {
      const word = this.getNextWord();
      this.boxProxy.push(word);
      if (word !== undefined) {
        this.start();
      }
    }, getRandomNumber(100, 700));
  }

  stop() {
    clearTimeout(this.timeout);
  }

  // retrieve all words from box and clear box
  getWordsFromBox() {
    const words = this.boxProxy.slice();
    this.boxProxy.length = 0;
    return words.join("");
  }

  onBoxUpdated(cb) { 
    this.cb = cb;
  }
}