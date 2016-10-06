$(function(){
    //ask server for songs, then draw them
    getSongs();


    //listen for submit events and send new songs to the server
    $('form').on('submit', function(event){
        event.preventDefault();

        var formData = $(this).serialize(); //serialize gives you the raw string as opposed to serializearray
//then send that data off to the server
        $.ajax({
            type: 'POST',
            url: '/songs',
            data: formData,
            success: getSongs,
        });
        $(this).find('input[type=text]').val('');
    });
});




function getSongs(){
$.ajax({
    type: 'GET',
    url: '/songs',
    //we need to wait for the server to respond!
    success: function(songs){
        $('#songs').empty();
        songs.forEach(function(song){
            var $li = $('<li></li>');
            $li.append('<p>' + song.title + '</p>');
            $li.append('<p>by: ' + song.artist + '</p>');
            $li.append('<p>' + song.date + '</p>');

            $('#songs').append($li);
        });
    }
});
}
