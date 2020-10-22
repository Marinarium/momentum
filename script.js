//DOM
const dateTag = document.getElementById('date');
const hourTag = document.getElementById('hours');
const minTag = document.getElementById('mins');
const secTag = document.getElementById('secs');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const btn = document.getElementById('button');

//Array of images
const images = [
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')", //0
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')", //1
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')", //2
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')", //3
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')", //4
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')", //5

    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')", //6
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')", //7
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')", //8
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')", //9
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')", //10
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')", //11

    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')", //12
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')", //13
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')", //14
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')", //15
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')", //16
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')", //17

    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')", //18
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')", //19
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')", //20
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')", //21
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')", //22
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')"  //23
]

//Show time
function showTime() {
    //let today = new Date(2020, 6, 10, 00, 33, 30);
    let today = new Date();

    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //24th Format
    if (hour == 0) {
        hour = 24;
    }

    //Output Time
    hourTag.innerHTML = addZero(hour);
    minTag.innerHTML = addZero(min);
    secTag.innerHTML = addZero(sec);


    setTimeout(showTime, 1000);
}

function showDate(){
    //let today = new Date(2020, 6, 10, 00, 33, 30);
    let today = new Date();

    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };

    let date = today.toLocaleString("ru", options);

    //Output Date
    dateTag.innerHTML = date;

    setTimeout(showDate, 60000);
}

//Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Random Integers
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//Set Background
function setBgGreet() {
    //let today = new Date(2020, 6, 10, 20, 33, 30);
    let today = new Date();
    let hour = today.getHours();

    if(hour < 6){
        //Night
        document.body.style.backgroundImage = images[today.getHours()];
        greeting.textContent = "Доброй ночи,"
    } else if(hour < 12) {
        //Morning
        document.body.style.backgroundImage = images[today.getHours()];
        greeting.textContent = "Доброе утро,"
    } else if (hour < 18) {
        //Day
        document.body.style.backgroundImage = images[today.getHours()];
        greeting.textContent = "Добрый день,"
    } else {
        //Evening
        document.body.style.backgroundImage = images[today.getHours()];
        greeting.textContent = "Добрый вечер,"
    }

    let indexImg = today.getHours();
    btn.addEventListener("click", function (event) {
        btn.disabled = true;
        if (btn.contains(event.target)) {

            if(indexImg < 23) {
                indexImg += 1;
                document.body.style.backgroundImage = images[indexImg];
            } else {
                indexImg = 0;
                document.body.style.backgroundImage = images[indexImg];
            }

            setTimeout(function() { btn.disabled = false }, 1300);
        }
    });

    //update every new hour
    let current = new Date();
    let future = new Date();
    future.setTime(future.getTime() + 3600000); //3600000 = 1 hour
    future.setMinutes(0);
    future.setSeconds(0);

    let timeout = (future.getTime() - current.getTime());
    setTimeout(setBgGreet, timeout);
}

//Get name
function getName() {
    if(localStorage.getItem('name') === null){
        name.textContent = '[как тебя называть?]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//Clean name
function cleanName(e) {
    if(e.type === "focus"){
        name.textContent = '';
    }
}

//Set name
function setName(e) {
    if(e.type === "keypress") {
        //Make sure enter is pressed
        if(e.which == 13){
            if(name.textContent && name.textContent.trim()) {
                localStorage.setItem('name', e.target.innerText);
                name.blur();
            } else {
                name.textContent = localStorage.getItem('name');
                name.blur();
            }

            if(localStorage.getItem('name') === null || !name.textContent.trim()){
                name.textContent = '[как тебя называть?]';
            }
        }
    } else {
        if(name.textContent && name.textContent.trim()) {
            localStorage.setItem('name', e.target.innerText);
        } else {
            name.textContent = localStorage.getItem('name');
        }

        if(localStorage.getItem('name') === null || !name.textContent.trim()){
            name.textContent = '[как тебя называть?]';
        }
    }
}

//Get focus
function getFocus() {
    if(localStorage.getItem('focus') === null){
        focus.textContent = '[Выберешь цель?]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//Clean focus of focus
function cleanFocus(e) {
    if(e.type === "focus"){
        focus.textContent = '';
    }
}

//Set focus
function setFocus(e) {
    if(e.type === "keypress") {
        //Make sure enter is pressed
        if(e.which == 13){
            if(focus.textContent && focus.textContent.trim()) {
                localStorage.setItem('focus', e.target.innerText);
                focus.blur();
            } else {
                focus.textContent = localStorage.getItem('focus');
                focus.blur();
            }
            if(localStorage.getItem('focus') === null || !focus.textContent.trim()){
                focus.textContent = '[Выберешь цель?]';
            }
        }
    } else {
        if(focus.textContent && focus.textContent.trim()) {
            localStorage.setItem('focus', e.target.innerText);
        } else {
            focus.textContent = localStorage.getItem('focus');
        }
        if(localStorage.getItem('focus') === null || !focus.textContent.trim()){
            focus.textContent = '[Выберешь цель?]';
        }
    }
}

name.addEventListener('focus', cleanName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('focus', cleanFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


//Weather
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const errorMessage = document.querySelector('.error-message');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=33144909d877076f1ae4df04b094c978&units=metric`;
    const res = await fetch(url);
    if(res.ok){
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `влажность ${data.main.humidity}%`;
        wind.textContent = `ветер ${data.wind.speed} м/с`;
        errorMessage.textContent = '';
    } else if (!(res.ok) && localStorage.getItem('city')) {
        weatherIcon.className = '';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
        errorMessage.textContent = `${localStorage.getItem('name') ? localStorage.getItem('name') : 'Друг'}, что-то пошло не так...`
    } else  {
        weatherIcon.className = '';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
        errorMessage.textContent = '';
    }

    setTimeout(getWeather, 3600000);
}

//Get city
function getCity() {
    if(localStorage.getItem('city') === null){
        city.textContent = '[В каком городе посмотреть погоду?]';
    } else {
        city.textContent = localStorage.getItem('city');
        //getWeather();
    }
}

//Clean city
function cleanCity(e) {
    if(e.type === "focus"){
        city.textContent = '';
    }
}

//Set city
function setCity(e) {
    if(e.type === "keypress") {
        //Make sure enter is pressed
        if(e.which == 13){
            if(city.textContent && city.textContent.trim()) {
                localStorage.setItem('city', e.target.innerText);
                city.blur();
                getWeather();
            } else {
                city.textContent = localStorage.getItem('city');
                city.blur();
                getWeather();
            }

            if(localStorage.getItem('city') === null || !city.textContent.trim()){
                city.textContent = '[В каком городе посмотреть погоду?]';
            }
        }
    } else {
        if(city.textContent && city.textContent.trim()) {
            localStorage.setItem('city', e.target.innerText);
            getWeather();
        } else {
            city.textContent = localStorage.getItem('city');
            getWeather();
        }

        if(localStorage.getItem('city') === null || !city.textContent.trim()){
            city.textContent = '[В каком городе посмотреть погоду?]';
        }
    }
}

//City
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('focus', cleanCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

//Quote
const quote = document.querySelector('.quote__text');
const author = document.querySelector('.quote__author');
const btnQuote = document.querySelector('.quote__btn');

async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);

    if(res.ok){
        const data = await res.json();
        quote.textContent = data.quoteText;
        author.textContent = data.quoteAuthor;
    } else {
        quote.textContent = "Что-то пошло не так. Попробуй получить цитату позже"
    }

}



btnQuote.addEventListener("click", function (event) {
    btnQuote.disabled = true;
    if (btnQuote.contains(event.target)) {
        getQuote();
        setTimeout(function() { btnQuote.disabled = false }, 1300);
    }
});
document.addEventListener('DOMContentLoaded', getQuote);

//Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getCity();