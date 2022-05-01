document.querySelector('#dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDarkMode = document.body.classList.contains('dark');
  localStorage.setItem('darkmode', isDarkMode);
  //change mobile status bar color
  document.querySelector('meta[name="theme-color"').setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff')
})

//Example fetch using pokemonapi.co
document.querySelector('.button-a').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.replaceAll('.', '').replaceAll(' ', '-')
  console.log(choice)

  const url = `https://pokeapi.co/api/v2/pokemon/${choice.toLowerCase()}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        //console.log(data.species.name,data.height,data.types,data.sprites.front_default)
        const pokeInfo = new Poke(data.species.name,data.height,data.weight,data.types,data.sprites.other["official-artwork"].front_default)
        pokeInfo.getTypes()
        
        document.querySelector('h2').innerText = pokeInfo.typeList
        // document.querySelector('h3').innerText = potentialPet.typeList
        document.querySelector('img').src = pokeInfo.image

      })
      .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('h2').innerText = `Pokemon not found. Please try again.`
      });
}

class Poke {
  constructor (name, height, weight, types, image) {
    this.name = name
    this.height = height
    this.types = types
    this.typeList = []
    this.image = image
    this.weight = weight
    this.housepet = true
    this.reason = []
  }

  getTypes() {
    for (const property of this.types) {
      this.typeList.push(property.type.name)
    }
  }
}
  


