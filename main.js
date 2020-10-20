//si hay informacion de reserva guardada en session storage va a mostrarla en consola
if (sessionStorage.reservations) {
    var retrieveStorageData = JSON.parse(sessionStorage.reservations)
    console.log(retrieveStorageData);
} else (console.log('no reservation data in storage'))
//variables***************************************
const formInputs = document.querySelectorAll('.formInput'); //devuelve un nodelist
const formInputs2 = document.getElementsByClassName('formInput'); //devuelve un html collection
const reservationDiv = document.getElementById('reservationInfo')
const NAME = document.getElementById('firstName');

let reservationId = 0;
let objReservation;
let reservationsJSON;
let reservationsArray = [];

//constructor de clase

class reservation {
    constructor (reservationId, firstName, lastName, email, checkInDate, checkOutDate, room, guests) {
        this.reservationId = reservationId,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.checkInDate = checkInDate,
        this.checkOutDate = checkOutDate,
        this.room = room,
        this.guests = guests
        this.price = reservationCost();

    }
}
// reservation1 = new reservation (10, 'ema', 'calle', 'emacalle@hotmail.com', 'jueves', 'viernes', 'blue-room', '2 guests');

//eventListeners***************************************
$('#email').blur(emailValidate);
$('#sendButton').click(renderInfo);
//eventListener para caputurar ENTER en input: name
// $('firstName').keydown(eventLog);
//captura el evento cuando se presiona enter en el input: name
function eventLog(event) {
    console.log(event);
    if (event.keyCode == 13) {
        console.log('presiono ENTER');
    };
};

//functions********************************************
//construir un objeto a partir de los datos del formulario
// function newReservation (reservationId, firstName, lastName, email, checkInDate, checkOutDate, room, guests) {
//     objReservation = new reservation (reservationId, firstName, lastName, email, checkInDate, checkOutDate, room, guests);
// }
function renderInfo(event) {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let checkIn = document.getElementById('checkIn').value;
    let checkOut = document.getElementById('checkOut').value;
    let room = document.getElementById('room').value;
    let guests = parseInt(document.getElementById('guests').value);
    let nights = parseInt(document.getElementById('nights').value);
    removeAllChildNodes(reservationDiv)
    for (input of formInputs) {
        renderFormInput(input);
    };
    reservationCost();
    renderPrice(reservationCost());

    objReservation = new reservation (reservationId, firstName, lastName, email, checkIn, checkOut, room, guests);
    // newReservation(reservationId, firstName, lastName, email, checkIn, checkOut, room, guests);
    // //muestra cual evento se esta disparando
    // console.log(event);
    // //muestra desde donde se disparo el evento
    // console.log(event.target);
    reservationId += 1;
    reservationsJSON = JSON.stringify(objReservation);
    sessionStorage.setItem('reservations', reservationsJSON);
    // reservationsArray.push(objReservation);
};
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
    }
}
function renderFormInput(inputField) {
    let item  = document.createElement('p');
    item.textContent = inputField.value;
    reservationDiv.appendChild(item);
}
function renderPrice(price) {
    // const ITEM = document.createElement('p');
    // ITEM.textContent = `Costo de la estadía USD${price}`;
    // reservationDiv.appendChild(ITEM);


    //Parece que no funcionan los string literals con Jquery
    $('#reservationInfo').append(`<p> Costo de la estadía USD${price} </p>`);
}
function emailValidate() {
    console.log(event);
    let email = document.getElementById('email').value;
    let lowerCased = email.toLowerCase();
    let trimmed = lowerCased.trim();
    if (trimmed == '') {
        alert ('debe introducir una direccion de email')
        } else if (trimmed.indexOf('@') == -1 || trimmed.indexOf('.') == -1) {
        alert (`'${trimmed}' no es un email valido`);
} else (console.log(`'${trimmed}' es un email valido`));
}
// cuando se modifica algun dato (nights, guests o room)esta dando el valor de la reserva anterior, te obliga a hacer refresh 2 veces. revisar
function reservationCost() {
    
    let room  = $('#room').val(); // let room = document.getElementById('room').value;
    let guests = parseInt(document.getElementById('guests').value);
    let nights = parseInt(document.getElementById('nights').value);
    let price = 0;
    let rate = 0;
    if (room === 'blue-room') {
        if (guests === 2) {
            rate = 25;
            price = rate * nights;
            return price;
        } else if (guests === 1) {
            rate = 20;
            price = rate * nights;
            return price;
        }
    } else if (room === 'green-room') {
        if (guests === 2) {
            rate = 23;
            price = rate * nights;
            return price;
        } else if (guests === 1) {
            rate = 17;
            price = rate * nights;
            return price;
        };
    };
};

$(window).on('load', () => console.log('jquery works'));

