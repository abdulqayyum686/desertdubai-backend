const Booking = require("../models/booking");

// remove c
module.exports.addBooking = async (req, res, next) => {
  const { info, tour, hotel, safari, cruise, yacht, ticket, car, eat, visa } =
    req.body;
  console.log("add booking", req.body);
  try {
    let newObj = new Booking({
      info: info,
      tour: tour,
      hotel: hotel,
      safari: safari,
      cruise: cruise,
      yacht: yacht,
      ticket: ticket,
      car: car,
      eat: eat,
      visa: visa,
    });
    console.log("lll", newObj);
    let savedData = await newObj.save();
    if (savedData) {
      res.status(201).json({
        mesasge: "Your Booking Has Been Added",
        data: savedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesasge: "Internal Server Error",
      error,
    });
  }
};

module.exports.getAllBookings = async (req, res, next) => {
  console.log("get all booking");
  Booking.find()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        mesasge: "Internal Server Error",
        error: err,
      });
    });
};

module.exports.editBooking = async (req, res, next) => {
  console.log("edit booking");
  try {
    let updatedData = await Booking.updateOne(
      { _id: req.params.id },
      req.body
      // { useFindAndModify: false, new: true }
    );
    if (updatedData) {
      res.status(201).json({
        mesasge: "Your Booking Has Been Updated",
        data: req.body,
        id: req.params.id
      });
    }
  } catch (error) {
    res.status(500).json({
      mesasge: "Internal Server Error",
      error,
    });
  }
};
