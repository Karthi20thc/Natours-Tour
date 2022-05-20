const Tour = require('../models/tourModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
 // 1) Get the currently booked tour
 const tour = await Tour.findById(req.params.tourId);


 // 2) Create checkout session
 // you need to await here, because create returns a promise, setting the options below will do a api call to stripe
 const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],

  // Url will be called as soon as the credit card has been charged.
  // success_url: `${req.protocol}://${req.get('host')}/`,
  success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${req.params.tourId
   }&user=${req.user.id}&price=${tour.price}`,

  // User will be redirected to this url if he wish to cancel the payment
  cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,

  // Getting user email from our protect middleware
  customer_email: req.user.email,

  // This field will allow us to pass in some data, about the session that we are currently creating . so once the paymnet was successful, we will get access to the session object. And by then we want to create a new booking in our database.
  client_reference_id: req.params.tourId,


  // Deatils of our product. The fields name are some stripe, do not make your own
  line_items: [
   {
    name: `${tour.name} Tour`,
    description: tour.summary,
    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
    amount: tour.price * 100,
    currency: 'INR',
    quantity: 1
   }
  ]
 })

 // 3) Create session as response
 res.status(200).json({
  status: 'success',
  session
 });

})

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
 // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
 const { tour, user, price } = req.query;

 if (!tour && !user && !price) return next();
 await Booking.create({ tour, user, price });

 // redirect will make a new request to the server, whatever is passed in there
 res.redirect(req.originalUrl.split('?')[0]);
});


exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);