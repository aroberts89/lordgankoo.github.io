$(function () {
    var initStatus;
    Twitch.init({ clientId: 'g8b3gmetao07foo9k9u2y7tlku7z10o', redirect_uri: 'https://lordgankoo.github.io/' }, function (error, status) {
        // the sdk is now loaded
        initStatus = status;
        if (status.authenticated) {
            $('.twitch-connect').hide();
        }
        else {
            $('.logout').hide();
        }
    });

    $('.twitch-connect').click(function () {
        Twitch.login({
            scope: ['user_read', 'channel_read'],
            force_verify: true
        });
    });

    $('.logout').click(function () {
        Twitch.logout(function (error) {
            location.reload(true);
        });
    });

    if (initStatus.authenticated) {
        Twitch.api({ method: 'streams/followed', params: { stream_type: 'live' } }, function (error, list) {
            for (var i = 0; i < list._total; i++) {
                //Generate the preview and link
				var image = list.streams[i].preview.template;
				image = image.replace("{width}x{height}", "250x141");
                var preview = $("<img></img>").attr("src", image);

                var link = $("<a></a>");
                link.text(list.streams[i].channel.display_name);
                link.attr("href", list.streams[i].channel.url + "/popout");
                link.attr("style", "font-size:30px");
                link.prepend(preview, "<br>");

                //Put the preview and link into a previewStream class and append to #content div.
                var previewBox = $("<div class='previewStream'></div>");
                previewBox.append(link, "<br>playing " + list.streams[i].channel.game);
                $("#content").append(previewBox);
            }
        });
		
        Twitch.api({ method: 'user'}, function (error, user) {
			var twitchUser = user.name;
			var twitchUserDisplay = document.getElementById("twitchUserName");
			twitchUserDisplay.innerHTML = twitchUser;
            });
    }
});