//util
const $ = (target) => document.querySelector(target);
const createEl = (target) => document.createElement(target);
const addEvent = (target, e, handler) => target.addEventListener(e, handler);

//랜덤 이미지
const random = Math.floor(Math.random() * 5);
$("body").style.backgroundImage = `url(../img/${random + 1}.jpg)`;

//날씨
async function locationF(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5748fe631b00f3edf9319250363ecfc5`;
  const data = await fetch(url);
  await data.json().then((result) => {
    const { humidity, temp } = result.main;
    const { icon, description } = result.weather[0];

    $(".hum").textContent = "습도" + humidity + "%";
    $(".local_name").innerHTML = result.sys.country + ", " + result.name;
    $("#tem_img").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    $(".icon_dec").textContent = description;
    $(".temp").textContent = `${Math.round(temp - 273.15)}°C`;
  });
}

navigator.geolocation.getCurrentPosition(locationF, () => {
  alert("error");
});

//시계
function currentTimte() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const clock_Img = document.getElementById("clock_img");

  if (8 <= hour && hour < 12) {
    clock_Img.src = "/img/morning.png";
  }

  if ((18 <= hour && hour < 24) || (0 < hour && hour < 8)) {
    clock_Img.src = "/img/evening.png";
  }

  if (12 <= hour && hour < 18) {
    clock_Img.src = "/img/afternoon.png";
  }
  const _hour = hour > 12 ? hour - 12 : hour;

  $(".hour_minute").textContent = `${hour < 12 ? "AM" : "PM"} ${
    _hour < 10 ? "0" + _hour : _hour
  }시 ${minute < 10 ? "0" + minute : minute}분 `;
  $(".mouth_day").textContent = `${month + 1}월${day}일`;
}

setInterval(() => {
  currentTimte();
}, 1000);

//todo_list
const todo_write = document.getElementById("todo_write");
const todo = document.querySelectorAll(".todo");
let arr = [];

function createElement(loadData) {
  const div = createEl("div");
  const input = createEl("input");
  const content = createEl("content");
  const delete_btn = createEl("delete_btn");

  content.textContent = loadData;
  arr.push(todo_write.value);

  input.className = "check";
  content.className = "content";
  div.className = "todo";
  delete_btn.className = "delete";
  input.type = "checkbox";

  delete_btn.textContent = "X";
  div.append(input, content, delete_btn);
  $(".todo_list").appendChild(div);
  todo_write.value = "";

  addEvent(delete_btn, "click", () => {
    const text = delete_btn.previousSibling.textContent;
    let idx = arr.indexOf(text);
    arr.splice(idx, 1);
    $(".todo_list").removeChild(delete_btn.parentNode);
    localStorage.setItem(login_input.value, JSON.stringify(arr));
  });

  addEvent(input, "click", () => {
    const text = input.nextSibling.textContent;
    if (input.checked) {
      let idx = arr.indexOf(text);
      arr.splice(idx, 1);
    } else {
      arr.push(text);
    }
    localStorage.setItem(login_input.value, JSON.stringify(arr));
  });
}

addEvent($("#todo_submit"), "submit", (e) => {
  e.preventDefault();
  createElement(todo_write.value);
  localStorage.setItem(login_input.value, JSON.stringify(arr));
});

//로그인 팝업
addEvent($(".login_form"), "submit", (e) => {
  e.preventDefault();
  $(".login").style.visibility = "hidden";
  $("#todo_submit").style.visibility = "visible";
  const loadData = JSON.parse(localStorage.getItem($("#login_input").value));
  if (loadData) {
    loadData.forEach((el) => createElement(el));
    arr = loadData;
  }
});
