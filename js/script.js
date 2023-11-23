document.addEventListener("DOMContentLoaded", function () {
  const fetchJokeButton = document.getElementById("fetchJoke");
  const jokeList = document.getElementById("jokeList");
  const recentJokeContainer = document.getElementById("recentJoke");
  const savedJokes = JSON.parse(localStorage.getItem("savedJokes"));

  //Para cargar en la pagina los chistes guardados 
   function renderSavedJokes() {
    jokeList.innerHTML = "";
    savedJokes.forEach((joke, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="joke-container">
          <p>${joke}</p>
          <button class="deleteButton" data-index="${index}">Delete</button>
        </div>
      `;
      jokeList.appendChild(listItem);
    });
        
    //Para mostrar aparte el último chiste generado
     recentJokeContainer.innerHTML = "";
      if (savedJokes.length > 0) {
       const recentJokeItem = document.createElement("div");
       recentJokeItem.textContent = savedJokes[0];
       recentJokeContainer.appendChild(recentJokeItem);
       }
    //Para añadir boton de eliminar cada chiste 
      document.querySelectorAll(".deleteButton").forEach(button => {
      button.addEventListener("click", function () {
        const indexToDelete = parseInt(button.getAttribute("data-index"));
        savedJokes.splice(indexToDelete, 1);
        localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
        renderSavedJokes();
      });
    });
  }

  //Para generar un chiste nuevo 
  fetchJokeButton.addEventListener("click", function () {
      
    fetch("https://api.chucknorris.io/jokes/random")
    .then(response => response.json())
    .then(data => {

      //añadirlo al localStorage  
      savedJokes.unshift(data.value);
      localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
      //funcion que carga los chistes en el DOM
        renderSavedJokes();
        })
      .catch(error => {
          console.error("Error fetching Chuck Norris joke:", error);
      });
  });
  
    //Para borrar los chistes guardados 
    document.getElementById("deleteJokes").addEventListener("click", function () {
      localStorage.removeItem("savedJokes");
      savedJokes.length = 0; 
      renderSavedJokes();
    });
  
   
    renderSavedJokes();
});


