const mobileMenu = document.querySelector(".mobile-toggle");
const mobileLinks = document.querySelector(".mobile-navbar-links");
mobileMenu.addEventListener("click", function () {
    mobileLinks.classList.toggle("active");
});
mobileLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        mobileLinks.classList.remove("active");
    });
});
document.addEventListener("click", function (event) {
    if (!mobileMenu.contains(event.target) && !mobileLinks.contains(event.target)) {
        mobileLinks.classList.remove("active");
    }
});
// Footer Year
document.getElementById("footerYear").textContent = new Date().getFullYear();
