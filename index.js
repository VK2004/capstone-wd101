document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');
  const userTableBody = document.querySelector('#userTable tbody');

  // Load existing data from local storage on page load
  loadUserData();

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (validateDob(dob)) {
      addUserToTable(name, email, password, dob, terms);
      saveUserData(name, email, password, dob, terms);
      registrationForm.reset();
    } else {
      alert('Invalid Date of Birth. Age must be between 18 and 55.');
    }
  });

  function validateDob(dob) {
    const currentDate = new Date();
    const dobDate = new Date(dob);
    const age = currentDate.getFullYear() - dobDate.getFullYear();
    return age >= 18 && age <= 55;
  }

  function addUserToTable(name, email, password, dob, terms) {
    const newRow = userTableBody.insertRow();
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${password}</td>
      <td>${dob}</td>
      <td>${terms ? 'Yes' : 'No'}</td>
    `;
  }

  function saveUserData(name, email, password, dob, terms) {
    const userData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      terms: terms
    };

    let savedData = localStorage.getItem('userData');
    savedData = savedData ? JSON.parse(savedData) : [];
    savedData.push(userData);

    localStorage.setItem('userData', JSON.stringify(savedData));
  }

  function loadUserData() {
    let savedData = localStorage.getItem('userData');
    savedData = savedData ? JSON.parse(savedData) : [];

    savedData.forEach((userData) => {
      addUserToTable(userData.name, userData.email, userData.password, userData.dob, userData.terms);
    });
  }
});
