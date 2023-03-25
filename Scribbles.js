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

function ListenUser() {
  // Get the search query from the input field
  var query = document.getElementById("searchBar2").value.toLowerCase().replaceAll(" ", "");
  var query1;
  var query2;

  // Loop through all the items to show or hide them based on the query
  var items = document.querySelectorAll(".button-container > div");
  items.forEach(e => {
      if (query.includes(e.id)) {
          query2 = query1; // update query2 with the previous value of query1
          query1 = e.id; // update query1 with the current id
      }
  });

  if (!query1) {
      return;
  }

  const img = document.querySelector(`#${query1} img`)
  const img2 = document.querySelector(`#${query2} img`)

  if (img) {
      document.getElementById("img-displayed").style.removeProperty("display");
      document.getElementById("img-displayed").src = img.getAttribute("var");
  } else {
      document.getElementById("img-displayed").style.display = "none";
  }

  if (img2) {
      document.getElementById("img-displayed2").style.removeProperty("display");
      document.getElementById("img-displayed2").src = img2.getAttribute("var");
  } else {
      document.getElementById("img-displayed2").style.display = "none";
  }
  }
document.getElementById("searchBar2").addEventListener("input", ListenUser);


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