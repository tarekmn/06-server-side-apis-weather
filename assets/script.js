let searchButton = document.getElementById('searchButton');
let input= document.getElementById('formInput')
// let notSure = document.getElementById('.notSure');
let mainWeather = document.getElementById("apiHeader");
let mainTemp = document.getElementById('temp');
let mainWind = document.getElementById('wind');
let mainHumidity = document.getElementById('humidity');


const weatherDays = []
let currDay = null



function getApi(event) {
  var city = input.value
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=188a51d5f423814817d69f7e3e5961b3`;



  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      let temp= ((data.list[0].main.temp-273.15)*1.8)+32

      console.log(data);
      console.log(data.city.name) //city name
      console.log(temp) // temp not sure why so high
      console.log(data.list[0].wind.speed) //wind mph
      console.log(data.list[0].main.humidity) //humidity %

      mainWeather.textContent = data.city.name;
      mainTemp.textContent = "Temp: " + temp.toFixed(2) + " °F";
      mainWind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
      mainHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";






      // // TODO: Loop through the data and generate your HTML
      // for (let index = 0; index < data.length; index++) {
      //   var loginName = document.createElement('h3');
      //   var url = document.createElement('p');
      //   loginName.textContent = data[i].user.login;
      //   url.textContent = data[i].url;
      //   userContainer.appendChild(loginName)
      //   userContainer.appendChild(url)



    });



}


// const weatherDays = []  
// let currDay = null

// sampleData.list.forEach( function(tsObj){

//   // Makes a moment date object for each record
//   const dateObj = moment.unix(tsObj.dt)

//   // Generate the day # for the day in the date object
//   const dateNum = dateObj.format("DDD")

//   // If the current date in tsObj hasn't had a record put into weatherDays, do that now 
//   // Then skip over all other records for this day
//   if( dateNum !== currDay && weatherDays.length < 5 ){
//     weatherDays.push( tsObj )
//     currDay = dateNum
//   }

// })

searchButton, addEventListener('click', getApi);
