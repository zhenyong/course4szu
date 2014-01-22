//任务
//1. 提供 format 方法，长这样 ：format(strTpl, item.caption, item.yearRate, ...)
//效果跟现有的format一样



//1.静态html硬编码
//2.动态添加html编码
//3.动态用业务数据拼拼html
//4.遍历业务对象数组，拼html

function InvestItem (caption, yearRate, period, flowTotal) {
	this.caption = caption;
	this.yearRate = yearRate;
	this.period = period;
	this.flowTotal = flowTotal;
}


$(document).ready(function () {

var item1 = new InvestItem('caption1','yearRate1','period1','flowTotal1');

var itemList = [];

for(var i = 0; i < 5; i++) {
	itemList.push(new InvestItem('caption'+i,'yearRate'+i,'period'+i,'flowTotal'+i));
}

var resultHtml = '';

var tpl = [
'<li class="invest-item">',
	'<div class="detail">',
		'<div class="item-caption">{caption}</div>',
			'<ul class="detail-item-list">',
				'<li class="detail-item width-50">',
					'<label for="">年利率:</label>',
					'<span class="value" type="text" readonly >{yearRate}</span>',
				'</li>',
				'<li class="detail-item width-50">',
					'<label for="">回购期限:</label>',
					'<span class="value" type="text" readonly >{period}</span>',
				'</li>',
				'<li class="detail-item width-100">',
					'<label for="">流转总额:</label>',
					'<span class="value" type="text" readonly >{flowTotal}</span>',
				'</li>',
			'</ul>',
		'</div>',
	'</div>',
	'<div class="btn btn-invest">投资</div>',
'</li>',
].join('');

function format (tpl, map) {
	var ret = tpl;

	$.each(map, function (key, val) {
		ret = ret.replace('{' + key + '}', val);
	});

	return ret;
}

$.each(itemList, function (index, item) {

	resultHtml += format(tpl, item);

});

var ct = $('#invest-list');
ct.append($(resultHtml));

})