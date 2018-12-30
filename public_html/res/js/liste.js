var listOfRooms = []; // list of available rooms
var lvUnits = []; // list of all units for selected room

$(function () {
    // Load list of rooms
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
            console.log("Room List ready!");
        },
        error: function () {
            console.warn("Problem occured while loading room list!");
        }
    });
});

$('#listSearch').on('click', function () {
    $('#raumbelegung-structure').empty();
    $('#raumbelegung-structure').prepend(getList());
});

$('#raumbelegung-structure').on('change', 'select', function () {
    var selectedOption = $('#listSelection option[value=' + $(this).val() + ']').text();
    var roomNumber = selectedOption.replace(/[^0-9]/g, '');
    loadRoomData(roomNumber);
});

function loadRoomData(roomNumber) {
    // load xml room via alax call with room number
    lvUnits = [];
    if (Number.isInteger(parseInt(roomNumber))) {
        $.ajax({
            type: 'GET',
            dataType: 'xml',
            url: '../res/data/edvs/edva' + roomNumber + '.xml',
            success: function (data) {
                var xmlTree = $(data);
                var lvData = xmlTree.find("LVDaten");
                lvData.each(function () {
                    lvUnits.push({
                        date: $(this).find('Datum').text(),
                        timeFrom: $(this).find('Von').text(),
                        timeTo: $(this).find('Bis').text(),
                        lector: $(this).find('Lektoren').text(),
                        group: $(this).find('Gruppen').text(),
                        subject: $(this).find('Lehrfach').text(),
                        note: $(this).find('Anmerkung').text(),
                        hourFrom: $(this).find('StundeVon').text(),
                        hourTo: $(this).find('StundeBis').text()
                    });
                });
                console.log("EDV_A" + roomNumber + " ready!");
            },
            error: function () {
                console.warn("Problem occured while loading EDV_A" + roomNumber + "!");
            }
        });
        console.log(lvUnits);
    }
}

function getList() {
    var listStructure = '<div class="form-group"><select class="form-control mx-auto" id="listSelection"><option value="0" selected>Wählen Sie Raum aus</option>';
    for (var i = 0; i < listOfRooms.length; i++) {
        listStructure += '<option value="' + (i + 1) + '">' + listOfRooms[i].value + '</option>';
    }
    listStructure += '</select></div>';
    return listStructure;
}