/*jshint esversion:6*/
// $(document).ready(function() {
// 	let app = {};
// 	$('.postMessage').on('click', function() {
		
// 	});
// });

let app = {};
//need a way to edit message to the correct values
app.message = {
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
};
app.init = function() {

};

app.send = function() {
	$.ajax({
		// This is the url you should use to communicate with the parse API server.
		url: 'http://parse.hrsf91.hackreactor.com/chatterbox/classes/messages',
		type: 'POST',
		data: this.message,
		contentType: 'application/json',
		success: function (data) {
		  document.body.append(message);
		},
		error: function (data) {
		  // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		  console.error('chatterbox: Failed to send message', data);
		}
	});
};

app.fetch = function() {
	$.ajax({
		// This is the url you should use to communicate with the parse API server.
		// url: 'http://parse.hrsf91.hackreactor.com/chatterbox/classes/messages',
		type: 'GET',
		data: JSON.stringify(this.message),
		contentType: 'application/json',
		success: function (data) {
		  console.log('chatterbox: Message sent');
		},
		error: function (data) {
		  // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		  console.error('chatterbox: Failed to send message', data);
		}
	});
};

app.clearMessages = function() {
		// $.ajax({
		// // This is the url you should use to communicate with the parse API server.
		// url: 'http://parse.hrsf91.hackreactor.com/chatterbox/classes/messages',
		// type: 'PUT',
		// // data: this,
		// contentType: 'application/json',
		// success: function (data) {
		  $('#chats').empty();
	// 	},
	// 	error: function (data) {
	// 	  // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	// 	  console.error('chatterbox: Failed to send message', data);
	// 	}
	// });
};

app.renderMessage = function() {

};

app.renderRoom = function() {

};
