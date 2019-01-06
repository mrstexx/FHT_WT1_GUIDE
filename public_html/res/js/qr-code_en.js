$(document).ready(function () {
    $('#qrCodeSearch').on('click', function () {
        $('#table-results').empty();
        $('#raumbelegung-structure .wrong-name').empty();
        $('#raumbelegung-structure').empty();
        $('#table-results_wrapper').hide();
        $('#raumbelegung-structure').prepend('<button class="btn btn-primary" id="qr-button">Take new photo</button>' +
            '<div class="video-container">' +
            '<video id="video-preview"></video>' +
            '<canvas id="qr-canvas" class="hidden"></canvas>' +
            '</div>');
        newScan();
    });

    $('#raumbelegung-structure').on('click', '#qr-button', function () {
        $('#raumbelegung-structure .wrong-name').empty();
        $('#table-results').empty();
        $('#table-results_wrapper').hide();
        $('#video-preview').removeClass("hidden");
        $('#qr-canvas').addClass("hidden");
        newScan();
    });
});

function newScan() {
    navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false}).then(function (stream) {
        var video = document.getElementById("video-preview");
        video.srcObject = stream;
        video.setAttribute("playsinline", true); /* otherwise iOS safari starts fullscreen */
        video.play();
        setTimeout(tick, 100); /* We launch the tick function 100ms later (see next step) */
    }).catch(function (err) {
        console.error(err);
    });
}

function tick() {
    var video = document.getElementById("video-preview");
    var qrCanvasElement = document.getElementById("qr-canvas");
    var qrCanvas = qrCanvasElement.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        qrCanvasElement.height = video.videoHeight;
        qrCanvasElement.width = video.videoWidth;
        qrCanvas.drawImage(video, 0, 0, qrCanvasElement.width, qrCanvasElement.height);
        try {
            var result = qrcode.decode();
            /* Video can now be stopped */
            video.pause();
            video.src = "";
            video.srcObject.getVideoTracks().forEach(function (track) {
                track.stop()
            });

            /* Display Canvas and hide video stream */
            qrCanvasElement.classList.remove("hidden");
            video.classList.add("hidden");

            /* Display raumbelegung */
            if (isValidName(result)) {
                var roomNumber = result.replace(/[^0-9]/g, '');
                loadRoomData(roomNumber);
            } else {
                $('#raumbelegung-structure').append('<h6 class="wrong-name">Raumname mit eingegebenem QR-Code existiert nicht.</h6>');
            }
        } catch (e) {
            /* No Op */
        }
    }

    /* If no QR could be decoded from image copied in canvas */
    if (!video.classList.contains("hidden")) {
        setTimeout(tick, 100);
    }
}


