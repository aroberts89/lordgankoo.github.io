$(function () {
    Twitch.init({ clientId: 'g8b3gmetao07foo9k9u2y7tlku7z10o' }, function (error, status) {
        // the sdk is now loaded
    });

    $('.twitch-connect').click(function () {
        Twitch.login({
            scope: ['user_read', 'channel_read']
        });
    });

    Twitch.api({ method: 'streams/followed', params: { stream_type: 'live' } }, function (error, list) {
        for (var i = 0; i < list._total; i++) {
            var linkText = $("<p></p>").text(list.streams[i].channel.url);
            $("body").append(linkText);
            console.log(list.streams[i].channel.url);
        }
    });
});