const inputSearch = document.getElementById('search');
const apikey = '1bce1d2e31d342aede4f167488ae07e5';


inputSearch.addEventListener('keyup', function(e){
    const city = document.getElementById('search').value;
    const dropdown = document.getElementById('location-dropdown');
    const searchContainer = document.querySelector('.search-container');
    if(e.key === 'Enter'){
        e.preventDefault();
            if(city.length > 2){
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    let weather = data.weather[0].main;
                    let image = '';
                    switch(weather){
                        case 'Clouds':
                            image = 'images/Clouds.png'
                            break;
                        case 'Clear':
                            image = 'images/Clear.png';
                            break;
                        case 'Rain':
                            image = 'images/Rain.png';
                            break;
                        case 'Snow':
                            image = 'images/Snow.png';
                            break;
                        case 'Thunderstorm':
                            image = 'images/Thunderstorm.png';
                            break;
                        default:
                            break;
                    }
                    searchContainer.innerHTML = `
                    <div class="info">
                        <div class="img">
                            <img class="weather-image" src="${image}" />
                        </div>
                        <p class="temperature">${Math.round(data.main.temp)}°</p>
                        <p class="city-name">${data.name}</p>  
                    </div>
                    `        
                })
                .catch(error => console.log(error));
            }
    };
});

