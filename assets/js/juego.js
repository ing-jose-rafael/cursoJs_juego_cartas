const miModulo = (()=>{
    'use strict'

    /**
     * 2C = Two of Clubs (Tréboles)
     * 2D = Two of Diamonds (Diamantes)
     * 2H = Two of Hearts (Corazones)
     * 2S = Two of Spades (Espadas)
     */
    let deck = [];
    const tipos = ['C','D','H','S'], // almacena los tipos de carta
          especiales = ['A','J','Q','K']; // almacena la cartas j,q,k 
    
    let puntosJugadores = [];
    
    // Referencia HTML
    const btnPedir = document.querySelector('#btnPedir'), // para obtener el evento click
        btnDetener = document.querySelector('#btnDetener'), // para obtener el evento click
        btnReiniciar = document.querySelector('#btnReiniciar'); // para obtener el evento click
    
    const puntosHtml = document.querySelectorAll('small'), // para poder mostar los puntos acumulados jugador y computadora
         divCartaJugadores = document.querySelectorAll('.cartaImg'); // para agregar la carta
        //  divCartaComputadora = document.querySelector('#computadora-carta'); // para agregar la carta
    
     
    const inicializarJuego = (numeroJugadores=2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
        }
        btnPedir.disabled=false;
        btnDetener.disabled=false;
    
        puntosHtml.forEach(elem => elem.innerText=0);
        
    
        // borrando las imagenes de las cartas
        divCartaJugadores.forEach(elem => elem.innerHTML ='' );
        // divCartaComputadora.innerHTML='';    
    
    }     
    
    // funcion para crear una varaja
    const crearDeck = ()=>{
        deck = [];
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
        return _.shuffle(deck); // varajear el deck
        // console.log(deck);
    }
    
    
    // funcion para tomar una carta, elinima la ultima carta del arreglo y la retorna
    const pedirCarta = ()=>{
        if (deck.length === 0 ) {
            throw'No hay cartas en el deck';
        }
        return deck.pop();
    }
    
    // funcion para retornar el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0,carta.length-1); // se queda con el valor numerico de la carta
        // evaluamos si es un numero
        return (isNaN(valor)) ?
        (valor==='A') ? 11:10 // J,K,Q, valen 10; A vale 11
        :valor * 1;
    
    }
    // turno 0 = primer jugador y el ultimo sera la pc
    /**
     * 
     * @param {*} carta requiere la carta para saber su valor
     * @param {*} turno el turno del jugador para acumularle sus puntos
     */
    const acumularPuntos = (carta,turno)=>{
        puntosJugadores[turno] += valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const determinarGanador = ()=>{
        // como son solo dos jugadores en el arreglo vamos hacer una desestructuracion
        const [puntosMinimos, puntosComputer ] = puntosJugadores;
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
    }

    const dibujarcarta =(carta,turno)=>{
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartaJugadores[turno].append(imgCarta);
    }

    /**
     * la computadoraa tiene que minimo igualar los puntos del jugadpr
     */
    // Turno de la computadora,
    const turnoComputadora = (puntosMinimos)=>{
        let puntosComputer = 0;
        do {
            const carta = pedirCarta();
            // como son los puntos del pc y el pc es el ultimo del arreglo
            puntosComputer = acumularPuntos(carta,puntosJugadores.length-1);
            //dibujando la carta
            dibujarcarta(carta,puntosJugadores.length-1);
    
            if((puntosMinimos>21)|| (puntosComputer===21)){
                break;
            }
    
        } while ((puntosComputer < puntosMinimos) && (puntosMinimos<=21));
           
        determinarGanador();
    }
    
    // Eventos
    btnPedir.addEventListener('click',()=>{
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta,0);
        //dibujando la carta
        dibujarcarta(carta,0);
    
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
        turnoComputadora(puntosJugadores[0]);
    });
    
    // btnReiniciar.addEventListener('click',()=>{
        
    //     inicializarJuego();
    
    // });
    
    // exportando una funsion
    return {
        nuevoJuego: inicializarJuego
    }
 
})();
