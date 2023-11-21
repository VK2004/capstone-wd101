const emailInput = document.getElementById("email");
emailInput.addEventListener('input', () => validate(emailInput));

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => validate(emailInput));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The email is not in the right format!!!");
    element.reportValidity();
  } else {
    element.setCustomValidity('');
  }
}

function clearLocalStorage() {
  localStorage.clear();
  displayEntries();
}

function calculateAge(dob) {
  const presentDate = new Date();
  const birthDate = new Date(dob);

  let age = presentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = presentDate.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && presentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  entries = entries ? JSON.parse(entries) : [];
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries.map((entry) => {
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;

    const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
    return row;
  }).join("\n");

  const table = `<table class="table-auto w-full"><tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Dob</th>
      <th class="px-4 py-2">Accepted terms?</th>
   </tr>${tableEntries}</table>`;

  const details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;
  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("Registration age is between 18 and 55");
    return false;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
