/*-----DOM MANIPULATION START-----*/
const pokemonName = document.querySelector('.pokemon-name');

const pokemonNumber = document.querySelector('.pokemon-number');

const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');

const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
/*-----DOM MANIPULATION END-----*/

/*-----SET A POKEMON AS DEFAULT START-----*/
let searchPokemon = 1;
/*-----SET A POKEMON AS DEFAULT END-----*/

/*-----API FETCH DATA START-----*/
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data
    }
}
/*-----API FETCH DATA END-----*/

/*-----RENDER POKEMON IN SCREEN START-----*/
const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    input.value = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }

    
};
/*-----RENDER POKEMON IN SCREEN END-----*/

/*-----SEARCH BAR FUNCTIONAL START-----*/
form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
/*-----SEARCH BAR FUNCTIONAL END-----*/

/*-----BUTTONS FUNCTIONAL START-----*/
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
/*-----BUTTONS FUNCTIONAL END-----*/

/*-----CALL A POKEMON AS DEFAULT-----*/
renderPokemon(searchPokemon);