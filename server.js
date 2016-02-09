var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var bdd = [
	{'name': 'top_nofavorite1', 'tag': 'top', 'favorite': false},
	{'name': 'top_nofavorite2', 'tag': 'top', 'favorite': false},
	{'name': 'top_nofavorite3', 'tag': 'top', 'favorite': false},
	{'name': 'pending_nofavorite1', 'tag': 'pending', 'favorite': false},
	{'name': 'pending_favorite1', 'tag': 'pending', 'favorite': true},
	{'name': 'pending_nofavorite2', 'tag': 'pending', 'favorite': false},
	{'name': 'pending_favorite2', 'tag': 'pending', 'favorite': true},
	{'name': 'top_favorite1', 'tag': 'top', 'favorite': true},
	{'name': 'top_favorite2', 'tag': 'top', 'favorite': true},
	{'name': 'top_favorite3', 'tag': 'top', 'favorite': true}
]

server.listen(3030)
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'jade')

app.get('/*', function(req, res) {
	res.render('content')
})

io.on('connection', function(socket) {
	socket.on('get tracks', function(data) {
		switch (data) {
			case 'top':
				socket.emit('tracks list', selectInBdd(bdd, 'tag', 'top'))
				break
			case 'favorites':
				socket.emit('tracks list', selectInBdd(bdd, 'favorite', true))
				break
			case 'pending':
				socket.emit('tracks list', selectInBdd(bdd, 'tag', 'pending'))
				break
		}
	})
})

var selectInBdd = function(bdd, tag, content) {
	var res = new Array()

	for (var i in bdd) {
		if (bdd[i][tag] == content)
			res.push(bdd[i])
	}
	return res
}
