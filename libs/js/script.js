$('#btnTimezone').click(function () {
    $.ajax({
        url: "libs/php/getTimeZone.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#lat').val(),
            lng: $('#lng').val()
        },
        success: function (opt) {
            if (opt.status.name === "ok") {
                $('#output').html(`
                    <h3>Timezone</h3>
                    <table>
                        <tr><td>Timezone ID:</td><td>${opt.data.timezoneId}</td></tr>
                        <tr><td>GMT Offset:</td><td>${opt.data.gmtOffset}</td></tr>
                        <tr><td>Current Time:</td><td>${opt.data.time}</td></tr>
                    </table>
                `);
            }
        }
    });
});

$('#btnPostalCode').click(function () {
    $.ajax({
        url: "libs/php/getPostalcode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            postalCode: $('#postalCode').val(),
            country: $('#country').val()
        },
        success: function (opt) {
            if (opt.status.name === "ok" && opt.data) {
                $('#output').html(`
                    <h3>Postal Code Info</h3>
                    <table>
                        <tr><td>Postal Code:</td><td>${opt.data.postalcode}</td></tr>
                        <tr><td>Place Name:</td><td>${opt.data.placeName}</td></tr>
                        <tr><td>State:</td><td>${opt.data.adminName1}</td></tr>
                        <tr><td>Country Code:</td><td>${opt.data.countryCode}</td></tr>
                        <tr><td>Latitude:</td><td>${opt.data.lat}</td></tr>
                        <tr><td>Longitude:</td><td>${opt.data.lng}</td></tr>
                    </table>
                `);
            } else {
                $('#output').html("<p>No postal code information found.</p>");
            }
        }
    });
});




$('#btnNeighbours').click(function () {
    $.ajax({
        url: "libs/php/getNeighbours.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#neighbourCode').val()
        },
        success: function (opt) {
            if (opt.status.name === "ok") {
                let html = "<h3>Neighbouring Countries</h3><ul>";
                opt.data.forEach(country => {
                    html += `<li>${country.countryName}</li>`;
                });
                html += "</ul>";
                $('#output').html(html);
            }
        }
    });
});
