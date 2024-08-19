const express = require("express").Router;
const router = express();
const { signIn } = require("./controller");

router.post("/auth/signin", signIn);

module.exports = router;