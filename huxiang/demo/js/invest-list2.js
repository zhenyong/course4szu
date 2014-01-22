//任务
//1. 提供 format 方法，长这样 ：format(strTpl, item.caption, item.yearRate, ...)
//效果跟现有的format一样



//1.静态html硬编码
//2.动态添加html编码
//3.动态用业务数据拼拼html
//4.遍历业务对象数组，拼html
//5.ajax取json数据，生成业务对象，拼html



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
		var investItem = new InvestItem(dataItem.caption, dataItem.yearRate, dataItem.period, dataItem.flowTota);
		itemList.push(investItem);
		
	});
	return itemList;
}

$(function () {


	asycnGetInvetmetnsData (function (data) {
		
		var itemList = createInvestmentList(data);

		var resultHtml = '';

		var tpl = [
		'<li class="invest-item">',
			'<div class="detail">',
				'<div class="item-caption"><%=caption%></div>',
					'<ul class="detail-item-list">',
						'<li class="detail-item width-50">',
							'<label for="">年利率:</label>',
							'<span class="value" type="text" readonly ><%=yearRate%></span>',
						'</li>',
						'<li class="detail-item width-50">',
							'<label for="">回购期限:</label>',
							'<span class="value" type="text" readonly ><%=period%></span>',
						'</li>',
						'<li class="detail-item width-100">',
							'<label for="">流转总额:</label>',
							'<span class="value" type="text" readonly >',
						
							'<% if(moneyType === "cn") { %>',
								'￥',
							'<%}%>',
							
							'<%else if (moneyType === "us") {%>',
								'$',
							'<%}%>',
							'<%=moneyType%>',
							'<%=flowTotal%></span>',
						'</li>',
					'</ul>',
				'</div>',
			'</div>',
			'<div class="btn btn-invest">投资</div>',
		'</li>',
		].join('');

		var render = template.compile(tpl);

		$.each(itemList, function (index, item) {

			resultHtml += render(item);

		});

		var ct = $('#invest-list');
		ct.append($(resultHtml));

	});


});




