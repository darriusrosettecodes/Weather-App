const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.fa-magnifying-glass')
const errorMessage = document.querySelector('.error')
const weatherImageContainer = document.querySelector('.weather-image-container')
const weatherImageElement = document.querySelector('.weather-image')
const weatherDetailsContainer = document.querySelector('.weather-details')
const temperatureElement = document.querySelector('.temperature')
const typeOfWeatherElement = document.querySelector('.type-of-weather')
const extraWeatherDetails = document.querySelector('.extra-weather-details')
const humidityAmountElement = document.querySelector('.humidity-amount')
const windAmountElement = document.querySelector('.wind-amount')

// Default Styles
errorMessage.style.display = 'block'
weatherImageContainer.style.display = 'none'
weatherDetailsContainer.style.display = 'none'
extraWeatherDetails.style.display = 'none'

const getWeather = function() {
    const cityName = searchBar.value.trim()

    const apiKey = 'feeb058bfe950a0e4709335757361031'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    fetch(apiUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(weatherData){
        const typeOfWeather = weatherData.weather[0].main
        const temperature  = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32)
        const humidity = Math.round(weatherData.main.humidity)
        const wind = Math.round(weatherData.wind.speed)

        errorMessage.style.display = 'none'
        weatherImageContainer.style.display = 'block'
        weatherDetailsContainer.style.display = 'block'
        extraWeatherDetails.style.display = 'flex'

        temperatureElement.textContent = temperature
        typeOfWeatherElement.textContent = typeOfWeather
        humidityAmountElement.textContent = humidity
        windAmountElement.textContent = wind

        if(typeOfWeather == 'Rain'){
            weatherImageElement.src = 'rain.png'
        }
        else if(typeOfWeather == 'Clear'){
            weatherImageElement.src = 'sun.png'
        }
        else if(typeOfWeather == 'Clouds'){
            weatherImageElement.src = 'cloudy.png'
        }
        else if(typeOfWeather == 'Drizzle'){
            weatherImageElement.src = 'drizzle.png'
        }
        else if(typeOfWeather == 'Snow'){
            weatherImageElement.src = 'snowflake.png'
        }
        else if(typeOfWeather == 'Thunderstorm'){
            weatherImageElement.src = 'scattered-thunderstorms.png'
        }
        else if(typeOfWeather == 'Mist'){
            weatherImageElement.src = 'mist.png'
        }
        else if(typeOfWeather == 'Fog'){
            weatherImageElement.src = 'fog.png'
        }
    })
    .catch((error) => {
        errorMessage.style.display = 'block'
        weatherImageContainer.style.display = 'none'
        weatherDetailsContainer.style.display = 'none'
        extraWeatherDetails.style.display = 'none'
    });

    const weatherCardCont = document.querySelector('.weather-card-cont')
    weatherCardCont.classList.remove('fade-in')
    void weatherCardCont.offsetWidth
    weatherCardCont.classList.add('fade-in')
}

searchBtn.addEventListener('click', getWeather)
