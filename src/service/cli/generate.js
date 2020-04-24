'use strict';
const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  CATEGORIES,
  SumRestrict,
  PictureRestrict,
  OfferType,
  SENTENCES,
  ExitCode,
  TITLES,
  MAX_COUNT
} = require(`../../constants`);


const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      console.log(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(`${__dirname}/../../${FILE_NAME}`, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });

  }
};
