const webNames = ["THE CLOUD", "THE WEB", "THE INTERNET", "THE WIRED", "THE GRID", "THE METAVERSE", "THE NEXUS", "THE NET"];
const defaultWallpaperURL = "https://giffiles.alphacoders.com/215/215982.gif";
const defaultAccentHex = "#F0275E";
const engines = document.getElementById("searchEngines").getElementsByTagName("span");
const r = document.querySelector(":root");
var autoFocus = true;

function init() {
  if (localStorage.getItem("wallpaper") == null)
    setWallpaper(defaultWallpaperURL);
  else
    setWallpaper(localStorage.getItem("wallpaper"));
  if (localStorage.getItem("accent") == null)
    setAccentColor(defaultAccentHex);
  else
    setAccentColor(localStorage.getItem("accent"));
  showBookmarks();
  exploreMessage();
  window.onkeydown = searchInputFocus;
}

//wallpaper array option
function setWallpaper(input) {
  inputArray = input.split(",");
  wall = inputArray[Math.floor(Math.random() * inputArray.length)];
  document.body.style.backgroundImage = "url(" + wall + ")";
  localStorage.setItem("wallpaper", input);
  document.getElementById("wallpaperURL").value = input;
}

function setAccentColor(input) {
  accentPicker = document.getElementById("accentPicker");
  accentPicker.value = input;
  r.style.setProperty("--accent", input);
  localStorage.setItem("accent", input);
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

function addNote() {
  let newNoteHTML =`
         <header class="noteTitle" onclick="collapseNote(this)">New Note</header>
          <main style="display:block">
            <textarea class="noteContent" spellcheck="false"></textarea>
            <button class="noteDelete">✕</button>
          </main>`;
  noteList.insertAdjacentHTML('beforeend', newNoteHTML);
}

function collapseNote(t) {
  var content = t.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

function renderBookmark(pos, name, link) {
  let newBookmarkHTML = `<a href="${link}" draggable="false">${name}</a>`;
  let newBookmark = document.createElement("div");
  newBookmark.classList.add("die");
  newBookmark.innerHTML = newBookmarkHTML;
  diceTray.replaceChild(newBookmark, diceTray.children[pos-1]);
}

function changeBookmark(input) {
  if (event.key === "Enter") {
    let ia = input.value.split("|");
    renderBookmark(ia[0], ia[1], ia[2]);
    localStorage.setItem("bookmark" + ia[0], ia[1] + "|" + ia[2]);
  }
}

function showBookmarks() {
  for (i = 1; i <= 6; i++) {
    let bookmark = localStorage.getItem("bookmark" + i);
    if (bookmark != null) {
      x = bookmark.split("|");
      renderBookmark(i, x[0], x[1]);
    }
  }
}

String.prototype.replaceChars = function (character, replacement) {
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

searchbox.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    if (searchbox.value === "") {
      searchbox.placeholder = "type something...";
    } else {
      search(this.value);
      searchbox.value = "";
      removeHighlight();
      document.activeElement.blur();
    }
  }
});

function searchInputFocus() {
  if (autoFocus)
    searchbox.focus();
}

function highlightSearchEngine() {
  var text = searchbox.value;
  switch (text.substr(0, 2)) {
    case "-y":
      engines[0].classList.add("highlight");
      break;
    case "-w":
      engines[1].classList.add("highlight");
      break;
    case "-j":
      engines[2].classList.add("highlight");
      break;
    default:
      removeHighlight();
  }
}

function selectSearchEngine(input) {
  removeHighlight();
  searchbox.value = input.innerHTML.substr(0, 2) + " ";
  input.classList.add("highlight");
  searchInputFocus();
}

function removeHighlight() {
  for (i = 0; i < engines.length; i++) {
    engines[i].classList.remove("highlight");
  }
}

function randomHex() {
  return randomColor = "#" + Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0");
}

function exploreMessage() {
  document.getElementById("explore").innerHTML = "EXPLORE " + webNames[Math.floor(Math.random() * webNames.length)];
}
