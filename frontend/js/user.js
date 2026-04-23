const token = getToken();

if (!token || getRole() !== "users") {
  window.location.href = "login.html";
}

function getStatusClass(status) {
  const normalized = (status || "").toLowerCase();

  if (normalized.includes("pending")) return "pending";
  if (normalized.includes("accept")) return "accepted";
  if (normalized.includes("transit")) return "transit";
  if (normalized.includes("complete")) return "completed";

  return "pending";
}

async function createBooking() {
  const payload = {
    pickupLocation: document.getElementById("pickup").value,
    dropLocation: document.getElementById("drop").value,
    loadType: document.getElementById("loadType").value,
    weight: document.getElementById("weight").value,
    truckType: document.getElementById("truckType").value
  };

  const res = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (data._id) {
    alert("Booking Created");
    loadBookings();
  } else {
    alert(data.msg || "Failed");
  }
}

async function loadBookings() {
  const res = await fetch(`${BASE_URL}/api/bookings/my`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  let rows = "";

  data.forEach(item => {
    const statusClass = getStatusClass(item.status);

    rows += `
      <tr>
        <td>${item.pickupLocation}</td>
        <td>${item.dropLocation}</td>
        <td>${item.truckType}</td>
        <td><span class="badge ${statusClass}">${item.status}</span></td>
      </tr>
    `;
  });

  document.getElementById("bookingTable").innerHTML = rows;
}

loadBookings();