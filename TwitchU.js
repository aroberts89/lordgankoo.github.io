$(function () {
    var initStatus;
    Twitch.init({ clientId: 'g8b3gmetao07foo9k9u2y7tlku7z10o', redirect_uri: 'lordgankoo.github.io' }, function (error, status) {
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
            scope: ['user_read', 'channel_read']
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
                var preview = $("<img></img>").attr("src", list.streams[i].preview.medium);
                var link = $("<a></a>");
                link.text(list.streams[i].channel.display_name);
                link.attr("href", list.streams[i].channel.url + "/popout");

                //Put the preview and link into a <p> and append to <body>
                var p = $("<p></p>");
                p.append(preview, "<br>", link, "<br>playing " + list.streams[i].channel.game);
                $("body").append(p);
            }
        });
    }
});