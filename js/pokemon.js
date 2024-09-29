const selectedPokemon = JSON.parse(localStorage.getItem("selectedPokemon"));

if (selectedPokemon) {
    document.getElementById("pokemon-name").innerText = capitalizeFirstLetter(selectedPokemon.name);
    document.getElementById("pokemon-image").src = selectedPokemon.sprites.other["official-artwork"].front_default || selectedPokemon.sprites.front_default;
    document.getElementById("pokemon-type").innerText = `Type: ${selectedPokemon.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ')}`;
    document.getElementById("pokemon-hp").innerText = `HP: ${selectedPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}`;
    document.getElementById("pokemon-attacks").innerText = `Attacks: ${selectedPokemon.moves.slice(0, 3).map(move => capitalizeFirstLetter(move.move.name)).join(', ')}`;
    document.getElementById("pokemon-abilities").innerText = `Abilities: ${selectedPokemon.abilities.map(abilityInfo => capitalizeFirstLetter(abilityInfo.ability.name)).join(', ')}`;
} else {
    document.getElementById("pokemon-name").innerText = "Unknown Pokemon";
}

document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "main.html";
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}