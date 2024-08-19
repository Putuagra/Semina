const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors")

// const indexRouter = require("./routes/index");

const app = express();

// Router
const categoriesRouter = require("./apps/api/v1/categories/router");
const imagesRouter = require("./apps/api/v1/images/router");
const talentsRouter = require("./apps/api/v1/talents/router");
const eventsRouter = require("./apps/api/v1/events/router");
const organizersRouter = require("./apps/api/v1/organizers/router");
const authRouter = require("./apps/api/v1/auth/router");
const orderRouter = require("./apps/api/v1/orders/router");
const participantRouter = require("./apps/api/v1/participants/router");
const paymentRouter = require("./apps/api/v1/payments/router");
const v1 = "/api/v1";

// Middleware
const notFoundMiddleware = require("./apps/middlewares/not-found");
const handleErrorMiddleware = require("./apps/middlewares/handler-error");

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Test",
  });
});

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authRouter);
app.use(`${v1}/cms`, orderRouter);
app.use(`${v1}/cms`, paymentRouter);
app.use(`${v1}`, participantRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
