window.addEventListener('load', ()=> {
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;

            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=172da5b327659edab3fba95b4a8325b7`;

            // const api = `http://api.openweathermap.org/data/2.5/forecast?id=${lat},${long}&APPID={172da5b327659edab3fba95b4a8325b7}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp } = data.main;
                let iconCode = data.weather[0].icon;

                //Set DOM eleemts from API

                temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32).toFixed(2);
                temperatureDescription.textContent = "Fairly Warm";
                locationTimezone.textContent = data.name;
    
                //Set icons

                let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                console.log(iconUrl);

                // setIcons(icon, document.querySelector(".icon"));

                //Change temperature to Farenheit/Celcious
                
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = (temp - 273.15).toFixed(2);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32).toFixed(2);
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