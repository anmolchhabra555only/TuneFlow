const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  privateKey: process.env.ImageKit_PRIVATE_KEY,
})

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