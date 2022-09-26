const searchButton = document.getElementById('#searchButton');
const notSure = document.getElementById('.notSure');

function getApi () {
var requestUrl = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid=39fd177dd72ec3025e57b261104f1471';

fetch(requestUrl)
.then(function (response){
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  console.log(data);
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

searchButton,addEventListener('click', getApi);
