const downloadButtons = document.querySelectorAll('.download-button');

downloadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const imageUrl = button.previousElementSibling.src;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop();
    link.click();
  });
});

function search() {
  // Get the search query from the input field
  var query = document.getElementById("searchBar").value.toLowerCase();

  // Loop through all the items to show or hide them based on the query
  var items = document.querySelectorAll(".button-container > div");
  for (var i = 0; i < items.length; i++) {
          var itemId = items[i].getAttribute("id").toLowerCase();
      if (itemId.indexOf(query) !== -1) {
          items[i].style.display = "block";
      } else {
          items[i].style.display = "none";
      }
  }
}

document.getElementById("searchBar").addEventListener("input", search);

//mouse over buttons - START

// Get all the images with class "button-container img"
const images = document.querySelectorAll(".button-container img");

// Iterate over all the images and attach event listeners to them
images.forEach(function(image) {
// store the original image path in a variable
const originalImagePath = image.getAttribute("src");
const newImagePath = image.getAttribute("var");

// add event listeners for mouseover and mouseout
image.addEventListener("mouseover", function() {
  // change the image path to the new image on mouseover
  image.setAttribute("src", newImagePath);
});

image.addEventListener("mouseout", function() {
  // change the image path back to the original image on mouseout
  image.setAttribute("src", originalImagePath);
});
});

//mouse over buttons - END

// Type images you'd like to see

var count;
var allIds = [];
var recognized = false;

function ListenUser() {
  // Get the search query from the input field
  var allQuery = document.getElementById("searchBar2").value.toLowerCase().replaceAll(" ", "");
  var query = allQuery.substring(count, allQuery.length);;
  var queryIds = [null, null]; // array to store the ids that match the query
  // Create an empty array to store all the matching ids

// Loop through all the items and add their ids to the allIds array
var items = document.querySelectorAll(".button-container > div");
items.forEach(e => {
  if (query.includes(e.id) ) {
    allIds.push(e.id);
    recognized = true;
    count = allQuery.length;
  }
});

if(count >= allQuery.length)
{
    count = allQuery.length;
}

console.log(allIds);
console.log(query);

items.forEach(e => {
  if (query.includes(e.id)) {
    if (queryIds[0] === null) {
      queryIds[0] = allIds[allIds.length - 1];
      queryIds[1] = allIds[allIds.length - 2];
    }
  }
});

if(recognized){
  // Display the images based on the matching ids
  if (allIds.length > 0) {
    const img = document.querySelector(`#${queryIds[0]} img`)
    document.getElementById("img-displayed").style.removeProperty("display");
    document.getElementById("img-displayed").src = img.getAttribute("var");
    recognized = false;
  } else {
    document.getElementById("img-displayed").style.display = "none";
  }

  if (allIds.length > 1) {
    const img2 = document.querySelector(`#${queryIds[1]} img`)
    document.getElementById("img-displayed2").style.removeProperty("display");
    document.getElementById("img-displayed2").src = img2.getAttribute("var");
  } else {
    document.getElementById("img-displayed2").style.display = "none";
  }
}

  }
document.getElementById("searchBar2").addEventListener("input", ListenUser);

//Button to change page

function GenerateScribbles(){
  if(document.getElementById("AllItems").style.display == "none")
  {
      document.getElementById("AllItems").style.removeProperty("display");
      document.getElementById("searchBarContainer").style.removeProperty("display");
      document.getElementById("searchBarContainer2").style.display = "none"
      document.getElementById("AnimScrCont").style.display = "none"
      document.getElementById("img-displayed").style.display = "none"
      document.getElementById("searchBar2").value = ""
      document.getElementById("ChangeSite").textContent = "Bring your stories to life";
  }else
  {
      document.getElementById("AnimScrCont").style.removeProperty("display");
      document.getElementById("AllItems").style.display = "none"
      document.getElementById("searchBarContainer").style.display = "none"
      document.getElementById("ChangeSite").textContent = "Items Library";
      document.getElementById("searchBarContainer2").style.removeProperty("display");
  }
  
}

document.getElementById("ChangeSite").addEventListener("click", GenerateScribbles);

//Audio Recognition

const recognition = new window.webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;


const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultDiv = document.getElementById('searchBar2');

startBtn.addEventListener('click', () => {
if (!recognition.isRecording) {
recognition.start();
startBtn.disabled = true;
stopBtn.disabled = false;
}
});

stopBtn.addEventListener('click', () => {
recognition.stop();
startBtn.disabled = false;
stopBtn.disabled = true;
});

recognition.onresult = event => {
const transcript = Array.from(event.results)
  .map(result => result[0].transcript)
  .join('');
resultDiv.value = transcript;
ListenUser();
};

recognition.onend = () => {
startBtn.disabled = false;
stopBtn.disabled = true;
};