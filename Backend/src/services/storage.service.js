const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("PRIVATE:", !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log("URL:", process.env.IMAGEKIT_URL_ENDPOINT);

async function uploadFile(file, fileName, folder) {
  try {
    console.log("Uploading:", fileName);
    console.log("File size:", file.length);

    const base64File = file.toString("base64");

    const result = await ImageKitClient.files.upload({
      file: base64File,
      fileName,
      folder,
    });

    console.log("After ImageKit Upload");
    console.log(result);

    return result;
  } catch (err) {
    console.log("IMAGEKIT ERROR:");
    console.log(err);
    throw err;
  }
}
module.exports = { uploadFile };