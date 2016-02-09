var socket = io();

$(document).ready(function() {
	router();
	$('#nav li').click(function() {
		history.pushState(null, null, $(this).attr('href'));
		router();
	});
});

$(window).on('beforeunload', function() {
	socket.close();
});

var router = function() {
	var data, url = window.location.href.split('/');
	url.splice(0,3);

	if (url[0] == 'top' || url[0] == 'pending' || url[0] == 'favorites')
		data = url[0];
	else
		data = 'top';
	socket.emit('get tracks', data);
	handleResponse();
};

var handleResponse = function() {
	socket.on('tracks list', function(data) {
		$('#body').empty();
		for (var i in data)
			$('#body').append('<div>' + data[i].name + '</div>');
	});
}
