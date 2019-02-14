const getAndRenderPlayers = () => {
    $.ajax({
        type: "GET",
        url: "/players"
    })
        .then(data => {
            data.forEach(player => {
                $('ul').append(`<li class="list-group-item d-flex justify-content-between"><span>${player.handle}</span><span><i>${player.name}</i></span></li>`);
            });
        })
        .catch(e => console.log(e));
}

getAndRenderPlayers();

$('[type=submit]').click(() => {
    event.preventDefault();
    let newPlayer = {
        name: $('[name=name]').val(),
        handle: $('[name=handle]').val()
    };
    $.ajax({
        type: "POST",
        url: "/register",
        data: newPlayer
    })
        .then(response => {
            console.log(response);
            $('ul').empty();
            $('[name=name]').val("");
            $('[name=handle]').val("");
            getAndRenderPlayers();
        })
        .catch(e => console.log(e));
});