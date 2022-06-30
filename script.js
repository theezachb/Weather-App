let weather = {
    "apiKey": "176c0ec07f2e7eec5ebdb6dbdca8c983",
    fetchWeather: function(city) {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&units=imperial&appid=" 
            + this.apiKey
            )
            // .then((response) => response.json())
            // .then((data) => this.displayWeather(data));
            .then((response) => {
                if (!response.ok) {
                  alert("No weather found.");
                  throw new Error("No weather found.");
                }
                return response.json();
              })
              .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".City").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);

    }
};

document.querySelector(".search button")
.addEventListener("click", function() {
    weather.search();

});

document.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Jacksonville");