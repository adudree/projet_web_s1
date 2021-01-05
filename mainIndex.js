function Message() {
alert("You have a new message.");
const sos = document.querySelector('#SOS');
sos.classList.toggle('visible');
sos.classList.toggle('invisible');
}

setTimeout(Message, 1000);
