"use strict"

const runScript = () => {
   const dropdownBtn = document.querySelector(".dropdown__btn"),
      dropdownList = document.querySelector(".dropdown__list");
   
   // toggle dropdown list on click
   const toggleDropdown = () => {
      dropdownList.classList.toggle("show");
   };

   // event listeners
   dropdownBtn.addEventListener("click", toggleDropdown);
};

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", runScript);
} else {
   runScript();
}