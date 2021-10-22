const elLoader = document.querySelector(".js-loader");
const elFilmsList = document.querySelector(".js-films-list");
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");
const searchButton = document.querySelector(".searchButton")
const Input = document.getElementById('elInput')

searchButton.addEventListener('click',function(event){
  let page = 1;
  function getData(page) {
    fetch(`http://www.omdbapi.com/?apikey=d83224c7&s=${Input.value}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.totalResults);
  
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
      array.forEach((element) => {
        renderFilms(element);
      });
    }
  }
  
  function renderFilms(object) {
    const newLi = document.createElement("li");
    newLi.classList.add('list-group-item')
    newLi.textContent = object.Title;
  
    elFilmsList.appendChild(newLi);
  }
  
  function nextPage() {
    page = page + 1;
  
    elPrev.disabled = false;
    elFilmsList.innerHTML = "";
    elLoader.style.display = "block";
    getData(page);
  }
  elNext.addEventListener("click", nextPage);
  
  function prevPage() {
    page = page - 1;
  
    elFilmsList.innerHTML = "";
    elLoader.style.display = "block";
    getData(page);
  }
  elPrev.addEventListener("click", prevPage);
  
  getData(page);
  
})
