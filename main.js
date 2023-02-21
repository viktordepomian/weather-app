const inputSearch = document.getElementById('search');
const apikey = '1bce1d2e31d342aede4f167488ae07e5';

inputSearch.addEventListener('keyup', function(e){
    const city = document.getElementById('search').value;
    const searchContainer = document.querySelector('.search-container');
    if(e.key === 'Enter'){
        e.preventDefault();
        searchContainer.classList.remove('hidden');
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                searchContainer.innerHTML = `
                <div class="info">
                    <p class="city-name">${data.name}</p>
                    <div class="weather">
                        <p class="temperature">${data.main.temp}</p>
                    </div>
                </div>
                `
            })
    }
});