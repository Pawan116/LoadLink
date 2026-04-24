async function login() {
  try {
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BASE_URL}/api/auth/${role}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      alert("Login Successful");

      if (role === "users") {
        window.location.href = "user-dashboard.html";
      } else {
        window.location.href = "driver-dashboard.html";
      }

    } else {
      alert(data.msg || "Login Failed");
    }

  } catch (error) {
    console.log(error);
    alert("Server waking up or network issue. Please wait and try again.");
  }
}