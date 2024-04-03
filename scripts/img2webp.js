const sharp = require("sharp");
const fs = require("fs");
const { argv } = require("node:process");

const filename = argv[2];

sharp(`${filename}`)
  .resize(1200)
  .webp({ quality: 90, effort: 6 })
  .withMetadata({
    exif: {
      IFD0: {
        Copyright: "Diecezko.cz",
      },
    },
  })
  .toFile(`${path}/${filename}`.replace(/\.(jpg|jpeg|png)$/, ".webp"))
  .then((info) => {
    // console.log(info);
  })
  .catch((err) => {
    console.error(err);
  });
