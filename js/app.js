const API_URL = "https://pokeapi.co/api/v2/pokemon/";

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getPokemons(url) {
	const randomNumber = getRandomInteger(1, 1000);
	try {
		const response = await fetch(`${url}${randomNumber}`, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`);
		}
		const response_data = await response.json();
		console.log(response_data)
		showPokemon(response_data);
	} catch (error) {
		console.error("Ошибка при получении данных:", error);
		showPokemon(null);
	}
}

getPokemons(API_URL);

function showPokemon(data) {
	const pokeballContainer = document.querySelector(".pokeball-container");
	const pokemonInfo = document.querySelector(".pokemon-info");
	const pokemonNameElement = document.getElementById("pokemon-name");

	if (data) {
		pokeballContainer.innerHTML = `
            <img src="top-lid.png" class="pokeball-top">
            <img src="bottom-lid.png" class="pokeball-bottom">
            <img src="${data.sprites.front_default}" class="pokemon-image clickable">
        `;
		pokemonInfo.innerHTML = `
            <h2 id="pokemon-name" class="clickable">${capitalizeFirstLetter(data.name)}</h2>
            <p>Type: ${data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ')}</p>
        `;

		const pokemonImageElement = document.querySelector(".pokemon-image");
		pokemonImageElement.addEventListener('click', () => {
			localStorage.setItem("selectedPokemon", JSON.stringify(data));
			window.location.href = "pokemon.html";
		});
	} else {
		pokeballContainer.innerHTML = `
            <img src="../top-lid.png" class="pokeball-top">
            <img src="../bottom-lid.png" class="pokeball-bottom">
            <p>Не удалось загрузить покемона</p>
        `;
		pokemonInfo.innerHTML = `
            <h2>Unknown</h2>
        `;
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}