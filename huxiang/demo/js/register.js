
$(function() {

	function onRegister(e) {

		e.preventDefault();
		// window.open("../login2/main.html"); 
		location.href = "../login2/main.html";
	}


	var register = $('#register-btn');
	register.on('click', onRegister);

});