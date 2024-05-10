   
function changePageTitle(title) {
    document.title = title
  }
  
  function generateInfoSection(src, pokemonName) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`
  
    const img = document.querySelector('img')
    img.src = src
    img.alt = `Imagem do pokemon ${pokemonName}`
  
    const section = document.querySelector('#info-pokemon')
  
    section.appendChild(h2)
    section.appendChild(img)
  }
  
  async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))
  
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
      const jsonData = await data.json()
  
      generateInfoSection(jsonData.sprites.front_default, name)
    } catch (error) {
      console.error(error)
    }
  }
  
  function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
      return
    }
  
    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)
  
    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')
  
    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
  })




