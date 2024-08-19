const { StatusCodes } = require("http-status-codes");
const {
  createOrganizer,
  createUser,
  getAllUsers,
} = require("../../../services/mongoose/users");

const createNewOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const result = await createUser(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createNewOrganizer, createNewUser, getUsers };
