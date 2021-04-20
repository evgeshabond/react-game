const generateDeck = (number) => {
    let Cards = [];
    for (let i = 0; i < number; i++) {
        let random = null;
        do {
            random = Math.floor(Math.random() * number)           
        }
        while (Cards.includes(random))
        Cards.push(random)
    }
    Cards = Cards.map(el => Math.floor(el/2))
    return Cards
  }

export default generateDeck