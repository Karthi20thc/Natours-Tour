const router = require('express').Router();
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');
const bookingController = require('../controllers/bookingController');


// After this route all the routes run below, it comes to point, where we do not have to do same query twice (during /me), put this code before all the routes
// router.use(authController.isLoggedIn)

// http://localhost:3000

// router.get("/overview", viewController.getOverview)

//  '/' is the route we will hit when the credit card is successfully charged, and that is the point of time we want to create new booking, so add that middleware (createBookingCheckout) and this is temporary, when the website is deployed, we can create a better solution for it
router.get("/", bookingController.createBookingCheckout, authController.isLoggedIn, viewController.getOverview)

router.get("/tour/:slug", authController.isLoggedIn, viewController.getTour)

// For login , this route is always get not post
router.get('/login', authController.isLoggedIn, viewController.getLoginForm)

router.get('/signup', authController.isLoggedIn, viewController.getSignUpForm)

router.get('/me', authController.protect, viewController.getAccount)

router.get(
 '/my-tours',
 bookingController.createBookingCheckout,
 authController.protect,
 viewController.getMyTours
);

router.post(
 '/submit-user-data',
 authController.protect,
 viewController.updateUserData
);

module.exports = router;












// For testing
// router.get('/', (req, res) => {
//  res.status(200).render('base', {
//   name: 'karthik',
//   age: 27,
//   title: "Home"
//  })
// })