const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync")

exports.getOverview = catchAsync(async (req, res, next) => {

 //1  Get Data from the Collection
 const allTours = await Tour.find();

 //2 Build Template

 //3 render the Template
 res.status(200).render('overView', {
  title: "All Tours",
  allTours
 })
})



exports.getTour = catchAsync(async (req, res, next) => {

 //1 Get Data from collection
 // reviews is the virtual field in tour Model, and we are populating, Also the guides is a field in tour Model, which is referenced in tour Model, and they are populated using query middleware in tour Model itself
 const tour = await Tour.findOne({ slug: req.params.slug }).populate({
  path: 'reviews',
  field: 'review rating user'
 })


 res.status(200).render('tour', {
  title: `${tour.name} tour`,
  tour
 })
})


exports.getLoginForm = catchAsync(async (req, res) => {
 res.status(200).render('login', {
  title: 'Log In to Your Account'
 })
})

exports.getAccount = catchAsync(async (req, res) => {

 // The user data is already set in res.locals.user = currentUser in protect middleware, so no need to pass from here, like we did for the tours

 res.status(200).render('usersettings', {
  title: 'Your Account'
 })
})

exports.getMyTours = catchAsync(async (req, res, next) => {
 // 1)Find the bookings of the currently logged in user, getting user id from protect middleware, and find all the user bookings
 const bookings = await Booking.find({ user: req.user.id });

 // 2) Extracting the each tourId from the Bookings (type-> array of objects)
 const tourIDs = bookings.map(el => el.tour);
 const allTours = await Tour.find({ _id: { $in: tourIDs } });

 res.status(200).render('overView', {
  title: 'My Tours',
  allTours
 });
});


exports.updateUserData = catchAsync(async (req, res, next) => {
 const updatedUser = await User.findByIdAndUpdate(
  req.user.id,
  {
   name: req.body.name,
   email: req.body.email
  },
  {
   new: true,
   runValidators: true
  }
 );
})