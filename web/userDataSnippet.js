
	function login(callback) {
		var CLIENT_ID = 'd1609587125f4906b06197604a5c83e5';
		var REDIRECT_URI = 'http://aeyos.herokuapp.com/spotifyLogin.html';
		function getLoginURL(scopes) {
			return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
			  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
			  '&scope=' + encodeURIComponent(scopes.join(' ')) +
			  '&response_type=token';
		}
		var url = getLoginURL([
			'playlist-read-private',
			'user-library-read'
		]);
			var width = 450,
			height = 730,
			left = (screen.width / 2) - (width / 2),
			top = (screen.height / 2) - (height / 2);
		window.addEventListener("message", function(event) {
			var hash = JSON.parse(event.data);
			if (hash.type == 'access_token') {
				callback(hash.access_token);
			}
		}, false);
			var w = window.open(url,
							'Spotify',
							'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
						   );
		}

	function getUserData(accessToken) {
		return $.ajax({
			url: 'https://api.spotify.com/v1/me',
			headers: {
			   'Authorization': 'Bearer ' + accessToken
			}
		});
	}

	function logMeIn () {
		login(function(accessToken) {
			getUserData(accessToken)
				.then(function(response) {
					window.accessToken = accessToken;
					$.ajax({
						// url:'https://api.spotify.com/v1/users/12186243016/playlists/5bX10hZYhZWXIooyghpa82',
						url:'https://api.spotify.com/v1/me/playlists',
						type:'GET',
						headers:{
							'Authorization':'Bearer '+accessToken
						}
					}).then(function(response) {
						for(var i in response.items) {
							// console.log(response.items[i]);
							$('.spotifyPlaylists').append('<li onclick="loadList(\''+response.items[i].href+'\')">'+response.items[i].name+'</li>').show();
						}
					})
					console.log(response);
				});
			});
	};

	function loadList (href) {
		console.log('loading', href);
		$.ajax({
			url:href,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+accessToken
			}
		}).then(function(response) {
			for(var i in response.tracks.items) {
				console.log(response.tracks.items[i]);
				// $('.spotifyPlaylists').append('<li onclick="loadList(\''+response.items[i].href+'\')">'+response.items[i].name+'</li>').show();
				$('#searchInput')[0].value += response.tracks.items[i].track.artists[0].name + ' - ' + response.tracks.items[i].track.name+';';
			}
		})
	}
