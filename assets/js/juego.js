/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */
let deck = [];
const tipos = ['C','D','H','S']; // almacena los tipos de carta
const especiales = ['A','J','Q','K']; // almacena la cartas j,q,k 

const crearDeck = ()=>{
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i+tipo);
        }
    }
    for (const especial of especiales) {
        for (const tipo of tipos) {
            deck.push(especial+tipo);
        }
    }
    console.log(deck);
    deck=_.shuffle(deck);
    console.log(deck);
}
crearDeck();
