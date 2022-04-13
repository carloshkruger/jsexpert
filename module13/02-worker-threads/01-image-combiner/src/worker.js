import { parentPort } from "worker_threads";
import sharp from "sharp";
import axios from "axios";

async function downloadFile(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return response.data;
}

async function onMessage({ image, background }) {
  const firstLayer = await sharp(await downloadFile(image)).toBuffer();
  const secondLayer = await sharp(await downloadFile(background)).toBuffer();

  const finalImage = await sharp(secondLayer)
    .composite([{ input: firstLayer, gravity: sharp.gravity.south }])
    .toBuffer();

  parentPort.postMessage(finalImage.toString("base64"));
}

parentPort.on("message", onMessage);
