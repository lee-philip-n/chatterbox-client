
// $(document).ready(function() {
// 	let app = {};
// 	$('.postMessage').on('click', function() {
		
// 	});
// });

let app = {};
//need a way to edit message to the correct values
let message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};
app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
	this.fetch();
};

app.send = function() {
	$.ajax({
		// This is the url you should use to communicate with the parse API server.
		url: app.server,
		type: 'POST',
		data: JSON.stringify(message),
		contentType: 'application/json',
		success: function (data) {
		  console.log('this message has been sent');
		},
	});
};

app.fetch = function() {
	$.ajax({
		// This is the url you should use to communicate with the parse API server.
		url: app.server,
		type: 'GET',
		data: {limit:100000, order: 'asc'},
		contentType: 'application/json',
		
		success: function (data) {
			// var sortedData = data.results.sort({createdAt: -1});
		  console.log('chatterbox: Message sent');
			console.log(data);
			// var sortedData = function() {
			// 	data.results.sort(function(a, b) {
			// 			return a.createdAt < b.createdAt;
			// 		});
			// };
			let sorted = _.sortBy(data.results, function(element) {
				return element.createdAt;
			});
			console.log(sorted);
			sorted.map((element) => {
				var title = element.username;
				var text = element.text;
				var room = element.roomname;
				var fullChat = $('<div></div>');
				fullChat.attr('id', 'chatBox');
				fullChat.attr('data-roomData', room);
				fullChat.append('<h1>' + title + '</h1>').append('<p>' + text + '</p>');
				$('#chats').prepend(fullChat);
			});
		},
		
	});
};

app.clearMessages = function() {
		
		 $('#chats').empty();
	
};

app.renderMessage = function(obj) {
	let myUserName = window.location.search.slice(10);
	let words = obj.text;
	let room = obj.roomname || 'lobby';
	var fullChat = $('<div></div>');
	fullChat.attr('id', 'chatBox');
	fullChat.attr('data-roomData', room);
	fullChat.append('<h1>' + myUserName + '</h1>').append('<p>' + words + '</p>');
	$('#chats').prepend(fullChat);

};

app.renderRoom = function(roomname) {
	
	$('#roomSelect').append('<div>' + roomname + '</div>');
	
};

app.handleUsernameClick = function() { 
	$('.username').on('click', function(event) {
		//add friend
	});
};

app.handleSubmit = function() {
		var messageText = $('#message').val();

		var message = {
  		username: 'Mel Brooks',
  		text: messageText,
  		roomname: 'lobby'
		};
		
		this.renderMessage(message);
		this.send(messageText);
};

$('.submit').click(function(e) {
	app.handleSubmit();
	});



app.init();


	// class Message {
	// 	constructor(username, text, roomname){
	// 		this.username = username;
	// 		this.text = text;
	// 		this.roomname = roomname;
	// 	}
	// }
