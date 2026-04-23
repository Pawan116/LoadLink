const token = getToken();

if (!token || getRole() !== "drivers") {
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

async function loadPending() {
  const res = await fetch(`${BASE_URL}/api/bookings/pending`, {
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
        <td>${item.loadType || "-"}</td>
        <td><span class="badge ${statusClass}">${item.status}</span></td>
        <td>
          <button onclick="acceptBooking('${item._id}')">Accept</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("pendingTable").innerHTML = rows;
}

async function acceptBooking(id) {
  const res = await fetch(`${BASE_URL}/api/bookings/${id}/accept`, {
    method: "PATCH",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  if (data._id) {
    alert("Booking Accepted");
    loadPending();
  } else {
    alert(data.msg || "Failed");
  }
}

async function updateStatus() {
  const id = document.getElementById("bookingId").value;
  const status = document.getElementById("status").value;

  const res = await fetch(`${BASE_URL}/api/bookings/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ status })
  });

  const data = await res.json();

  if (data._id) {
    alert("Status Updated");
    loadPending();
  } else {
    alert(data.msg || "Failed");
  }
}

loadPending();