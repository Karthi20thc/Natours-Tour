import '@babel/polyfill';
import { login, logout } from "./login";
import { displayMap } from "./mapBox";
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';


// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.login-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');



// DELEGATION
if (mapBox) {
 // This javascript will be integreated into html and then runs on client side
 const locations = JSON.parse(mapBox.dataset.locations)
 displayMap(locations)
}


if (loginForm) {
 loginForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log('loginform')

  // Get the values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Make the Ajax call
  login(email, password);

 })
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
 userDataForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  updateSettings({ name, email }, 'data');
 });


if (userPasswordForm)
 userPasswordForm.addEventListener('submit', async e => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'Updating...';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  // we are awaiting here, so once it is finished, we can do some other work below, i,e clear the password fields
  await updateSettings(
   { passwordCurrent, password, passwordConfirm },
   'password'
  );

  document.querySelector('.btn--save-password').textContent = 'Save password';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
 });

// For stripe payment

if (bookBtn)
 bookBtn.addEventListener('click', e => {
  // e.target is the element which was clicked
  e.target.textContent = 'Processing...';
  // data-tour-id=`${tour.id}` Here tour-id when ever there is a dash it will automatically get converted to camelCase --> tourId
  // const tourId  = e.target.dataset.tourId; since tourId is same, we can simply destructre it
  const { tourId } = e.target.dataset;
  bookTour(tourId);
 });