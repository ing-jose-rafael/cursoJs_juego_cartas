/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */
let deck = [];
const tipos = ['C','D','H','S']; // almacena los tipos de carta
const especiales = ['A','J','Q','K']; // almacena la cartas j,q,k 

let puntosJugador  = 0, 
    puntosComputer = 0;


// Referencia HTML
const btnPedir = document.querySelector('#btnPedir'); // para obtener el evento click
const btnDetener = document.querySelector('#btnDetener'); // para obtener el evento click
const btnReiniciar = document.querySelector('#btnReiniciar'); // para obtener el evento click

const puntosHtml = document.querySelectorAll('small'); // para poder mostar los puntos acumulados jugador y computadora
const divCartaJugador = document.querySelector('#jugardor-carta'); // para agregar la carta
const divCartaComputadora = document.querySelector('#computadora-carta'); // para agregar la carta


// funcion para crear una varaja
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
    deck=_.shuffle(deck); // varajear el deck
    // console.log(deck);
}
crearDeck();

// funcion para tomar una carta
const pedirCarta = ()=>{
    if (deck.length===0) {
        throw'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

// console.log(pedirCarta());
const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);
    // evaluamos si es un numero
    return (isNaN(valor)) ?
    (valor==='A') ? 11:10 // J,K,Q, valen 10; A vale 11
    :valor * 1;

}
// console.log(valorCarta(pedirCarta()));
/**
 * la computadoraa tiene que minimo igualar los puntos del jugadpr
 */
// Turno de la computadora,
const turnoComputadora = (puntosMinimos)=>{
    do {
        const carta = pedirCarta();
    
        puntosComputer += valorCarta(carta);
        puntosHtml[1].innerText = puntosComputer;

        //dibujando la carta
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartaComputadora.append(imgCarta);

        if((puntosMinimos>21)|| (puntosComputer===21)){
            break;
        }

    } while ((puntosComputer < puntosMinimos) && (puntosMinimos<=21));
    // if((puntosMinimos>21)|| (puntosComputer===21)){
     setTimeout(() => {
         if (puntosComputer === puntosMinimos) {
             alert('Nadien gana');
            }else if (puntosMinimos>21) {
             alert('Computadora gana');
             
            } else if(puntosComputer>21){
             alert('Jugador gana');
             
         }else{
            alert('Computadora gana');
         }
     }, 150);   
    
    // }else if(puntosMinimos>puntosComputer){
        // alert('Ganaste');

    // }
}

// Eventos
btnPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    
    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    //dibujando la carta
    const imgCarta = document.createElement('img');
    imgCarta.src=`assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartaJugador.append(imgCarta);

    //controlar los puntos
    if(puntosJugador > 21){
        console.warn('lo siento perdiste!!!');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador===21){
        console.warn('ganaste!!!');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    // llamamos el turno de la pc
    turnoComputadora(puntosJugador);
});

btnReiniciar.addEventListener('click',()=>{
    deck = [];
    crearDeck();

    btnPedir.disabled=false;
    btnDetener.disabled=false;

    puntosHtml[0].innerText=0;
    puntosHtml[1].innerText=0;

    // borrando las imagenes de las cartas
    divCartaJugador.innerHTML='';
    divCartaComputadora.innerHTML='';    

    puntosJugador  = 0; 
    puntosComputer = 0;
    

});
// turnoComputadora(21);
