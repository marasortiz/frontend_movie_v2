const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=38e50b5ae84be096c5cb71384a4e9c78&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=38e50b5ae84be096c5cb71384a4e9c78&query="

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


returnMovies(APILINK)

function returnMovies(url){
	fetch(url).then(res => res.json())
		.then(function(data){
		console.log(data.results);
			
		data.results.forEach(element => {
			
			const div_col = document.createElement('div');
			div_col.setAttribute('class', 'col');

			const div_card = document.createElement('div');
			div_card.setAttribute('class', 'card bg-dark text-white');

			const image = document.createElement('img');
			image.setAttribute('id', 'image');
			image.setAttribute('class', 'card-img-top');

			const div_card_body = document.createElement('div');
			div_card_body.setAttribute('class', 'card-body');

			const title = document.createElement('h4');
			title.setAttribute('id', 'title');
			image.setAttribute('class', 'card-title text-center');
			
			title.innerHTML = `${element.title}
				<br>
				<a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;
			image.src = IMG_PATH + element.poster_path;
			

			div_card_body.appendChild(title);
			div_card.appendChild(image);
			div_card.appendChild(div_card_body);
			div_col.appendChild(div_card);
			
			main.appendChild(div_col);		
			
		});
	});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	main.innerHTML = ''

	const searchItem = search.value;

	if(searchItem){
		returnMovies(SEARCHAPI + searchItem);
		search.value = " ";
	}
});