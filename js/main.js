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

   fetch("https://restcountries.eu/rest/v2/name/ukraine")
      .then(response => response.json())
      .then(data => console.log(data[0]));
};

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", runScript);
} else {
   runScript();
}