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
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/night/"+addZero(randomInteger(1, 20))+".jpg')",

    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/morning/"+addZero(randomInteger(1, 20))+".jpg')",

    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/day/"+addZero(randomInteger(1, 20))+".jpg')",

    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')",
    "url('assets/images/evening/"+addZero(randomInteger(1, 20))+".jpg')"
]

//Show time
function showTime() {
    //let today = new Date(2020, 6, 10, 00, 33, 30);
    let today = new Date();

    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };

    let date = today.toLocaleString("ru", options);
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //24th Format
    if (hour == 0) {
        hour = 24;
    }

    //Output Time
    dateTag.innerHTML = date;
    hourTag.innerHTML = addZero(hour);
    minTag.innerHTML = addZero(min);
    secTag.innerHTML = addZero(sec);


    setTimeout(showTime, 1000);
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
    console.log(images);

    let indexImg = today.getHours();
    btn.addEventListener("click", function (event) {


        if (btn.contains(event.target)) {
            if(indexImg < 23) {
                indexImg += 1;
                document.body.style.backgroundImage = images[indexImg];
            } else {
                indexImg = 0;
                document.body.style.backgroundImage = images[indexImg];
            }
        }

    })
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
            if(name.textContent) {
                localStorage.setItem('name', e.target.innerText);
                name.blur();
            } else {
                name.textContent = localStorage.getItem('name');
                name.blur();
            }

            if(localStorage.getItem('name') === null){
                name.textContent = '[как тебя называть?]';
            }
        }
    } else {
        if(name.textContent) {
            localStorage.setItem('name', e.target.innerText);
        } else {
            name.textContent = localStorage.getItem('name');
        }

        if(localStorage.getItem('name') === null){
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
            if(!(focus.textContent == "")) {
                localStorage.setItem('focus', e.target.innerText);
                focus.blur();
            } else {
                focus.textContent = localStorage.getItem('focus');
                focus.blur();
            }
            if(localStorage.getItem('focus') === null){
                focus.textContent = '[Выберешь цель?]';
            }
        }
    } else {
        if(!(focus.textContent == "")) {
            localStorage.setItem('focus', e.target.innerText);
        } else {
            focus.textContent = localStorage.getItem('focus');
        }
        if(localStorage.getItem('focus') === null){
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

//Run
showTime();
setBgGreet();
getName();
getFocus();

