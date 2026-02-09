const toast = document.getElementById("toast");

function copyEmail() {
  navigator.clipboard.writeText("brotherson100@gmail.com");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}