let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');

window.addEventListener('load', ()=> {
   
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;

            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=172da5b327659edab3fba95b4a8325b7`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp } = data.main;
                let iconCode = data.weather[0].icon;

                //Set DOM eleemts from API

                let currentTemperature =  (temp - 273.15).toFixed(2);
                temperatureDegree.textContent = (temp - 273.15).toFixed(2);

                if(currentTemperature <= 10.00) {
                    temperatureDescription.textContent = "It's figging Cold";
                } else if(currentTemperature <= 20.00) {
                    temperatureDescription.textContent = "It's rather cold. Grab a sweater!"
                } else if(currentTemperature <= 25.00) {
                    temperatureDescription.textContent = "Fairly Warm."
                } else if(currentTemperature <= 30.00) {
                    temperatureDescription.textContent = "It's really warm!"
                } else {
                    temperatureDescription.textContent = "Quite hot. Grab some ice!"
                }
                
                locationTimezone.textContent = data.name;
    
                //Set icons

                let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                console.log(iconUrl);

                // setIcons(icon, document.querySelector(".icon"));

                //Change temperature to Farenheit/Celcious
                
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'C') {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32).toFixed(2);
                    } else {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = (temp - 273.15).toFixed(2);
                    }
                })
                
            })
        });

    } else alert('This app requires your location to work!');

    // function setIcons(icon, iconID) {
    //     const skycons = new Skycons({color:"white"});
    //     const currentIcon = icon;
    //     skycons.play();
    //     return skycons.set(iconID, Skycons[currentIcon]);
    // }
});