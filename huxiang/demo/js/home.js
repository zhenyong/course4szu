function InvestItem (caption, yearRate, period, flowTotal, moneyType) {

	this.moneyType = moneyType ? moneyType : 'cn';

	this.caption = caption;
	this.yearRate = yearRate;
	this.period = period;
	this.flowTotal = flowTotal;
}


function asycnGetInvetmetnsData (callback) {
	$.ajax({
		url: '../data/investments/data.txt',
		type: "GET",
		success: function (responseText) {
			// var investDataList = JSON.parse(responseText);
			var investDataList = eval('(' + responseText + ')');
			callback (investDataList);
		},
		error: function () {
			alert('error');
		}
	});
}


function createInvestmentList (data) {
	var itemList = [];
	$.each(data, function (index, dataItem) {
		var investItem = new InvestItem(dataItem.caption, dataItem.yearRate, dataItem.period, dataItem.flowTotal);
		itemList.push(investItem);
		
	});
	return itemList;
}


$(function() {

	function onInves(e) {

		e.preventDefault();

		$("#select-menu0").removeClass("color-select");
		$("#select-menu1").addClass("color-select");
 
		$("#body-2").hide();
		$("#body-1").show();
	}

	function onLoan(e) {

		e.preventDefault();

		$("#select-menu1").removeClass("color-select");
		$("#select-menu0").addClass("color-select");
 
		$("#body-1").hide();
		$("#body-2").show();
	}


	asycnGetInvetmetnsData (function (data) {
		
		var itemList = createInvestmentList(data);

		var resultHtml = '';

		var tpl = [
		'<div class="info-left pull-left icon">',
		'<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<%=caption%><br></span>',
		'<span>年利率：<%=yearRate%> &nbsp&nbsp回购期限：<%=period%><br></span>',
		'<span>流动总额：<% if(moneyType === "cn") { %>',
								'￥',
							'<%}%>',
							
							'<%else if (moneyType === "us") {%>',
								'$',
							'<%}%>',
							'<%=flowTotal%>',
							'</span>',
		'</div>',
		'<div class="info-right pull-left">',
		'<div class="investment-btn pull-left">投资</div>',
		'</div>',
		'<div class="dot-line pull-left"></div>'
		].join('');

		var render = template.compile(tpl);

		$.each(itemList, function (index, item) {

			resultHtml += render(item);

		});

		var ct = $('#body-1');
		ct.append($(resultHtml));

	});


	// // var register = $('#register-btn');
	// // register.on('click', onRegister);
	// var temp='<div class="info-left pull-left icon"><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp装修不够资金，想节点资金<br></span><span>年利率：20.0% &nbsp&nbsp回购期限：1个月<br></span><span>流动总额：￥7000</span></div><div class="info-right pull-left"><div class="investment-btn pull-left">投资</div></div><div class="dot-line pull-left"></div>';

	// $("#body-1").append(temp);
	// $("#body-1").append(temp);
	// $("#body-1").append(temp);
	// $("#body-1").append(temp);
	// $("#body-1").append(temp);

	$("#body-1").hide();
	$("#body-1").show();

	var investment = $('#select-menu0');
	investment.on('click', onInves);

	var loan = $('#select-menu1');
	loan.on('click', onLoan);

});