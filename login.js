$(document).ready(function() {
	$("#login-button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();

		$.ajax({
			url: "/login",
			type: "POST",
			data: {
				username: username,
				password: password
			},
			success: function(response) {
				if (response.success) {
					window.location.href = "/dashboard";
				} else {
					$("#login-error").html("Invalid username or password.");
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
});
