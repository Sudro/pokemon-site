const API_URL = "https://pokeapi.co/api/v2/pokemon/";

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getPokemons(url) {
	const randomNumber = getRandomInteger(1, 1000);
	const response = await fetch(`${url}${randomNumber}`, {
		headers: {
			"Content-Type": "application/json"
		}
	});
	const response_data = await response.json();
	console.log(response_data)
	showPokemon(response_data);
}

getPokemons(API_URL);

function showPokemon(data) {
	const pokemonElement = document.querySelector(".pokeball-container");
	pokemonElement.innerHTML = `
		<img src="top-lid.png" class="pokeball-top">
      	<img src="bottom-lid.png" class="pokeball-bottom">
		<img src="${data.sprites.front_default}" class="pokemon-image">
	`;
}




