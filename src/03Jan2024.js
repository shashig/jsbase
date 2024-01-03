let data
let movies;
const personUrl = 'https://api.themoviedb.org/3/person/'
const apiKey = '';
const movieUrl = 'https://api.themoviedb.org/3/movie/';
const imageUrl = 'https://image.tmdb.org/t/p/original';

import('./moviesPlay.js')
	.then(res => {
		console.log('data imported into data constant');
		data = res;
    movies = data.hindiMovies;
  	run();
	});

  /*
    {
      movies: [{id: '', name: ''}, {}],
      actors: Map with key = actor id and value  {name: '', movies: [id1, id2,]},
      characters: Map with key = character name and value is an array [{movieId: '', actorId: ''}]}]
    }
    Rahul -> SRK - 3 
    Rahul -> Amir Khan - 1
  */


function run() {
  const searchInfo = {
    movies: [],
    actors: new Map(), 
    characters: new Map()
  }
  movies.forEach(movie => {
    searchInfo.movies.push({id: movie.tmdbId, name: movie.title});

    movie.cast.forEach(cm => {
      //Set actor info
      if (!searchInfo.actors.get(cm.id)) {
        searchInfo.actors.set(cm.id, {name: cm.name, movies: []})
      }
      searchInfo.actors.get(cm.id).movies.push(movie.tmdbId);

      //Set character info
      if (!searchInfo.characters.get(cm.character)) {
        searchInfo.characters.set(cm.character, []);
      }
      searchInfo.characters.get(cm.character).push({movieId: movie.tmdbId, actorId: cm.id});
    });
  })
  console.log(searchInfo);
  for (const [key, value] of searchInfo.characters) {
    if (value.length > 1) {
      console.log(key, value.length);
    }
  }
}