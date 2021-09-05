//랜덤 이미지
const main = document.querySelector(".main");
const body = document.querySelector("body");
const random = Math.floor(Math.random() * 5);
body.style.backgroundImage = `url(../img/${random + 1}.jpg)`;

//날씨
async function locationF(position) {
  const tem = document.querySelector(".tem");
  const tem_img = document.getElementById("tem_img");
  const local_name = document.querySelector(".local_name");
  const hum = document.querySelector(".hum");
  const icon_dec = document.querySelector(".icon_dec");
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5748fe631b00f3edf9319250363ecfc5`;
  const data = await fetch(url);
  const json = await data.json().then((result) => {
    const name = result.name;
    const { humidity, temp } = result.main;
    const { icon, description } = result.weather[0];
    const temper = document.querySelector(".temp");

    hum.textContent = "습도" + humidity + "%";
    local_name.innerHTML = result.sys.country + ", " + result.name;
    tem_img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    icon_dec.textContent = description;
    temper.textContent = `${Math.round(temp - 273.15)}°C`;
  });
}

navigator.geolocation.getCurrentPosition(locationF, () => {
  alert("error");
});

//시계
function currentTimte() {
  const clock = document.querySelector(".clock");
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const seconds = time.getSeconds();
  const clock_Img = document.getElementById("clock_img");

  if (8 < hour && hour < 12) {
    clock_Img.src = "./img/morning.png";
  }

  if ((18 <= hour && hour < 24) || (0 < hour && hour < 8)) {
    clock_Img.src = "./img/evening.png";
  }

  if (12 <= hour && hour < 18) {
    clock_Img.src = "./img/afternoon.png";
  }
  const hour_minute = document.querySelector(".hour_minute");
  const month_day = document.querySelector(".mouth_day");
  const _hour = hour > 12 ? hour - 12 : hour;

  hour_minute.textContent = `${hour < 12 ? "AM" : "PM"} ${
    _hour < 10 ? "0" + _hour : _hour
  }시 ${minute < 10 ? "0" + minute : minute}분 `;
  month_day.textContent = `${month + 1}월${day}일`;
}

setInterval(() => {
  currentTimte();
}, 1000);

//todo_list
const todo_list = document.querySelector(".todo_list");
const todo_submit = document.getElementById("todo_submit");
const todo_write = document.getElementById("todo_write");
const todo = document.querySelectorAll(".todo");
let arr = [];

function createElement(loadData) {
  const div = document.createElement("div");
  const input = document.createElement("input");
  const content = document.createElement("h2");
  const delete_btn = document.createElement("div");

  content.textContent = loadData;
  arr.push(todo_write.value);

  input.className = "check";
  content.className = "content";
  div.className = "todo";
  delete_btn.className = "delete";
  input.type = "checkbox";

  delete_btn.textContent = "X";
  div.append(input, content, delete_btn);
  todo_list.appendChild(div);
  todo_write.value = "";
  delete_btn.addEventListener("click", () => {
    const text = delete_btn.previousSibling.textContent;
    let idx = arr.indexOf(text);
    console.log(idx);
    arr.splice(idx, 1);
    todo_list.removeChild(delete_btn.parentNode);
    localStorage.setItem(login_input.value, JSON.stringify(arr));
  });
}

todo_submit.addEventListener("submit", (e) => {
  e.preventDefault();
  createElement(todo_write.value);
  localStorage.setItem(login_input.value, JSON.stringify(arr));
});

//로그인 팝업
const login_input = document.getElementById("login_input");
const login = document.querySelector(".login");
const login_form = document.querySelector(".login_form");

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  login.style.visibility = "hidden";
  todo_submit.style.visibility = "visible";
  const loadData = JSON.parse(localStorage.getItem(login_input.value));
  if (loadData) {
    loadData.forEach((el) => createElement(el));
    arr = loadData;
    console.log(arr);
  }
});

//checked
