$(document).ready(function() {
	// for webcam support
	$('#example').photobooth().on("image", function(event, dataUrl) {
		//$("#hiddenImg").html('<img src="' + dataUrl + '" >');
		qrCodeDecoder(dataUrl);
		//console.log(event);
		//console.log(dataUrl);
		//console.log($('#example').data( "photobooth" ));
	});

	$('#qrScan').click(function() {
		$('.trigger').trigger('click');
    });

    $('#qrCodeSearch').on('click', function () {
        $('#table-results').empty();
        $('#raumbelegung-structure').empty();
        $('#table-results_wrapper').hide();
        $('#raumbelegung-structure').prepend('<div class="boxWrapper">' +
			'<div id="example"></div></div><div class="btn btn-primary">' +
			'<a id="qrScan">Scan QR code</a></div><div class="boxWrapper auto">' +
			'<div id="hiddenImg"></div><div id="qrContent"><p>Result will be here.</p>' +
			'</div></div>');
    });
    
	qrcode.callback = showInfo;
});

// decode the imgage
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show results from qr code
function showInfo(data) {
	$("#qrContent p").text(data);
}
