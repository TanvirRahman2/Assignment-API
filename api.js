async function searchCountry() {
    const searchInput = document.getElementById('searchInput').value;
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
    const data = await response.json();

    const countryList = document.getElementById('countryList');
    countryList.innerHTML = '';

    data.forEach(country => {
      const card = document.createElement('div');
      card.className = 'country-card';

      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'More Details';
      detailsButton.onclick = () => showDetails(country);

      card.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="${country.name.common} Flag" style="width: 100%">
        <p>Population: ${country.population}</p>
      `;

      card.appendChild(detailsButton);
      countryList.appendChild(card);
    });
  }

  function showDetails(country) {
    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `
      <p>Capital: ${country.capital}</p>
      <p>Region: ${country.region}</p>
      <!-- Add more details as needed -->
    `;

    event.target.parentNode.appendChild(details);
    event.target.disabled = true; // Disable the button after clicking
  }


  // Replace this with your own API key
  const API_KEY = "5a4a244b150449ea4c8ac5fe159deb2a";

  // Get the elements from the document
  const countryInput = document.getElementById("country");
  const searchButton = document.getElementById("search");
  const weatherBox = document.getElementById("weather-box");

  // Add an event listener to the search button
  searchButton.addEventListener("click", function() {
    // Get the country name from the input
    const country = countryInput.value;

    // Clear the previous weather data
    weatherBox.innerHTML = "";

    // Check if the country name is not empty
    if (country) {
      // Call the OpenWeatherMap API to get the weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          // Check if the API call was successful
          if (data.cod === 200) {
            // Get the relevant data from the response
            const name = data.name;
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;

            // Create the HTML elements to display the weather data
            const nameElement = document.createElement("h1");
            nameElement.textContent = name;

            const tempElement = document.createElement("p");
            tempElement.textContent = `${temp} °C`;

            const descElement = document.createElement("p");
            descElement.textContent = desc;

            const iconElement = document.createElement("img");
            iconElement.src = `http://openweathermap.org/img/wn/${icon}.png`;

            // Append the elements to the weather box
            weatherBox.appendChild(nameElement);
            weatherBox.appendChild(tempElement);
            weatherBox.appendChild(descElement);
            weatherBox.appendChild(iconElement);
          } else {
            // Display an error message
            const errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.textContent = "Sorry, no weather data found for that country.";
            weatherBox.appendChild(errorElement);
          }
        })
        .catch(error => {
          // Display an error message
          const errorElement = document.createElement("p");
          errorElement.classList.add("error");
          errorElement.textContent = "Sorry, something went wrong. Please try again later.";
          weatherBox.appendChild(errorElement);
        });
    } else {
      // Display an error message
      const errorElement = document.createElement("p");
      errorElement.classList.add("error");
      errorElement.textContent = "Please enter a country name.";
      weatherBox.appendChild(errorElement);
    }
  });
