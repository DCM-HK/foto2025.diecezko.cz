const fs = require("fs");
const sharp = require("sharp");

const image_path_gorun = "../foto/gorun";
const image_path_urban = "../foto/urban";

console.log(
  "Prepare JSON format for https://www.npmjs.com/package/react-photo-gallery-next"
);

const processImages = async (image_path) => {
  let array = [];

  try {
    const photos = fs.readdirSync(image_path);

    // Process images sequentially
    await Promise.all(
      photos.map(async (p) => {
        let width, height;

        try {
          const info = await sharp(`${image_path}/${p}`).metadata();

          width = info.width > info.height ? 4 : 3;
          height = info.width > info.height ? 3 : 4;

          if (p.includes(".webp"))
            array.push({
              src: `https://foto2024.diecezko.cz/foto/gorun/${p}`,
              original: `https://foto2024.diecezko.cz/foto/gorun/${p}`,
              width: width,
              height: height,
              alt: "Fotka z jarního Diecézka 2024",
              caption: "Fotka z jarního Diecézka 2024",
            });
        } catch (err) {
          console.error(`Error processing image ${p}:`, err);
        }
      })
    );

    // Write array into the file
    const file = fs.createWriteStream(`${image_path}/images.json`);
    file.write(JSON.stringify(array));
    file.end();

    console.log("Processing completed successfully.");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

// Call the function to start processing
processImages(image_path_gorun);
processImages(image_path_urban);
