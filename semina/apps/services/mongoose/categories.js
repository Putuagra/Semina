const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};

const createCategory = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name, organizer: req.user.organizer });

  if (check) throw new BadRequestError("kategori nama duplikat");

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("kategori nama duplikat");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

const deleteCategory = async (req) => {
  const { id } = req.params;

  const check = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!check) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  const result = await Categories.findOneAndDelete(check);

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  checkingCategories,
};
