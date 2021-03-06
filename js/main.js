"use strict"

const runScript = () => {

   //global variables
   const countryCardsContainer = document.querySelector(".countries__body"),
      searchForm = document.querySelector(".search-form"),
      searchInput = document.querySelector(".search-form__input-search"),
      regionFilters = document.querySelectorAll(".dropdown__link"),
      btnClose = document.querySelector(".country-modal__close"),
      modal = document.querySelector(".country-modal");

   // run and remove preloader after a specific time
   const preloader = () => {
      const preloader = document.querySelector(".preloader-container");
      preloader.classList.add("opacity-0");
       setTimeout(() => {
          preloader.style.display = "none";
       }, 1000);
   };

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

   // close a modal window on click to a btn
   const closeModal = () => {
      modal.classList.toggle("show");
   };

   //close a modal window by clicking outside it
   const closeModalOverlay = (event) => {
      const target = event.target;
      if (target.classList.contains("show")) {
         closeModal();
      }
   };

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

         const countryDetails = document.createElement("a");
         countryDetails.classList.add("countries__card");

         countryDetails.innerHTML = `
                  <figure class="countries__flag">
                     <img src="${country.flag}" alt="country flag" class="countries__img" loading="lazy">
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
      `;
         countryDetails.addEventListener("click", () => { // click on a coutry card
            modal.classList.toggle("show");
            displayCountryDetails(country);
         });

         countryCardsContainer.appendChild(countryDetails);
      });

   };

   // display occured errors
   const renderError = (message) => {
      if (message) {
         countryCardsContainer.innerHTML = ""; // clear country cards body to display an error
         countryCardsContainer.insertAdjacentHTML("beforeend", message);
         countryCardsContainer.classList.toggle("error");
      }
   };

   //display a modal window with a rendered details about a specific country
   const displayCountryDetails = (country) => {
      const modalBody = document.querySelector(".country-modal__info");
      const countryFlag = document.querySelector(".country-modal__img");

      countryFlag.src = country.flag;

      modalBody.innerHTML = `
            <h3 class="country-modal__name">${country.name}</h3>
            <p class="country-modal__country-info">Native Name:<span class="country-modal__country-info--description">${country.nativeName}</span></p>
            <p class="country-modal__country-info">Population:<span class="country-modal__country-info--description">${commaSeparation(country.population)}</span></p>
            <p class="country-modal__country-info">Region:<span class="country-modal__country-info--description">${country.region}</span>
            <p class="country-modal__country-info">Sub Region:<span class="country-modal__country-info--description">${country.subregion}</span></p>
            <p class="country-modal__country-info">Capital:<span class="country-modal__country-info--description">${country.capital}</span></p>
            <p class="country-modal__country-info">Timezones:<span class="country-modal__country-info--description">${country.timezones}</span></p>
            <p class="country-modal__country-info">Currency:<span class="country-modal__country-info--description">${country.currencies.map(currency => currency.name)}</span></p>
            <p class="country-modal__country-info">Languages:<span class="country-modal__country-info--description">${country.languages.map(language => language.name)}</span></p>
      `;
   };

   // Search a specific country by typing it in the search input field
   const searchCountry = (event) => {
      const target = event.target.value.toLowerCase(); // get a whatever value typed in an input field
      const countriesName = document.querySelectorAll(".countries__title");

      countriesName.forEach(countryName => { // iterate over country names
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
   btnClose.addEventListener("click", closeModal);
   modal.addEventListener("click", closeModalOverlay)
   window.addEventListener("keydown", (event) => { // close modal window and overlay by "Escape" key
      if (event.code === "Escape" && modal.classList.contains("show")) {
         closeModal();
      }
   });
   window.addEventListener("load", preloader);


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