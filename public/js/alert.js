
export const removeAlert = () => {
 const el = document.querySelector('.alert');
 if (el) el.parentElement.removeChild(el);
};


export const showAlert = (type, msg) => {
 // remove if there is previous alert
 removeAlert();

 const markup = `<div class='alert alert--${type}'>${msg}</div>`
 document.querySelector('body').insertAdjacentHTML('afterbegin', markup)

 // remove once the alert is shown
 window.setTimeout(removeAlert, 4000)
}