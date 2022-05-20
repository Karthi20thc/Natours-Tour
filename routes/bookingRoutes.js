const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

// After this all routes below are protected, i,e only logged in  client can access
router.use(authController.protect);

router.get('/checkout-session/:tourId', authController.protect, bookingController.getCheckoutSession);


router.use(authController.restrictTo('admin', 'lead-guide'));

// For CRUD operations
router
 .route('/')
 .get(bookingController.getAllBookings)
 .post(bookingController.createBooking);

router
 .route('/:id')
 .get(bookingController.getBooking)
 .patch(bookingController.updateBooking)
 .delete(bookingController.deleteBooking);

module.exports = router;