import axios from 'axios';
import { showAlert } from './alert';
// import Stripe from 'stripe';

// this Stripe object is coming from the scripts from base.pug
const stripe = Stripe('pk_test_51Kt9XQSChdbo5Stnd5mTHloYr1Xtim7RVYBCsaJ9x8EpmifsgGarVzhmvTQ7TgmhDEOfE2VNDrQpf31Yb2p2zVSP001evS55PI');
console.log(stripe.redirectToCheckout)

// This is the function will be executed, when we click the bookTour button
export const bookTour = async (tourId) => {
 try {
  // 1) Get checkout session from API
  const resSession = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)
  console.log(resSession);

  // 2) Create checkout form + chanre credit card
  await stripe.redirectToCheckout({
   sessionId: resSession.data.session.id
  });
 } catch (err) {
  console.log(err);
  showAlert('error', err)
 }
}