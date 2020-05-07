window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

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
                const { temp, name } = data.main;

                //Set DOM eleemts from API

                temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32).toFixed(2);
                temperatureDescription.textContent = "Fairly Warm";
                locationTimezone.textContent = data.name;
            })
        });

    } else alert('This app requires your location to work!');
});