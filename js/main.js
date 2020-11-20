"use strict"

const runScript = () => {
   //global variables
   const countryCardsContainer = document.querySelector(".countries__body"),
      searchForm = document.querySelector(".search-form");

   // Show and hide dropdown menu onclick
   const showDropdownMenu = () => {
      const dropdownBtn = document.querySelector(".dropdown__btn"),
         dropdownList = document.querySelector(".dropdown__list");

      // toggle dropdown list on click
      const toggleDropdown = () => {
         dropdownList.classList.toggle("show");
      };

      dropdownBtn.addEventListener("click", toggleDropdown);
   };

   //add commas to a string with numbers as a thousands separation
   const commaSeparation = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   };

   //toggle dark/light mode of App on click
   const toggleAppMode = () => {
      const modeChangeBtn = document.querySelector(".header__dark-mode-btn");

      modeChangeBtn.addEventListener("click", () => {
         document.body.classList.toggle("dark-mode");
      })
   };

   fetch("https://restcountries.eu/rest/v2/name/ukraine")
      .then(response => response.json())
      .then(data => console.log(data[0]));

   // get and handle recived country data from API
   const getCountryData = () => {
      axios.get("https://restcountries.eu/rest/v2/all")
         .then(response => {
            renderCountryCard(response.data);
         })
         .catch(error => renderError(`Something went wrong with your request: ${error.message}, Please Try Again!`));
   };

   // render country cards based on recived data from API
   const renderCountryCard = (countries) => {

      countries.forEach(country => { //iterate over recived countries data to render a specific card with info

         const countryDeatils = `
         <!--Card starts-->
              <a class="countries__card">
                  <figure class="countries__flag">
                     <img src="${country.flag}" alt="country flag" class="countries__img">
                  </figure>
                  <div class="countries__country-info">
                     <h3 class="countries__title">${country.name}</h3>
                     <p class="countries__country-feature">Population:<span
                              class="countries__country-feature--description">${commaSeparation(country.population)}</span>
                     </p>
                     <p class="countries__country-feature">Region:<span
                              class="countries__country-feature--description">${country.region}</span></p>
                     <p class="countries__country-feature">Capital:<span
                              class="countries__country-feature--description">${country.capital}</span>
                     </p>
                  </div>
              </a>
            <!--Card ends-->
      `
         countryCardsContainer.insertAdjacentHTML("beforeend", countryDeatils)
      })
   };

   // display occured errors
   const renderError = (message) => {
      if (message) {
         countryCardsContainer.innerHTML = ""; // clear country cards body to display an error
         countryCardsContainer.insertAdjacentHTML("beforeend", message);
         countryCardsContainer.classList.toggle("error");
      }
   };

   //event listeners
   searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchValue = document.querySelector(".search-form__input-search").value;
      const searchedCountry = searchValue.toLowerCase().trim();
      searchForm.reset();

      renderCountryCard(searchedCountry);

   });

   //call functions
   showDropdownMenu();
   getCountryData();
   toggleAppMode();
};

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", runScript);
} else {
   runScript();
}