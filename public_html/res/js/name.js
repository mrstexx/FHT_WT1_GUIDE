$('#nameSearch').on('click', function () {
    $('#table-results').empty();
    $('#raumbelegung-structure').empty();
    $('#table-results_wrapper').hide();
    $('#raumbelegung-structure').prepend('<input type="text" id="searchbar" class="mx-auto" placeholder="Geben Sie Raumname ein"> <button class="search-button"><i class="fa fa-search"></i></button>');
});

$('#raumbelegung-structure').on ('keydown', '#searchbar', function (event) {
    if (event.which == 13) {
        var enteredText = $('#raumbelegung-structure #searchbar').val();
        nameSearch(enteredText);
    }
});

$('#raumbelegung-structure').on ('click', '.search-button', function () {
    var enteredText = $('#raumbelegung-structure #searchbar').val();
    nameSearch(enteredText);
});

function isValidName(enteredText) {
    enteredText = enteredText.trim ().toLowerCase ();
    if ((enteredText === "edva206" || enteredText === "edva207" || 
        enteredText === "edva508" || enteredText === "edva608" || enteredText === "edva609" ||
        enteredText === "edva610") && enteredText.length > 0) {
            return true;
    }
    return false;
}

function nameSearch(enteredText) {
    $('#raumbelegung-structure .wrong-name').empty();
    $('#table-results_wrapper').hide();
    $('#table-results').empty();
    if (isValidName(enteredText)) {
        var roomNumber = enteredText.replace(/[^0-9]/g, '');
        loadRoomData(roomNumber);
    } else {
        $('#raumbelegung-structure').append ('<h6 class="wrong-name">Raumname mit eingegebenem Text existiert nicht! Geben Sie einen echten Namen ein.</h6>');
    }
}