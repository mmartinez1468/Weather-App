// Weather App

const weatherForm = document.querySelector(".weatherForm");
const enterCity = document.querySelector(".enterCity");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "efbd3b529d5c04a8dc24ef31fd663e0f";

weatherForm.addEventListener("submit", async event => {
   
    event.preventDefault(); // Prevents weatherForm from refreshing the page

    const city = enterCity.value;

    if(city){
        try {
           const keyData = await getKeyData(city);
           displayKeyInfo(keyData);
        }
        catch(error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please Enter A City");
    }
});
// Get city and data from API Key
async function getKeyData(city){

    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiCall);

    if(!response.ok){
        throw new Error("Could not retrieve weather data");
    }

    return await response.json();
}
// Display said data from API key to display to user in HTML
function displayKeyInfo(data){
    const {name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;
    
    weatherCard.textContent = "";
    weatherCard.style.display = "flex";

    // Add elements into the User Interface 
    const cityName = document.createElement("h1");
    const cityTemp = document.createElement("p");
    const cityHumidity = document.createElement("p");
    const cityType = document.createElement("p");
    const cityEmoji = document.createElement("p");

    // Add data into the newly created elements
    cityName.textContent = city;
    cityTemp.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    cityHumidity.textContent = `Humidity: ${humidity}%`;
    cityType.textContent = `${description}`;
    cityEmoji.textContent = getEmojiData(id);

    // Add CSS styling to elements
    cityName.classList.add("cityName");
    cityTemp.classList.add("cityName");
    cityHumidity.classList.add("cityHumidity")
    cityType.classList.add("cityType");
    cityEmoji.classList.add("cityEmoji")

    // Add child elemts to parent function weatherCard
    weatherCard.appendChild(cityName);
    weatherCard.appendChild(cityTemp);
    weatherCard.appendChild(cityHumidity);
    weatherCard.appendChild(cityType);
    weatherCard.appendChild(cityEmoji);
    
}
// Get corresponding emoji with data from API key
function getEmojiData(weather) {

    switch(true) {
        case (200 >= weather && weather < 300):
            return "⛈";
        case (300>= weather && weather < 400):
            return "🌦";
        case (500 >= weather && weather < 600):
            return "🌧";
        case (600 >= weather && weather < 700):
            return "🌨";
        case (700 >= weather && weather < 800):
            return "🌫";
        case (800 === weather):
            return "☀";
        case (801 >= weather && weather < 810):
            return "☁";
        default:
            return "❓";
    }
}
// Display a message if program fails due to incorrect user input
function displayError(message) {
    
    const cityError = document.createElement("p");
    cityError.textContent = message;
    cityError.classList.add("cityError");

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(cityError);
}