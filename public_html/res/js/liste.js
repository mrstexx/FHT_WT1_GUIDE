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

/**
 * Change view to list search
 */
$('#listSearch').on('click', function () {
    $('#raumbelegung-structure').empty();
    $('#table-results_wrapper').hide();
    $('#raumbelegung-structure').prepend(getList());
});

/**
 * On selection change, it will load data from selected room
 */
$('#raumbelegung-structure').on('change', 'select', function () {
    var selectedOption = $('#listSelection option[value=' + $(this).val() + ']').text();
    var roomNumber = selectedOption.replace(/[^0-9]/g, '');
    $('#table-results_wrapper').hide();
    $('#table-results').empty();
    loadRoomData(roomNumber);
});

/**
 * Main function used for ajax call of xml files and showing results in table
 * @param {String} roomNumber 
 */
function loadRoomData(roomNumber) {
    // load xml room via alax call with room number
    if (Number.isInteger(parseInt(roomNumber))) {
        lvUnits = [];
        var navStructure = '<thead><tr>'
            + '<th class="th-sm">Datum</th>'
            + '<th class="th-sm">Von</th>'
            + '<th class="th-sm">Bis</th>'
            + '<th class="th-sm">Lektoren</th>'
            + '<th class="th-sm">Gruppen</th>'
            + '<th class="th-sm">Lehrfach</th>'
            + '<th class="th-sm">Anmerkung</th>'
            + '<th class="th-sm">Stunde Von</th>'
            + '<th class="th-sm">Stunde Bis</th></tr></thead><tbody>';
        $.ajax({
            type: 'GET',
            dataType: 'xml',
            url: '../res/data/edvs/edva' + roomNumber + '.xml',
            success: function (data) {
                var xmlTree = $(data);
                var lvData = xmlTree.find("LVDaten");
                lvData.each(function () {
                    var unitObject = {
                        date: $(this).find('Datum').text(),
                        timeFrom: $(this).find('Von').text(),
                        timeTo: $(this).find('Bis').text(),
                        lector: $(this).find('Lektoren').text(),
                        group: $(this).find('Gruppen').text(),
                        subject: $(this).find('Lehrfach').text(),
                        note: $(this).find('Anmerkung').text(),
                        hourFrom: $(this).find('StundeVon').text(),
                        hourTo: $(this).find('StundeBis').text()
                    };
                    lvUnits.push(unitObject);
                    navStructure += '<tr><td>' + unitObject.date +
                        '</td><td>' + unitObject.timeFrom +
                        '</td><td>' + unitObject.timeTo +
                        '</td><td>' + unitObject.lector +
                        '</td><td>' + unitObject.group +
                        '</td><td>' + unitObject.subject +
                        '</td><td>' + unitObject.note +
                        '</td><td>' + unitObject.hourFrom +
                        '</td><td>' + unitObject.hourTo +
                        '</td></tr>';
                });
                navStructure += '</tbody>';
                $('#table-results').append(navStructure);
                
                // DataTable html5 and JS library for table paginnation and material design
                $('#table-results').DataTable({
                    paging: true,
                    pagingType: "simple_numbers",
                    searching: false,
                    destroy: true,
                    ordering: false,
                    lengthChange: false
                });
                $('.dataTables_length').addClass('bs-select');
                
                console.log("EDV_A" + roomNumber + " ready!");
            },
            error: function () {
                console.warn("Problem occured while loading EDV_A" + roomNumber + "!");
            }
        });
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