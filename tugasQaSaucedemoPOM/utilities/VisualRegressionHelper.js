const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

let pixelmatch = require("pixelmatch");

if (pixelmatch.default) {
  pixelmatch = pixelmatch.default;
}

class VisualRegressionHelper {
  static compareImages(imageName) {
    const baselinePath = path.join(
      __dirname,
      "..",
      "screenshots",
      "baseline",
      `${imageName}.png`,
    );

    const currentPath = path.join(
      __dirname,
      "..",
      "screenshots",
      "current",
      `${imageName}.png`,
    );

    const diffPath = path.join(
      __dirname,
      "..",
      "screenshots",
      "diff",
      `${imageName}.png`,
    );

    // Jika baseline belum ada, jadikan screenshot pertama sebagai baseline
    if (!fs.existsSync(baselinePath)) {
      fs.copyFileSync(currentPath, baselinePath);
      console.log(`Baseline dibuat: ${imageName}.png`);
      return true;
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));

    if (
      baseline.width !== current.width ||
      baseline.height !== current.height
    ) {
      throw new Error("Ukuran gambar berbeda.");
    }

    const diff = new PNG({
      width: baseline.width,
      height: baseline.height,
    });

    const differentPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      baseline.width,
      baseline.height,
      {
        threshold: 0.2,
      },
    );

    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    console.log(`Perbedaan pixel: ${differentPixels}`);

    return differentPixels === 0;
  }
}

module.exports = VisualRegressionHelper;
