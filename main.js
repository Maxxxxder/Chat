

var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', sendUserMessage);
getMessagesFromServer();

async function getMessagesFromServer() {
    var response = await fetch ('https://fchatiavi.herokuapp.com/get/neon/?offset=0&limit=1000000');


    response = await response.json();
    var allMessagesHTML = '';
    for (var i = 0; i < response.length; i++) {
      var messageData = response[i];

      var message = `
      <div class="message">
        <div class="message-nick"> ${messageData.Name} </div>
        <div class="message-text"> ${messageData.Message} </div>
      </div>
      `;
      allMessagesHTML = allMessagesHTML + message;
    };



    messages.innerHTML = allMessagesHTML;
}

async function sendUserMessage() {
  debugger;
  var userNick = document.getElementById('nick-input').value;
  var userMessage = document.getElementById('message-input').value;
  console.log(userNick);

  if (userNick.length === 0) {
    alert("Ты должен ввести имя!");
    return;
  }

  if (userMessage.length === 0) {
    alert("Ты должен ввести сообщение !");
    return;
  }

  await fetch ('https://fchatiavi.herokuapp.com/send/neon/', {
    method: 'POST',
    body: JSON.stringify({
      Name: userNick,
      Message: userMessage
    })
  });

  getMessagesFromServer();
};

  getMessagesFromServer();

  start();
  function start() {
    setInterval(getMessagesFromServer, 2000);
  }
