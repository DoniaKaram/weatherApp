const APIkey = "47856ba6146b479e9f171528221606";
let city;
date = new Date();
const currentDayName = document.querySelector(".currentDayName");
const currentDate = document.querySelector(".currentDate");
const Currencity = document.querySelector(".city");
const currentdegree = document.querySelector(".currentdegree");
const conditionIconBox = document.querySelector(".conditionIconBox");
const currenthim = document.querySelector(".currenthim");
const currentwindy = document.querySelector(".currentwindy");
const currentcompass = document.querySelector(".currentcompass");

const nextOFDayname = Array.from(document.querySelectorAll(".nextOFDayname"));
const find = document.getElementById("submit");
const inputCity = document.getElementById("search");

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Spet",
  "Oct",
  "Nov",
  "Dec",
];
const nextdays = Array.from(document.querySelectorAll(".nextday"));
async function getWeaterInfo() {
  try {
    if (inputCity.value == "") {
      city = "Cairo";
    } else {
      city = inputCity.value;
    }
    const url = `http://api.weatherapi.com/v1/forecast.json?key=47856ba6146b479e9f171528221606&q=${city}&days=4&aqi=no&alerts=no`;

    const responseData = await fetch(url);

    const finalData = await responseData.json();
    displayWeatherToday(finalData);
    console.log(
      "*********************************************************************"
    );
    displayNextDayWeather(finalData);
  } catch (error) {
    alert(error);
  }
}

getWeaterInfo();

find.addEventListener("click", getWeaterInfo);

function displayWeatherToday(finalData) {
  const apidate = finalData.forecast.forecastday[0].date;
  dataArray = apidate.split("-");
  const currentday = dataArray[2];

  const todayName = dayNames[date.getDay()];
  currentDayName.innerHTML = todayName;

  dateToday = `${currentday} ${monthName[date.getMonth()]}`;
  currentDate.innerHTML = dateToday;

  const currentCity = finalData.location.name;
  Currencity.innerHTML = currentCity;

  const temp = finalData.current.temp_c;
  currentdegree.innerHTML = `${temp}<sup>o</sup>C`;

  const todayIconHref = `https:${finalData.current.condition.icon}`;
  const imgbox = document.querySelector(".imgbox");
  imgbox.setAttribute("src", todayIconHref);
  const conditionText = finalData.current.condition.text;
  conditionIconBox.innerHTML = conditionText;
  const him = finalData.current.humidity;
  currenthim.innerHTML = him;
  const windy = finalData.current.wind_kph;
  currentwindy.innerHTML = windy;
  const compass = finalData.current.wind_dir;
  currentcompass.innerHTML = compass;
}

function displayNextDayWeather(finalData) {
  nextdays.forEach(function (item, index) {
    const nextDateApi = finalData.forecast.forecastday[index + 1].date;

    const date = new Date(nextDateApi);
    const nextDayName = dayNames[date.getDay()];
    nextOFDayname[index].innerHTML = nextDayName;

    const imgNext = document.querySelectorAll(".imgNext");
    imgNext[index].setAttribute(
      "src",
      `https:${finalData.forecast.forecastday[index + 1].day.condition.icon}`
    );
    const maxDegree = document.querySelectorAll(".maxDegree");
    maxDegree[index].innerHTML = `     ${
      finalData.forecast.forecastday[index + 1].day.maxtemp_c
    }<sup>o</sup>C;
`;
    const minDegree = document.querySelectorAll(".minDegree");
    minDegree[index].innerHTML = ` ${
      finalData.forecast.forecastday[index + 1].day.mintemp_c
    }<sup>o</sup>C`;

    const nextDayDescription = document.querySelectorAll(".nextDayDescription");
    nextDayDescription[index].innerHTML =
      finalData.forecast.forecastday[index + 1].day.condition.text;
  });
}
