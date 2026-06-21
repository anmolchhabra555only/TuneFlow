const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  publicKey: process.env.ImageKit_PUBLIC_KEY,
  privateKey: process.env.ImageKit_PRIVATE_KEY,
  urlEndpoint: process.env.ImageKit_URL_ENDPOINT,
});

console.log("PUBLIC:", process.env.ImageKit_PUBLIC_KEY);
console.log("PRIVATE:", !!process.env.ImageKit_PRIVATE_KEY);
console.log("URL:", process.env.ImageKit_URL_ENDPOINT);

async function uploadFile(
  file,
  fileName,
  folder
) {
  const result = await ImageKitClient.files.upload({
    file,
    fileName,
    folder
  });

  return result;
}

module.exports = { uploadFile }