window.addEventListener("DOMContentLoaded", async () => {

  // 🔐 Check if already logged in
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log("Session error:", sessionError);
  }

  if (sessionData?.session) {
    window.location.href = "dashboard.html";
    return;
  }

  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const result = document.getElementById("result");
  const form = document.getElementById("form");

  if (!passwordInput || !emailInput || !result || !form) {
    console.error("One or more required elements are missing in HTML.");
    return;
  }

  // 🔎 Password validation
  passwordInput.addEventListener("input", () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (pattern.test(passwordInput.value)) {
      result.textContent = "Valid Password";
      result.style.color = "green";
    } else {
      result.textContent = "Invalid Password";
      result.style.color = "red";
    }
  });

  // 🔐 Login submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    if (!emailValue) {
      result.textContent = "Email required";
      result.style.color = "red";
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (error) {
      result.textContent = error.message;
      result.style.color = "red";
      return;
    }

    if (!data.session) {
      result.textContent = "Login failed";
      result.style.color = "red";
      return;
    }
    else{
    result.textContent = "Login Successful";
    result.style.color = "green";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }
  });

});
