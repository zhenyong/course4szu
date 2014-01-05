/**
 * common methods
 */

function log() {
	console.log.apply(console, arguments);
}

function getFieldVal($el) {
	return ($el && $el.length && $el.val) ? $el.val() : '';
}

function each(map, callback) {
	if (map) {
		for (var p in map) {
			if (map.hasOwnProperty(p)) {
				callback(p, map[p]);
			}
		}
	}
}

function getFormValues(formSelector) {
	return {
		fieldAName : fieldAVal,
		fieldBName : fieldBVal
	}
}



/**
 *
 */

function getFieldValueFrom(from, selector) {
	return (from && selector) ? getFieldVal($(from).find(selector)) : '';
}

function getRegisterFormValues($form) {

	if(!$form) return {};

	$form = $($form);

	var obj = {};

	var selMap = {
		username: 'input[name="username"]',
		password: 'input[name="password"]',
		repassword: 'input[name="repassword"]',
		gender: 'input[name="gender"]:checked',
		year: 'select[name="year"]',
		month: 'select[name="month"]',
		day: 'select[name="day"]',
		address: 'input[name="address"]'
	};

	each(selMap, function(key, val) {
		obj[key] = getFieldValueFrom($form, val);
	});

	return obj;
}

$(function() {

	function onSubmit(e) {

		e.preventDefault();

		var obj = getRegisterFormValues('#register-form');

		log(obj);

		$.ajax({
			data: obj,
			url: 'user/register',
			type: 'POST',
			success: function () {
				alert('register success');
			},
			error: function () {
				alert('register fail');
			}
		});
	}


	var submitBtn = $('form #submit-btn');

	submitBtn.on('click', onSubmit);


});