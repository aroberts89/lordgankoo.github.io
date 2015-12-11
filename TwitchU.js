$(function () {
    Twitch.init({ clientId: 'g8b3gmetao07foo9k9u2y7tlku7z10o' }, function (error, status) {
        // the sdk is now loaded
    });

    $('.twitch-connect').click(function () {
        Twitch.login({
            scope: ['user_read', 'channel_read']
        });
    });

    Twitch.api({ method: 'streams/followed' }, function (error, streams) {
        console.log(streams.streams);
    });
});