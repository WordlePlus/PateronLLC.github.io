const fs = require('fs');

const writeSixLetterWordStream = fs.createWriteStream('./six-letter-words.js', {
  highWaterMark: 100000 * 1024,
});
const readWordStream = fs.createReadStream('./wordlist_10000.txt', {
  highWaterMark: 100000 * 1024,
});

const doOnNewBatch = (chunk) => {
  const allSwords = chunk.toString().split(/\r?\n/);
  const sixLetterSwords = [];
  allSwords.forEach((element, index) => {
    if (element.length === 6) {
      sixLetterSwords.push(element);
      // console.log('New word added!', index);
    }
  });
  const output = sixLetterSwords.join(`",\n"`);
  if (!writeSixLetterWordStream.write(output)) {
    readWordStream.pause();
  }
};

readWordStream.on('data', doOnNewBatch);
writeSixLetterWordStream.on('drain', () => {
  readWordStream.resume();
  console.log('Resuming');
});

readWordStream.on('end', () => console.log('Ended!😃'));
