//Global Variables
let dataArray = []
let localStorageArray = []
const now = moment().format('l');

//Element Selectors for event listeners
let searchButton = document.getElementById('searchButton');
let savedCity = document.getElementsByClassName('savedButton');

//Element Selectors
let input = document.getElementById('formInput')
let appendHere = document.getElementById('whereToAppend');
let mainWeather = document.getElementById("apiHeader");
let mainArea = document.getElementById('mainArea');
let mainTemp = document.getElementById('temp');
let mainWind = document.getElementById('wind');
let mainHumidity = document.getElementById('humidity');
let mainselector = document.getElementsByTagName('main');




//Function to retrieve saved cities
function retrieveArray() {
  var locate = JSON.parse(localStorage.getItem("city"))
  console.log(localStorageArray)

  for (let index = 0; index < locate.length; index++) {
    savedCity[index].textContent = localStorageArray[index]
  }
}



//Primary getApi function
function getApi(event, city) {
  var city = input.value
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=188a51d5f423814817d69f7e3e5961b3`;


  //fetch URL convert to json format
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // This is the main page display
      let city = data.city.name
      let temp = ((data.list[0].main.temp - 273.15) * 1.8) + 32
      let wind = data.list[0].wind.speed
      let humidity = data.list[0].main.humidity
      let icon = data.list[0].weather[0].icon
      let dataArray = []

      let imagetag = document.createElement('img')
      imagetag.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

      document.getElementById("mainAreaM").appendChild(imagetag)


      //assigning the values to main page
      mainWeather.textContent = city + " " + now //+ Image;
      mainTemp.textContent = "Temp: " + temp.toFixed(2) + " °F";
      mainWind.textContent = "Wind: " + wind + " MPH";
      mainHumidity.textContent = "Humidity: " + humidity + "%";

      //Turning 5day 3hour api into 5 day 24 hour
      dataArray.push(data.list[1])
      dataArray.push(data.list[9])
      dataArray.push(data.list[17])
      dataArray.push(data.list[25])
      dataArray.push(data.list[33])

      //DOM -appending 5 days
      for (let index = 0; index < dataArray.length; index++) {
        //console.log(index)

        let apiHeaderi = document.getElementById(`day` + index)
        let tempi = document.getElementById(`temp` + index);
        let windi = document.getElementById(`wind` + index);
        let humidityi = document.getElementById(`humidity` + index);
        let tempy = ((dataArray[index].main.temp - 273.15) * 1.8) + 32

        //creating images within 5 day
        let iconi = dataArray[index].weather[0].icon
        let imagetagi = document.getElementById('mainArea' + index)
        imagetagi.setAttribute("src", `http://openweathermap.org/img/wn/${iconi}@2x.png`)


        //updating data within 5 day
        apiHeaderi.textContent = moment().add(index + 1, 'days').format('l') //date
        tempi.textContent = "Temp: " + tempy.toFixed(2) + " °F"
        windi.textContent = "Wind: " + dataArray[index].wind.speed + " MPH"
        humidityi.textContent = "Humidity: " + dataArray[index].main.humidity + "%"

      }

      //Creating a new array of saved cities, pushing to local storage. Then retrieving
      localStorageArray.push(city)
      localStorage.setItem("city", JSON.stringify(localStorageArray));

    });

  retrieveArray()

}


// //event listener for savedButton (save cities on left)
// savedCity.addEventListener('click', function(event){
//   let xCity = savedButton.value
//   console.log(event.target)
//   getApi(xCity);
// })



searchButton.addEventListener('click', getApi);
