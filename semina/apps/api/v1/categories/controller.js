const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../../../services/mongoose/categories");

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneCategory(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategory(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await deleteCategory(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: 'Data berhasil dihapus',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, index, find, update, remove };
