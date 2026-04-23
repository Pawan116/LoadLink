const BASE_URL = "https://linkload-backend.onrender.com";

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("role");
}