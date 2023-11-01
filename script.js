const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 809
const colors = {
    fire: '#ff7953',
    grass: '#DEFDE0',
    electric: '#feff73',
    water: '#72d2ff',
    ground: '#d3c08d',
    rock: '#c58960',
    fairy: '#fceaff',
    poison: '#b588ca',
    bug: '#eaeda1',
    dragon: '#97b3e6',
    psychic: '#ffaee4',
    flying: '#d2d6ff',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    steel: '#bebebe',
    ice: '#DEF3FD',
    dark: '#636363',
    ghost: '#735e97'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async() => {
    for (let i = 1; i <= pokemonCount; i++){
        await getPokemons(i)
    }
}


const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
        </div>
        `

        card.innerHTML = pokemonInnerHTML 

        pokeContainer.appendChild(card)
}

fetchPokemons()