const BASE_URL = "http://localhost:5000";

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