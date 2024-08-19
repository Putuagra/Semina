const Images = require("../../api/v1/images/model");
const NotFound = require("../../errors/not-found");

const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.png",
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFound(`Tidak ada gambar dengan id: ${id}`);

  return result;
};

module.exports = { createImages, generateUrlImage, checkingImage };
