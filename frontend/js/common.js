const BASE_URL = "https://loadlink-hd32.onrender.com";

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