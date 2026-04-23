function toggleDriverFields() {
  const role = document.getElementById("role").value;

  document.getElementById("driverFields").style.display =
    role === "drivers" ? "block" : "none";
}

async function register() {
  const role = document.getElementById("role").value;

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value
  };

  if (role === "drivers") {
    payload.vehicleNumber =
      document.getElementById("vehicleNumber").value;

    payload.truckType =
      document.getElementById("truckType").value;
  }

  const res = await fetch(`${BASE_URL}/api/auth/${role}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (data.token) {
    alert("Registration Successful");
    window.location.href = "login.html";
  } else {
    alert(data.msg || "Registration Failed");
  }
}