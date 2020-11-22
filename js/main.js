"use strict"

const runScript = () => {
   //global variables
   const countryCardsContainer = document.querySelector(".countries__body"),
      searchForm = document.querySelector(".search-form"),
      searchInput = document.querySelector(".search-form__input-search"),
      regionFilters = document.querySelectorAll(".dropdown__link");


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

   fetch("https://restcountries.eu/rest/v2/name/mexico")
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
                     <p class="countries__country-feature" id="region">Region:<span
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

   // Search a specific country by typing it in the search input field
   const searchCountry = (event) => {
      const target = event.target.value.toLowerCase(); // get a whatever value typed in an input field
      const countriesName = document.querySelectorAll(".countries__title");

      countriesName.forEach(countryName => { // iterate pver country names
         const countryCard = countryName.parentElement.parentElement;

         if (countryName.textContent.toLowerCase().trim().includes(target)) { // if the name of the country includes typed value from input, then show the whole country card

            countryCard.style.display = "block"; // traverse the DOM to grab a a parent (<a> - country card)

         } else {
            countryCard.style.display = "none";
         }
      });
   };

   // filter country by a specific region on click to a dropdown link
   const regionFilter = () => {
      regionFilters.forEach(dropdownLink => {
         dropdownLink.addEventListener("click", () => {
            const ul = dropdownLink.parentElement.parentElement;
            ul.classList.toggle("show"); // hide whole <ul> parent on click to a specific dropdown link

            const regionNames = document.querySelectorAll("#region");
            const dropdownLinkValue = dropdownLink.textContent.toLowerCase();

            regionNames.forEach(regionName => {
               const countryCard = regionName.parentElement.parentElement;

               if (regionName.textContent.toLowerCase().trim().includes(dropdownLinkValue) || dropdownLinkValue === "all") {
                  countryCard.style.display = "block";
               } else {
                  countryCard.style.display = "none";
               }
            });
         });
      });
   };

   //event listeners
   searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchForm.reset();
   });

   searchInput.addEventListener("keyup", searchCountry);


   //call functions
   showDropdownMenu();
   getCountryData();
   toggleAppMode();
   regionFilter();
};

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", runScript);
} else {
   runScript();
}