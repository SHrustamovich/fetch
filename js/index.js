const elLoader = document.querySelector(".js-loader");
const elFilmsList = document.querySelector(".js-films-list");
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");
const searchButton = document.querySelector(".searchButton")
const Input = document.getElementById('elInput')

let page = 1;
elLoader.style.display = "none";

function elSearch(event){
  event=preventDefault();
  let movies = Input.value.trim();
  getData(movies,page)
}

searchButton.addEventListener('submit',elSearch)

  
  function getData(movies,page) {
    fetch(`https://www.omdbapi.com/?apikey=d83224c7&s=${movies}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
  
        if (page <= 1) {
          elPrev.disabled = true;
        }
        if (page > 1) {
          elPrev.disabled = false;
        }
        if (page == Math.ceil(data.totalResults / 10)) {
          elNext.disabled = true;
        }
        if (page < Math.ceil(data.totalResults / 10)) {
          elNext.disabled = false;
        }
  
        elLoader.style.display = "none";
        turnFilms(data.Search);
      });
  
    function turnFilms(array) {
      elFilmsList.innerHTML = "";
      array.forEach((element) => {
        renderFilms(element);
      });
    }
  }
  
  function renderFilms(object) {
    const newLi = document.createElement("li");
    newLi.setAttribute("class","list-group-item")
    newLi.textContent = object.Title;
    elFilmsList.appendChild(newLi);
      
  }
  
  function nextPage() {
    page = page + 1;
  
    elPrev.disabled = false;
    elFilmsList.innerHTML = "";
    elLoader.style.display = "block";
    let movies = Input.value.trim();
    getData(movies,page);
  }
  elNext.addEventListener("click", nextPage);
  
  function prevPage() {
    page = page - 1;
  
    elFilmsList.innerHTML = "";
    elLoader.style.display = "block";
    let movies = Input.value.trim();
    getData(movies,page);
  }
  elPrev.addEventListener("click", prevPage);
  
  getData(movies,page);
  
