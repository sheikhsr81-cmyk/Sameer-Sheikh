document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let isValid = true;

  // Get values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Error fields
  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // Name validation
  if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters";
    isValid = false;
  }

  // Email validation using regex
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  }

  // Message validation
  if (message.length < 10) {
    messageError.textContent = "Message must be at least 10 characters";
    isValid = false;
  }

  // If valid
  if (isValid) {
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  }
});
