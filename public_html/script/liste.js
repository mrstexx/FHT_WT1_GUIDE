var listOfRooms = [];

$(function () {
    console.log("ready!");

    var roomsObject = [];
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '../res/data/rooms.json',
        success: function (result) {
            $.each(result, function (objkey, objval) {
                roomsObject.push({key: objkey, value: objval})
            });
            $.each(roomsObject[0].value, function (objval, objkey) {
                listOfRooms.push({key: objval, value: objkey})
            });
        },
        error: function () {
            console.warn("Problem occured!");
        }
    });
});

$('#listSearch').on('click', function () {
    $('#raumbelegung-structure').empty ();
    $('#raumbelegung-structure').prepend(setList());
});

function setList() {
    var listStructure = '<div class="form-group"><select class="form-control mx-auto" id="listSelection"><option selected>Wählen Sie Raum aus</option>';
    for (var i = 0; i < listOfRooms.length; i++)
    {
        listStructure+='<option>' + listOfRooms[i].value + '</option>';
    }
    listStructure += '</select></div>';
    return listStructure;
}