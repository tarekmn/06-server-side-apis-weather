//Global Variables
let dataArray = []
let localStorageArray = []
const now = moment().format('l');

//Element Selectors 
let searchButton = document.getElementById('searchButton');
let input= document.getElementById('formInput')
let appendHere = document.getElementById('whereToAppend');
let mainWeather = document.getElementById("apiHeader");
let mainArea = document.getElementById('mainArea');
let mainTemp = document.getElementById('temp');
let mainWind = document.getElementById('wind');
let mainHumidity = document.getElementById('humidity');
let mainselector = document.getElementsByTagName('main');
let savedCity = document.getElementsByClassName('savedButton')




//Function to console log saved cities, will later update
function retrieveArray() {
  var locate = JSON.parse(localStorage.getItem("city"))
  console.log(locate)

  for (let index = 0; index < locate.length; index++) {
    savedCity[index].textContent= locate[index]
    
  }
  

}



//Primary getApi function
function getApi(event) {
  var city = input.value
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=188a51d5f423814817d69f7e3e5961b3`;

  console.log(localStorageArray);

  //display hidden area//
  // mainArea.setAttribute("class", "mainAreaX")

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      console.log(data)

      // This is the main page display
      let city = data.city.name
      let temp= ((data.list[0].main.temp-273.15)*1.8)+32
      let wind= data.list[0].wind.speed
      let humidity = data.list[0].main.humidity
      let icon = data.list[0].weather[0].icon
      let dataArray = []

      //assigning the values to main page
      mainWeather.textContent = city + " " + now + icon;
      mainTemp.textContent = "Temp: " + temp.toFixed(2) + " °F";
      mainWind.textContent = "Wind: " + wind + " MPH";
      mainHumidity.textContent = "Humidity: " + humidity + "%";

      //Turning 5day 3hour api into 5 day 24 hour
      dataArray.push(data.list[1])
      dataArray.push(data.list[9])
      dataArray.push(data.list[17])
      dataArray.push(data.list[25])
      dataArray.push(data.list[33])
      console.log(dataArray)

      //DOM -appending 5 days
      for (let index = 0; index < dataArray.length; index++) {
        //console.log(index)

        let apiHeaderi = document.getElementById(`day`+ index)
        let tempi = document.getElementById(`temp`+index);
        let windi = document.getElementById(`wind`+ index);
        let humidityi = document.getElementById(`humidity`+ index);
        let tempy = ((dataArray[index].main.temp-273.15)*1.8)+32

        apiHeaderi.textContent= moment().add(index +1, 'days').format('l') //date
        tempi.textContent= "Temp: " + tempy.toFixed(2) + " °F"
        windi.textContent= "Wind: " + dataArray[index].wind.speed+ " MPH"
        humidityi.textContent= "Humidity: " + dataArray[index].main.humidity + "%"

        // document.body.appendChild(apiHeaderi);
        // document.body.appendChild(tempi);
        // document.body.appendChild(windi);
        // document.body.appendChild(humidityi);

      }
      // //Reseting Values so there it replaces new 5 days instead of add
      // apiHeaderi.textContent= ""
      // tempi.textContent= ""
      // windi.textContent= ""
      // humidityi.textContent= ""


      //Creating a new array of saved cities, pushing to local storage. Then retrieving
      localStorageArray.push(city)
      localStorage.setItem("city", JSON.stringify(localStorageArray));
      
      
      
    });

    retrieveArray()

}



searchButton.addEventListener('click', getApi);
