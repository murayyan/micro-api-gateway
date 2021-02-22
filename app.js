require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const mediaRouter = require("./routes/media");
const orderPaymentsRouter = require("./routes/ordersPayments");
const refreshTokenRouter = require("./routes/refreshToken");
const mentorsRouter = require("./routes/mentors");
const chaptersRouter = require("./routes/chapters");
const lessonsRouter = require("./routes/lessons");
const imageCoursesRouter = require("./routes/imageCourses");
const myCoursesRouter = require("./routes/myCourses");
const reviewsRouter = require("./routes/reviews");
const webhookRouter = require("./routes/webhook");

const verifyToken = require("./middlewares/verifyToken");
const roles = require("./middlewares/permission");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/refresh-tokens", refreshTokenRouter);
app.use("/media", roles("admin", "student"), mediaRouter);
app.use("/mentors", verifyToken, roles("admin"), mentorsRouter);
app.use("/image-courses", verifyToken, roles("admin"), imageCoursesRouter);
app.use("/courses", coursesRouter);
app.use("/chapters", verifyToken, roles("admin"), chaptersRouter);
app.use("/lessons", verifyToken, roles("admin"), lessonsRouter);
app.use("/orders", verifyToken, roles("admin", "student"), orderPaymentsRouter);
app.use("/my-courses", verifyToken, roles("admin", "student"), myCoursesRouter);
app.use("/reviews", verifyToken, roles("admin", "student"), reviewsRouter);
app.use("/webhook", webhookRouter);

module.exports = app;
