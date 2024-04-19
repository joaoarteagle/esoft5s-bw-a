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

//atividade do visitas e time

  // Função para atualizar os dados de visita
  function updateVisitData() {
    let visitData = JSON.parse(localStorage.getItem('visitData')) || { count: 0, lastVisit: null };
    visitData.count++;
    visitData.lastVisit = new Date();

    localStorage.setItem('visitData', JSON.stringify(visitData));
    return visitData;
  }

  // Função para formatar a data
  function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Função para exibir os dados de visita no footer
  function displayVisitData() {
    let visitData = updateVisitData();
    let formattedDate = formatDate(new Date(visitData.lastVisit));
    let visitsText = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${formattedDate}.`;

    document.querySelector('#visits').textContent = visitsText;
  }

  // Chamando a função para exibir os dados ao carregar a página
  displayVisitData();