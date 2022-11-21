// lista de peliculas más vistas

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY,
    }
});


async function getTrendingMoviesPreview(){
    const res =  await fetch('https://api.themoviedb.org/3//trending/movie/day?api_key='+API_KEY);
    const data = await res.json();
    const movies = data.results;
    console.log(data);
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        const button = document.createElement('button');
        button.classList.add('trendingPreview-btn');
        button.setAttribute("id","buton"); 
        button.textContent="Añadir a mis favoritos";
        movieImg.setAttribute('alt', movie.title);
        datos = movie.original_language;
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(button);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
        datos2 =movie.popularity;
        datos3 = movie.vote_average;
        datos4 = movie.vote_count; 
        datos5 = movie.title;   
        dato6= movie.adult;
    });
    console.log(datos2);
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [datos5,'totalvotos'],
            datasets: [{
              label: 'Popularidad de las peliculas en nuestro sitio web',
              data: [datos2, datos4],
              borderWidth: 5
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

}



async function getCategoriesPreview(){
    //almacenamos en una variable la url de la api que vamos a consumir
    const {data} =  await api('genre/movie/list')
    //alamcenamos en una constante categorias la información que se trae
    const categories = data.genres;
    //recorremos el array
    categories.forEach(category => {
        const PreviewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        //creamos un contenedor para las categorias
        const CategoryContainer = document.createElement('div');
        //le añadimos a la categoria la clase de la lista
        CategoryContainer.classList.add('category-container');
        //creamos un titulo 
        const CategoryTitle = document.createElement('h3');
        //le añadimos la clase de ese titulo
        CategoryTitle.classList.add('category-title');
        //le añadimos un atributo, en este caso la id
        CategoryTitle.setAttribute('id', 'id'+category.id);
        // creamos un texto cuando vayamos iterando
        const categoryTitleText = document.createTextNode(category.name);
        // agregamos el texto
        CategoryTitle.appendChild(categoryTitleText);
        CategoryContainer.appendChild(CategoryTitle);
        PreviewCategoriesContainer.appendChild(CategoryContainer);
    });

}

//corremos la función
