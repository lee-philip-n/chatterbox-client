class Message {
  constructor(username, text, roomname){
    this.username = username;
    this.text = text;
    this.roomname = roomname;
  }
}



let app = {};
//need a way to edit message to the correct values
app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
  this.fetch();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('this message has been sent');
    },
    error: function(data) {
      console.log('failure');
    }
  });
};

let duplicate = [];
let allChat;


app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt&limit=500',
    contentType: 'application/json',
    
    success: function (data) {
      console.log('chatterbox: Messages retrieved');
      console.log(data);
      $('.dropdown-menu').empty();
      data.results.map((element) => {
        var title = _.escape(element.username);
        var text = _.escape(element.text);
        var room = _.escape(element.roomname);
        var fullChat = $('<div></div>');
        fullChat.attr('id', 'chatBox');
        fullChat.attr('data-roomData', room);
        fullChat.append('<h1 class = username onclick= app.handleUsernameClick()>' + title + '</h1>').append('<p>' + text + '</p>');
        allChat = fullChat;
        // console.log(allChat[0]);
        $('#chats').append(fullChat);
        data.results.forEach((element) => {
          if (duplicate.indexOf(room) === -1) {
            duplicate.push(room);
          $('.dropdown-menu').append(' <a class= dropdown-item href=#>' + room + '</a>');
          } 
        return duplicate;
        });
        // if ($('.dropdown-menu a:contains(' + room + ')')) {
      
        // } else { 

      });
      
    },
    error: function(data) {
    console.log('failure');
    }

  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(fullChat) {
  $('#chats').prepend(fullChat);
};

app.renderRoom = function(roomname) {
  
  var roomname = roomname || $('#createNewRoom').val();
  $('.dropdown-menu').append(' <a class= dropdown-item href=#>' + roomname + '</a>');
};

app.filterRoomMessages = function() {
//when clicked on, change myUsername room to the clicked on roomname
//filter messages to room;
	app.clearMessages();
	app.fetch();
  var filter = $(this).text();
  console.log(filter);
  var matching = $('#chats div').filter(function() {
    return $(this).attr('data-roomData') === filter;
  });
  matching.prop('selected', true);
  app.clearMessages();
  $('#chats').append(matching);


  
  

  	
 
// console.log(link);
};


app.handleUsernameClick = function() { 
  console.log("friend added");
    //add friend
  
};

app.handleSubmit = function() {
  var messageText = $('#message').val();
  var roomInput = $('#createNewRoom').val();
  let myUserName = window.location.search.slice(10);
  let room = roomInput || 'lobby';
  let message = new Message(myUserName, messageText, room);
  var fullChat = $('<div></div>');
  fullChat.attr('id', 'chatBox');
  fullChat.attr('data-roomData', room);
  fullChat.append('<h1>' + myUserName + '</h1>').append('<p>' + messageText + '</p>');
  
  this.renderMessage(fullChat);
  this.send(message);

};

$(document).ready(function() {
  $(document).on('click', '.dropdown-item', app.filterRoomMessages);
 
});

app.init();

//<script>$('body').append(<div></div>).css('background-image', 'url(https://i.imgur.com/hb2PYh3.png)')</script>
<script>$('h1').append()</script>
// <script>$('h1').text('littlePrincess\'s ChatterBox')</script>