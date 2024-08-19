const express = require("express").Router;
const router = express();
const { createNewOrganizer, createNewUser, getUsers } = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
  } = require("../../../middlewares/auth");

router.post("/organizers", authenticateUser, authorizeRoles("owner"),  createNewOrganizer);
router.post("/users", authenticateUser, authorizeRoles("organizer"), authenticateUser, createNewUser);
router.get('/users', authenticateUser, authorizeRoles("owner"), getUsers);

module.exports = router;
