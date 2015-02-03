'use strict';


function page_init() {
  console.group("init");
  console.group("sub");
  console.log(document.getElementById('title').innerText);
  if (document.getElementById('formSignin')) {
    document.getElementById('formSignin').onsubmit = validate_form;
  }
  console.groupEnd();
  console.groupEnd();
}

function validate_form() {
  var password = document.getElementById('pass');
  if (password.value.length < 6) {
    alert('Password is to short');
    return false;
  } else {
    console.log('Good');
    return true;
  }
}

if (document && document.getElementById) {
  window.onload = page_init;
}
