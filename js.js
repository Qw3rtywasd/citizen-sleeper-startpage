webNames = ["THE CLOUD", "THE WEB", "THE INTERNET", "THE WIRED", "THE GRID", "THE METAVERSE", "THE NEXUS", "THE NET"];
defaultWallpaperURL = "https://giffiles.alphacoders.com/215/215982.gif";
defaultAccentHex = "#F0275E";

const engines = document.getElementById("searchEngines").getElementsByTagName("span");
const toDoList = document.getElementById("toDoList");
const searchInput = document.getElementById("searchbox");
const r = document.querySelector(":root");
var autoFocus = true;

if (localStorage.getItem("wallpaper") == null)
  setWallpaper(defaultWallpaperURL);
else
  setWallpaper(localStorage.getItem("wallpaper"));
if (localStorage.getItem("accent") == null)
  changeAccentColor(defaultAccentHex)
else
  changeAccentColor(localStorage.getItem("accent"));
showBookmarks();
exploreMessage();
window.onkeydown = searchInputFocus;

function changeWallpaper(input) {
  setWallpaper(input);
  localStorage.setItem("wallpaper", input);
}

function setWallpaper(input) {
  document.body.style.backgroundImage = "url(" + input + ")";
}

function changeAccentColor(input) {
  accentPicker = document.getElementById("accentPicker");
  accentPicker.value = input;
  setAccentColor(input);
  localStorage.setItem("accent", input);
}

function setAccentColor(input) {
  r.style.setProperty("--accent", input);
}

function arrowButton(x) {
  let next = x.nextElementSibling;
  if (x.innerHTML === "▶") {
    x.innerHTML = "◀";
  } else {
    x.innerHTML = "▶";
  }
  if (x.id === "rightArrowButton") {
    next.classList.toggle("visible");
    next.nextElementSibling.classList.toggle("visible");
  } else {
    next.classList.toggle("visible");
  }
  autoFocus = !autoFocus;
}

function addTodo() {
  let temp = document.getElementsByTagName("template")[1];
  let clone = temp.content.cloneNode(true);
  toDoList.appendChild(clone);
  collapseToDo(toDoList.lastElementChild.previousSibling);
}

function collapseToDo(t) {
  var panel = t.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}

function makeBookmark(pos, name, link) {
  let temp = document.getElementsByTagName("template")[0];
  let clone = temp.content.cloneNode(true);
  let a = clone.querySelector("a");
  a.innerHTML = name;
  a.href = link;
  diceTray.replaceChild(clone, diceTray.children[pos]);
}

function changeBookmark(input) {
  if (event.key === "Enter") {
    let ia = input.value.split("|");
    makeBookmark(ia[0], ia[1], ia[2]);
    localStorage.setItem("bookmark" + ia[0], ia[1] + "|" + ia[2]);
  }
}

function showBookmarks() {
  for (i = 1; i < 6; i++) {
    let bookmark = localStorage.getItem("bookmark" + i);
    if (bookmark != null) {
      x = bookmark.split("|");
      makeBookmark(i, x[0], x[1]);
    }
  }
}

String.prototype.replaceChars = function(character, replacement) {
  var str = this;
  var a;
  var b;
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === character) {
      a = str.substr(0, i) + replacement;
      b = str.substr(i + 1);
      str = a + b;
    }
  }
  return str;
}

function search(query) {
  switch (query.substr(0, 2)) {
    case "-y":
      query = query.substr(3);
      window.open("https://www.youtube.com/results?search_query=" +
        query.replaceChars(" ", "%20"), "_blank");
      break;
    case "-w":
      query = query.substr(3);
      window.open(
        "https://wikipedia.org/w/index.php?search=" +
        query.replaceChars(" ", "%20"), "_blank");
      break;
    case "-j":
      query = query.substr(3);
      window.open(
        "https://www.weblio.jp/content/" +
        query.replaceChars(" ", "%20"), "_blank");
      break;
    default:
      window.open("https://www.google.com/search?q=" +
        query.replaceChars(" ", "%20"), "_blank");
  }
}

searchInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    if (searchInput.value === "") {
      searchInput.placeholder = "type something...";
    } else {
      search(this.value);
      searchInput.value = "";
      searchInput.placeholder = "-y | -w | -j";
      document.getElementById("youtube").classList.remove("highlight");
      document.getElementById("wikipedia").classList.remove("highlight");
      document.getElementById("weblio").classList.remove("highlight");
      document.activeElement.blur();
    }
  }
});

function searchInputFocus() {
  if (autoFocus)
    searchInput.focus();
}

function highlightSearchEngine() {
  var text = searchInput.value;
  switch (text.substr(0, 2)) {
    case "-y":
      document.getElementById("youtube").classList.add("highlight");
      break;
    case "-w":
      document.getElementById("wikipedia").classList.add("highlight");
      break;
    case "-j":
      document.getElementById("weblio").classList.add("highlight");
      break;
    default:
      document.getElementById("youtube").classList.remove("highlight");
      document.getElementById("wikipedia").classList.remove("highlight");
      document.getElementById("weblio").classList.remove("highlight");
  }
}

function selectSearchEngine(input) {
  for (i = 0; i < engines.length; i++) {
    engines[i].classList.remove("highlight");
  }
  searchInput.value = input.innerHTML.substr(0, 2) + " ";
  input.classList.add("highlight");
  searchInputFocus();
}

function randomHex() {
  return randomColor = "#" + Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0");
}

function exploreMessage() {
  document.getElementById("explore").innerHTML = "EXPLORE " + webNames[Math.floor(Math.random() * webNames.length)];
}
