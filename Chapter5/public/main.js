$(function () {
  var $h1 = $("h1");
  var $zip = $("input[name='zip']");
  var message = "zip found";

  $("form").on("submit", function(event) {
    event.preventDefault();

    var zipCode= $.trim($zip.val());
    $h1.text("Loading....");

    var request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    });

    request.done(function(data) {
      var temperature = data.temperature;
      $h1.html("It is " + temperature + "&#176; in " + zipCode + ".");
      message = "done";
    });

    request.fail(function (data) {
      $h1.text("Error");
      message = "error";
      // console.log(message);
    });
    // console.log(message);
  });
});
