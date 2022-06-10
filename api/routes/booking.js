const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");

function bookingRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post("/addbooking", bookingController.addBooking);
  router.get("/getallbookings", bookingController.getAllBookings);

  return router;
}

let bookingRouterFile = {
  router: router,
  bookingRouter: bookingRouter,
};
module.exports = bookingRouterFile;
