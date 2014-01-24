//JSON.stringify({'1':{name:'peter'}})


//the server side start
//in disk
var db = {'1':{id:'1',name:'趙三', phone:'10086', age: 22},
			'2':{id:'2',name:'李四', phone:'10010', age: 24},
			'3':{id:'3',name:'王五', phone:'10000', age: 32}};

//persist layer
var dao = {
	list: function (callback) {
		$.ajax({
			url: 'data/list.json',
			success: function (data) {
				callback(data);
			},
		});


	},

	findById: function (id) {
		return db[id];
	},
	search: function(name,callback){
		var searchList = {};
		log(name);
		$.each(db,function(index, value){
			if(value['name'] == name){
				searchList[index] = value;
			}
		})
		log(">>>dao search");
		log(searchList);
		setTimeout(function () {
			callback(true, searchList);//true meas success
		}, 800);
	},
	update: function (data, callback) {
		db[data.id] = data;
		log('server contact dao update success', data);
		var lastData = data;
		setTimeout(function () {
			callback(true, lastData);//true meas success
		}, 800);
	},

	delete: function(data, callback){
		delete db[data.id];
		log('server contact dao delete success', data);
		var lastData = data;
		setTimeout(function () {
			callback(true, lastData);//true meas success
		}, 800);
	},
}
//the server side end

function formatContactSearchFormTpl(){
	return generateTpl(
		'<form>',
		'<h5>请输入查找数据</h5>',
			'<div>',
				'<label>name: </label>',
				'<input type="text" value="李四" name="name" placeholder="请输入name">',
			'</div>',
			'<input type="submit" value="ok">',
		'</form>'
		);
}
function formatContactInsertFormTpl(){
	return generateTpl(
		'<form>',
		'<h5>请输入插入数据</h5>',
			'<div>',
				'<label>id: </label>',
				'<input type="text" value=" 4" name="id" placeholder="请输入id">',
			'</div>',
			'<div>',
				'<label>name: </label>',
				'<input type="text" value="name4" name="name" placeholder="请输入name">',
			'</div>',
			'<div>',
				'<label>phone: </label>',
				'<input type="text" value="phone4" name="phone" placeholder="请输入电话">',
			'</div>',
			'<div>',
				'<label>age: </label>',
				'<input type="text" value="age5" name="age" placeholder="请输入age">',
			'</div>',
			'<input type="submit" value="ok">',
		'</form>'
		);

}
function formatContactEditFormTpl (data) {
	return generateTpl(
		'<form>',
		'<h5>请输入修改数据：</h5>',
			'<div>',
				'<label>name: </label>',
				'<input type="text" value="'+ data.name +'" name="name" placeholder="请输入姓名">',
			'</div>',
			'<div>',
				'<label>phone: </label>',
				'<input type="text" value="'+ data.phone +'" name="phone" placeholder="请输入电话">',
			'</div>',
			'<div>',
				'<label>age: </label>',
				'<input type="text" value="'+ data.age +'" name="age" placeholder="请输入年龄">',
			'</div>',
			'<input type="submit" value="ok">',
		'</form>');
}
function formatContactDeleteFormTpl (data) {
	return generateTpl(
		'<form>',
		'<h5>确认删除以下数据？：</h5>',
			'<label>name: </label>',
			'<span>' + data.name + '</span>&nbsp;',
			'<label>phone: </label>',
			'<span>' + data.phone + '</span>&nbsp',	
			'<label>age: </label>',
			'<span>' + data.age + '</span>&nbsp;',
			'<input type="submit" value="确定删除">',
		'</form>');
}
// function liFormatContactItemTpl(){
// 	return 
// }
function insertFormatContactItemTpl (data) {
	return generateTpl('<li>',
				'<input type="hidden" pid="' + data.id + '">',
				'<label>name: </label>',
				'<span>' + data.name + '</span>&nbsp;',
				'<label>phone: </label>',
				'<span>' + data.phone + '</span>&nbsp',	
				'<label>age: </label>',
				'<span>' + data.age + '</span>&nbsp;',
				'<input class="edit" type="button" value="edit">',
				'<input class="delete" type="button" value="delete">',
			'</li>');
}
function editFormatContactItemTpl (data) {
	return generateTpl(
				'<input type="hidden" pid="' + data.id + '">',
				'<label>name: </label>',
				'<span>' + data.name + '</span>&nbsp;',
				'<label>phone: </label>',
				'<span>' + data.phone + '</span>&nbsp',	
				'<label>age: </label>',
				'<span>' + data.age + '</span>&nbsp;',
				'<input class="edit" type="button" value="edit">',
				'<input class="delete" type="button" value="delete">'
			);
}
function listFormatContactItemTpl(data){
	return generateTpl(
		'<li>',
			'<input type="hidden" pid="' + data.id + '">',
			'<label>name: </label>',
			'<span>' + data.name + '</span>&nbsp;',
			'<label>phone: </label>',
			'<span>' + data.phone + '</span>&nbsp',	
			'<label>age: </label>',
			'<span>' + data.age + '</span>&nbsp;',
			'<input class="edit" type="button" value="edit">',
			'<input class="delete" type="button" value="delete">',
		'</li>'
	);
}
function searchFormatContactItemTpl(data){
	return generateTpl(
		'<li>',
			'<input type="hidden" pid="' + data.id + '">',
			'<label>name: </label>',
			'<span>' + data.name + '</span>&nbsp;',
			'<label>phone: </label>',
			'<span>' + data.phone + '</span>&nbsp',	
			'<label>age: </label>',
			'<span>' + data.age + '</span>&nbsp;',
			'<input class="hide" type="button" value="hide">',
		'</li>'
	);
}


var indicate = {
	show: function (msg) {
		var el = $('#indicator');
		el.text(msg).show();
		return el;
	},
	hide: function () {
		$('#indicator').hide();
	}
}

function generateTpl () {
	return Array.prototype.slice.call(arguments, 0).join('');
}

function log () {
	console.log.apply(console, arguments);
}




/*
主函数
直接调用init方法
*/
function Application() {
	this.init();
}

Application.prototype = {
	init: function () {
		log('>>>app init');
		var me = this;
		//初始化model。
		this.contactsModel = new ContactsModel();
		//初始化view。
		this.view = new ContactsView();
		//初始化controler
		this.controller = new ContactsController(this.view, this.contactsModel);

		$('#insert-btn').on('click',function(event){
			event.preventDefault();
			event.stopPropagation();
			var str= '插入新联系人';
			me.view.fire('insert.click',[str]);
		});
		$('#search-btn').on('click',function(event){
			event.preventDefault();
			event.stopPropagation();
			var str= '查找联系人';
			me.view.fire('search.click',[str]);
		});
		
	},

	startup: function () {
		this.controller.showContacts();
	}
};

//@controller
//controller有两个实例变量view和mode，分别连接view模块和model模块
//绑定各事件
function ContactsController (view, mode) {
	//
	this.view = view;
	this.model = mode;

	// this.view.bind('edit', bind(this.onViewEdit, this));
	this.view.bind('edit.click', this.onViewEdit, this);
	this.view.bind('edit.submit', this.onViewSubmit, this);

	//对delete按钮绑定事件
	this.view.bind('delete.click', this.onViewDeleteClick, this);
	this.view.bind('delete.submit',this.onViewDeleteSubmit,this);
	
	//针对insert-click,和insert-submit事件进行绑定
	this.view.bind('insert.click', this.onViewInsertClick, this);
	this.view.bind('insert.submit', this.onViewInsertSubmit, this);

	//对search按钮进行事件绑定
	this.view.bind('search.click', this.onviewSearchClick, this);
	this.view.bind('search.submit', this.onviewSearchSubmit, this);
}

//当事件被触发时，相应的处理方法被调用
ContactsController.prototype = {
	onviewSearchClick : function(){
		var me = this;
		this.view.showSearchForm();
	},
	onviewSearchSubmit : function(name, callback){
		var me = this;
		log(">>>onviewSearchSubmit");

		this.model.search(name, function(success, datalist){
			log("onviewSearchSubmit model search" + datalist);

			callback(success, datalist);
		});
	},

	onViewInsertClick : function(msg){
		var me =this;
		log('>>> controller onViewInsertClick');

		alert(msg);
		this.view.showInsertForm();
	},
	onViewInsertSubmit :  function (data, callback) {
		var me =this;
		log('>>> controller on view Submit');
		//udpate
		this.model.insert(data, function (success, lastData) {
			callback(success, lastData);
		});
	},

	onViewEdit : function (id) {
		log('>>> controller on view edit');
		
		var contactData = this.model.fetch(id)
		
		this.view.showEditForm(contactData)

	},	
	onViewSubmit : function (data, callback) {
		var me =this;
		log('>>> controller on view Submit');
			
		//udpate
		this.model.update(data, function (success, lastData) {
			callback(success, lastData);
		});
		log('<<< controller');
	},
	onViewDeleteClick : function (id) {
		var me =this;
		log('>>> controller onViewDelete');

		var contactData = this.model.fetch(id)
		
		this.view.showDeleteForm(contactData)
	},
	onViewDeleteSubmit : function(data, callback){
		//udpate
		this.model.delete(data, function (success, lastData) {
			callback(success, lastData);
		});
		log('<<< controller');
	},
	showContacts : function () {
		var me = this;
		//get contacts data
		var dataList = this.model.fetch('all', function (dataList) {
			log('>>>controller showContacts');
			me.view.listContacts(dataList);
		});
	}
}

function formatForm(form){

		var $form = $(form).css({
			position: 'absolute',
			border: '1px solid'
		}).appendTo($('#container'));

		$form.css({
			left: ($(window).width() - $form.width()) / 2
		});
	return $form;
}
//view模块继承观察着类，拥有观察着类的fire(),bind()方法，并拥有自己的showeditform,listcontacts(),updatesuccess(),updatefailed方法。
//实现show**Form方法
ContactsView = Class.extend(Observable, {
	showSearchForm : function(){
		var me = this;
		var tpl = formatContactSearchFormTpl();

		var $form = formatForm(tpl);

		$form.on('submit', function (event) {
			event.preventDefault();
			event.stopPropagation();

			var search_name = $(this).find('input[name="name"]').val();
			log(">>>showDeleteForm")
			log(search_name);

			me.fire('search.submit', [search_name, function (success, datalist) {

				success ?  me.onSearchSuccess(search_name) : me.onSearchFail();
				
				log(datalist);
				var stpl = "",$items;
				$.each(datalist,function(index, value){
					tpl = searchFormatContactItemTpl(value);
					
					var $form = formatForm(tpl);

				$hide_btn = $form.find('input[class="hide"]');
				$find_me = $form.find('li');
				$hide_btn.click(function () {
				log($find_me);
				log($form);
					$form.hide();
				});
			});
			}]);

			indicate.show('searching');

			$(this).hide();
		});
	},
	showDeleteForm : function(data){
		var me = this;
		var tpl = formatContactDeleteFormTpl(data);

		var $form = formatForm(tpl);

		$form.on('submit', function (event) {
			event.preventDefault();
			event.stopPropagation();
			log(">>>showDeleteForm")
			log(data);

			me.fire('delete.submit', [data, function (success, lastData) {

				success ?  me.onUpdateSuccess(data) : me.onUpdateFail(data);
				var id = lastData.id;
				var li = $('input[pid="' + id + '"]').closest('li');
				log(li);
				li.remove();
			}]);

			indicate.show('Deleting');

			$(this).hide();
		});
	},
	showInsertForm : function(){
		var me = this;
		var tpl = formatContactInsertFormTpl();
		var data = {};

		var $form = formatForm(tpl);

		$form.on('submit', function (event) {

			event.preventDefault();
			event.stopPropagation();

			data.id = $(this).find('input[name="id"]').val();
			data.name = $(this).find('input[name="name"]').val();
			data.phone = $(this).find('input[name="phone"]').val();
			data.age = $(this).find('input[name="age"]').val();

			log(data);

			var $edit_btn, $delete_btn, $item;
			me.fire('insert.submit', [data, function (success, lastData) {

				success ?  me.onUpdateSuccess(data) : me.onUpdateFail(data);
				$item = $(insertFormatContactItemTpl(lastData));
				$('ul').append($item);
				$edit_btn = $item.find('input[class="edit"]');
				$delete_btn = $item.find('input[class="delete"]');

				$edit_btn.click(function () {
					log('view fire edit event');
					me.fire('edit.click', [lastData.id]);
					});
				$delete_btn.click(function () {
					log('view fire edit event');
					me.fire('delete.click', [lastData.id]);
					});
			}]);

			indicate.show('inserting');

			$(this).hide();
		});

	},

	showEditForm: function (data) {
		//显示修改框
		var me = this;
		var tpl = formatContactEditFormTpl(data);

		var $form = formatForm(tpl);

		//end
		//点击OK按钮触发动作
		$form.on('submit', function (event) {
			event.preventDefault();
			event.stopPropagation();
			
			alert(data);
			// data.id = $(this).find('input[name="id"]').val();
			data.name = $(this).find('input[name="name"]').val();
			data.phone = $(this).find('input[name="phone"]').val();
			data.age = $(this).find('input[name="age"]').val();
			alert(data.name);

			console.info('view fire edit.submit event with data ', data);
			//触发事件，传入事件名和处理方法和相应数据
			me.fire('edit.submit', [data, function (success, lastData) {

				success ?  me.onUpdateSuccess(data) : me.onUpdateFail(data);

				var id = lastData.id;
				var li = $('input[pid="' + id + '"]').closest('li');
				li.empty().append(editFormatContactItemTpl(lastData));

				$edit_btn = li.find('input[class="edit"]');
				$delete_btn = li.find('input[class="delete"]');

				$edit_btn.click(function () {
					log('view fire edit event');
					me.fire('edit.click', [lastData.id]);
					});
				$delete_btn.click(function () {
					log('view fire edit event');
					me.fire('delete.click', [lastData.id]);
					});
				}]);

			indicate.show('saving');

			$(this).hide();
		});

	},
	listContacts: function (dataList) {

		log('>>>view list ', dataList);

		var me = this;
		var ul = $('#contacts'), $item, $edit_btn, $delete_btn;

		$.each(dataList, function (index, value) {
			console.info(value);
			var tpl = listFormatContactItemTpl(value);

			$item = $(tpl);
			$item.appendTo(ul);
			log($item);

			$edit_btn = $item.find('input[class="edit"]');
			$delete_btn = $item.find('input[class="delete"]');

			$edit_btn.click(function () {
				log('view fire edit event');
				me.fire('edit.click', [value.id]);
			});
			$delete_btn.click(function () {
				log('view fire edit event');
				me.fire('delete.click', [value.id]);
			});
		});
	},

	onDeleteFail: function () {
	},

	onDeleteSuccess: function (data) {

		indicate.show('delete ' + data.id + ' success').fadeOut();
	},
	onUpdateFail: function () {
	},

	onUpdateSuccess: function (data) {

		indicate.show('save ' + data.id + ' success').fadeOut();
	},
	onSearchFail: function(){

	},
	onSearchSuccess :function(name){
		indicate.show('search' + name + 'success').fadeOut();
	}

});

//@Model
//

function ContactsModel () {

}
//model方法有获取数据的方法fetch（）
//有更新数据的方法update（）
ContactsModel.prototype = {
	fetch: function (id, callback) {
		log('>>> model fetch');

		return (!id || id==='all') ? dao.list(callback) : dao.findById(id);
	},

	update: function (data, callback) {
		log('>>> model update with ', data);

		dao.update(data, callback);

	},
	insert: function(data, callback){
		dao.update(data, callback);
	},
	delete: function(data, callback){
		dao.delete(data, callback);
	},
	search: function(name, callback){
		log(">>>model search");
		return dao.search(name, callback);
	}
};


		
