const Name = document.getElementById("name");
const Result = document.getElementById("result");
const Password = document.getElementById("password");
const ConfirmPassword = document.getElementById("confirmpassword");
const Form = document.getElementById("signupForm");
const Email = document.getElementById("email");

Name.addEventListener("input", () => {
  const inputValue = Name.value.trim();
  if (
    inputValue.length < 5 ||
    inputValue.length > 16 ||
    /^[0-9]+$/.test(inputValue)
  ) {
    Result.textContent =
      "Name must be between 5 and 16 characters not contain only numbers and cannot be empty";
    Result.style.color = "red";
    Result.style.fontWeight = "bold";
    Result.style.textAlign = "center";
  } else {
    Result.textContent = "";
  }
});

Password.addEventListener("input", () => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (pattern.test(Password.value.trim())) {
    Result.textContent = "Valid Password";
    Result.style.color = "green";
  } else {
    Result.textContent =
      "Invalid Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    Result.style.color = "red";
  }
});

ConfirmPassword.addEventListener("input", () => {
  if (
    ConfirmPassword.value.trim() &&
    ConfirmPassword.value === Password.value
  ) {
    Result.textContent = "Password Matched";
    Result.style.color = "green";
  } else {
    Result.textContent = "Password does not match";
    Result.style.color = "red";
  }
});

Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameValue = Name.value.trim();
  const emailValue = Email.value.trim();
  const passwordValue = Password.value.trim();
  const confirmValue = ConfirmPassword.value.trim();

  // ============================================
  // VALIDATION FIRST (Before Signup)
  // ============================================
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    nameValue.length < 5 ||
    nameValue.length > 16 ||
    /^[0-9]+$/.test(nameValue)
  ) {
    Result.textContent = "Invalid Name";
    Result.style.color = "red";
    return;
  }

  if (!emailValue || !emailPattern.test(emailValue)) {
    Result.textContent = "Invalid Email";
    Result.style.color = "red";
    return;
  }

  if (!pattern.test(passwordValue)) {
    Result.textContent = "Invalid Password";
    Result.style.color = "red";
    return;
  }

  if (passwordValue !== confirmValue) {
    Result.textContent = "Passwords do not match";
    Result.style.color = "red";
    return;
  }

  // ============================================
  // SUPABASE SIGNUP
  // ============================================
  const { data, error } = await supabase.auth.signUp({
    email: emailValue,
    password: passwordValue,
    options: {
      data: {
        name: nameValue // This is sent to auth.users metadata
      }
    }
  });

  if (error) {
    Result.textContent = error.message;
    Result.style.color = "red";
    return;
  }

  if (!data?.user?.id) {
    Result.textContent = "User creation failed";
    Result.style.color = "red";
    return;
  }

  // ============================================
  // NO NEED TO INSERT PROFILE HERE!
  // The database trigger handles it automatically
  // ============================================

  Result.textContent = "Signup Successful! Please check your email to confirm.";
  Result.style.color = "green";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});