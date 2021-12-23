
const miModulo = (() => {

    'use strict'
    let deck         = [];
    const tipos      = ['C','D','H','S'],especiales = ['A','J','Q','K'];

    let puntosJugadores= [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
             btnNuevo   = document.querySelector('#btnNuevo');
             btnPedir.disabled= true;
             btnDetener.disabled=true;

    const divCartas= document.querySelectorAll('.divCartas');

    const puntosHTML = document.querySelectorAll('small');


    const inicializarJuego = (numJugadores=2) => {

       deck = crearDeck();
       puntosJugadores= [];
       for( let i=0 ; i < numJugadores; i++ ){
           puntosJugadores.push(0);
       }
        //reestablece los puntos de los 2 small recorrieendolo con un forEach 
       puntosHTML.forEach(elem => elem.innerText =0 );
       divCartas.forEach(elem => elem.innerHTML='');
       btnDetener.disabled=false;
       btnPedir.disabled=false;
       

    } 

    // Esta función crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo);
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                //agregar al final del arreglo
                deck.push( esp + tipo);
            }
        }
        //regresa arreglo aleatorio
        return _.shuffle( deck );
    }


    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        //elimina el ultimo valor del arreglo y lo guarda en carta
        return deck.pop();
    }

    // pedirCarta();
    const valorCarta = ( carta ) => {

        //obtiene el valor  de la posicion 0 hasta el antepenultimo de un string         
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    const acumalarPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    } 

    const crearCarta = (carta,turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartas[turno].append(imgCarta);
       // divCartasComputadora.append( imgCarta );

    }

    const determinarGnanador = () => {
        const [puntosMinimos,puntosComputadora]= puntosJugadores;
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 200 );
    }
    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora =0;
        do {
            //puntosComputadora = puntosComputadora + valorCarta( carta );
            //puntosHTML[1].innerText = puntosComputadora;
            
            // <img class="carta" src="assets/cartas/2C.png">
           // const imgCarta = document.createElement('img');
            //imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
            // agrega una clase al elemento
            //imgCarta.classList.add('carta');
            //agrega las cartas al final de un arreglo
            //divCartasComputadora.append( imgCarta );
            
            const carta = pedirCarta();
            puntosComputadora = acumalarPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );
        determinarGnanador();

    }



    
    btnPedir.addEventListener('click', () => {

        
        const carta = pedirCarta();
        const puntosJugador = acumalarPuntos(carta,0);
        crearCarta(carta,0);
    
        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });
  
})();



