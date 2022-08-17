let today=document.getElementById("today"),
 todayDate=document.getElementById("today-date"),
 cityLocation=document.getElementById("location"),
 todayDegree=document.getElementById("today-degree"),
 todayIcon=document.getElementById("today-icon"),
 humidty=document.getElementById("humidty"),
wind=document.getElementById("wind"),
 compass=document.getElementById("compass"),
 nextDay=document.getElementsByClassName("nextDay"),
 nextDayIcon=document.getElementsByClassName("nextDay-icon"),
 maxDegree=document.getElementsByClassName("max-degree"),
 minDegree=document.getElementsByClassName("min-degree"),
 nextDayDescription=document.getElementsByClassName("nextDay-description"),
 todayDescription=document.getElementById("today-description"),
 currentCity,
 search= document.getElementById("search-bar"),
 allData,
 response;
const Days=[
  "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
]
const months=[
  'Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'
]
//get API Data
async function getData(currentCity='Cairo')
{
  response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c99f650f1fe94983bda194854221906&q=${currentCity}&days=3&aqi=no&alerts=no`);
   allData=await response.json();
  console.log(allData);
  DisplayCurrent();
Displaynext();

}
getData();

//get current Data
function DisplayCurrent()
{
  const d = new Date();
  today.innerHTML=Days[d.getDay()];
  todayDate.innerHTML=`${d.getDate()} ${months[d.getMonth()]}`;
  cityLocation.innerHTML =  allData.location.name;
  todayDegree.innerHTML=allData.current.temp_c;
  humidty.innerHTML=allData.current.humidity;
  wind.innerHTML=allData.current. wind_kph;
  compass.innerHTML=allData.current. wind_dir;
  todayIcon.setAttribute("src",`https:${allData.current.condition.icon}`);
  todayDescription.innerHTML=allData.current.condition.text;


}
//get next Data
function Displaynext()
{
  for(i=0;i<nextDay.length;i++)
  {

    nextDay[i].innerHTML= Days[new Date(allData.forecast.forecastday[i+1].date).getDay()];
    nextDayIcon[i].setAttribute('src',`https:${allData.forecast.forecastday[i+1].day.condition.icon}`);
    maxDegree[i].innerHTML=allData.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML=allData.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDescription[i].innerHTML=allData.forecast.forecastday[i+1].day.condition.text;
  }

}
//search  data  of  weather
search.addEventListener("keyup",function(){
  currentCity=search.value;
  console.log(currentCity);
  getData(currentCity);

})



