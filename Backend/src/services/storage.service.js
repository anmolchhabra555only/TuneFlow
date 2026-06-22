const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("PRIVATE:", !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log("URL:", process.env.IMAGEKIT_URL_ENDPOINT);

async function uploadFile(
  file,
  fileName,
  folder
) {
  console.log("Uploading:", fileName);
  console.log("File size:", file.length || file.byteLength);
  console.log("Before ImageKit Upload");

  const result = await ImageKitClient.files.upload({
    file,
    fileName,
    folder
  });

  console.log("After ImageKit Upload");
  return result;
}

module.exports = { uploadFile };