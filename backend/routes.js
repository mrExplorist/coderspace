const router = require("express").Router();
const activateController = require("./controllers/activateController");
const authController = require("./controllers/authController");
const roomsController = require("./controllers/roomsController");
const authMiddleware = require("./middlewares/authMiddleware");

// router.post(path, [middleware], callback)

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);

router.post("/api/activate", authMiddleware, activateController.activate); // this route should be protected on server , only  authenticated user can have access to this route
router.get("/api/refresh", authController.refresh);

router.post("/api/logout", authMiddleware, authController.logout);

router.post("/api/rooms", authMiddleware, roomsController.create);

router.get("/api/rooms", authMiddleware, roomsController.fetchRooms);

module.exports = router;

// CREATED THE ROUTER
