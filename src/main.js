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
    const res =  await fetch('https://api.themoviedb.org/3//trending/movie/day?api_key='+API_KEY)
    const data = await res.json();
    const movies = data.results;
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+ movie.poster_path)
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
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
        //creamor un contenedor para las categorias
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
