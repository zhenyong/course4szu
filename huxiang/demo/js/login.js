
$(function() {

	function onRegister(e) {

		e.preventDefault();
		// window.open("../register/register.html"); 
		location.href = "../register/register.html";
	}


	var register = $('#register-btn');
	register.on('click', onRegister);

});