(function( $ ){

	var settings = {
		classNames : {
			datepickerInput : 'datepickerInput',
			simpleDatePickerButton: 'simpleDatePickerButton',
			simpleDatePickerView : 'simpleDatePickerView',
			simpleDatePickerYear : 'simpleDatePickerYear',
			simpleDatePickerMonth : 'simpleDatePickerMonth',
			simpleDatePickerDate : 'simpleDatePickerDate',
			simpleDatePickerHour : 'simpleDatePickerHour',
			simpleDatePickerMin : 'simpleDatePickerMin',
			simpleDatePickerSec : 'simpleDatePickerSec',
			arrows : {
				up : 'arrow up',
				down : 'arrow down'
			}
		},
		texts : {
			button : 'Update'
		}
	}
	var elements = {
		base : null,
		text : $('<p />', {class: 'text'}),
		arrowUp : $('<div />', {class: settings.classNames.arrows.up})
								.on("click", function () { methods.arrowUp($(this));})
								.append($('<span />')),
		arrowDown : $('<div />', {class: settings.classNames.arrows.down})
								.on("click", function () { methods.arrowDown($(this));})
								.append($('<span />')),
		button : $('<button />', {class: settings.classNames.simpleDatePickerButton, text:settings.texts.button})
								.on("click", function () { methods.decisionValue($(this));}),
		input : null,
		year : $('<div />', {class: settings.classNames.simpleDatePickerYear}),
		month : $('<div />', {class: settings.classNames.simpleDatePickerMonth}),
		date : $('<div />', {class: settings.classNames.simpleDatePickerDate}),
		hour : $('<div />', {class: settings.classNames.simpleDatePickerHour}),
		min : $('<div />', {class: settings.classNames.simpleDatePickerMin}),
		sec : $('<div />', {class: settings.classNames.simpleDatePickerSec}),

	}


	var values = {
		date : null
	}

	var methods = {
		init : function($element) {
			$('.datepickerInput').prop('disabled', true);
			// すでにピッカーがある場合はDOM作成しない
			if($element.next().hasClass(settings.classNames.simpleDatePickerView)) return; 
			elements.input = $element;
			values.date = new Date($element.val());

			var $html = $();
			elements.base = $('<span />', {class: settings.classNames.simpleDatePickerView});
			var $yearElement = elements.year.clone(true)
									.append(elements.arrowUp.clone(true))
									.append(elements.text.clone(true).html(values.date.getFullYear()))
									.append(elements.arrowDown.clone(true));
			var $monthElement = elements.month.clone(true)
									.append(elements.arrowUp.clone(true))
									.append(elements.text.clone(true).html(values.date.getMonth()+1))
									.append(elements.arrowDown.clone(true));
			var $dateElement = elements.date.clone(true)
									.append(elements.arrowUp.clone(true))
									.append(elements.text.clone(true).html(values.date.getDate()))
									.append(elements.arrowDown.clone(true));
			var $hourElement = elements.hour.clone(true)
									.append(elements.arrowUp.clone(true))
									.append(elements.text.clone(true).html(values.date.getHours()))
									.append(elements.arrowDown.clone(true));
			var $minElement = elements.min.clone(true)
									.append(elements.arrowUp.clone(true))
									.append(elements.text.clone(true).html(values.date.getMinutes()))
									.append(elements.arrowDown.clone(true));
			var $secElement = elements.sec.clone(true)
									.append(elements.arrowUp.clone(true))
									.append(elements.text.clone(true).html(values.date.getSeconds()))
									.append(elements.arrowDown.clone(true));
			$baseElement = elements.base
						.append($yearElement)
						.append($monthElement)
						.append($dateElement)
						.append($hourElement)
						.append($minElement)
						.append($secElement)
						.append(elements.button.clone(true));


			$element.after($baseElement);
		},
		reflectAll : function() {
			$yearText = elements.base.find('.' + settings.classNames.simpleDatePickerYear).children()[1]
			$yearText.textContent = values.date.getFullYear();
			$monthText = elements.base.find('.' + settings.classNames.simpleDatePickerMonth).children()[1]
			$monthText.textContent = values.date.getMonth()+1;
			$dateText = elements.base.find('.' + settings.classNames.simpleDatePickerDate).children()[1]
			$dateText.textContent = values.date.getDate();
			$hourText = elements.base.find('.' + settings.classNames.simpleDatePickerHour).children()[1]
			$hourText.textContent = values.date.getHours();
			$minText = elements.base.find('.' + settings.classNames.simpleDatePickerMin).children()[1]
			$minText.textContent = values.date.getMinutes();
			$secText = elements.base.find('.' + settings.classNames.simpleDatePickerSec).children()[1]
			$secText.textContent = values.date.getSeconds();
		},
		decisionValue : function($element) {
			elements.input.val(this.convetDateToIso(values.date));
			$('.' + settings.classNames.simpleDatePickerView).remove();
			$('.' + settings.classNames.datepickerInput).prop('disabled', false);
		},
		convetDateToIso : function(date) {
			return date.getFullYear()+'-'
				+ (("0"+(date.getMonth() + 1)).slice(-2))+'-'
				+ ("0"+date.getDate()).slice(-2)+'T'
				+ ("0"+date.getHours()).slice(-2)+':'
				+ ("0"+date.getMinutes()).slice(-2)+':'
				+ ("0"+date.getSeconds()).slice(-2);
		},
		upValue : function($text, value) {
			$text.textContent = value + 1;
		},
		downValue : function($text) {
			$text.textContent = value - 1;
		},
		upYear : function($text) {
			values.date.setFullYear(values.date.getFullYear() + 1);
		},
		downYear : function($text) {
			values.date.setFullYear(values.date.getFullYear() - 1);
		},
		upMonth : function($text) {
			values.date.setMonth(values.date.getMonth() + 1);
		},
		downMonth : function($text) {
			values.date.setMonth(values.date.getMonth() - 1);
		},
		upDate : function($text) {
			values.date.setDate(values.date.getDate() + 1);
		},
		downDate : function($text) {
			values.date.setDate(values.date.getDate() - 1);
		},
		upHour : function($text) {
			values.date.setHours(values.date.getHours() + 1);
		},
		downHour : function($text) {
			values.date.setHours(values.date.getHours() - 1);
		},
		upMin : function($text) {
			values.date.setMinutes(values.date.getMinutes() + 1);
		},
		downMin : function($text) {
			values.date.setMinutes(values.date.getMinutes() - 1);
		},
		upSec : function($text) {
			values.date.setSeconds(values.date.getSeconds() + 1);
		},
		downSec : function($text) {
			values.date.setSeconds(values.date.getSeconds() - 1);
		},
		arrowUp : function($element){
			var $picker = $element.parent().first()[0];
			var className = $picker.className;
			var $text = $picker.children[1]
			var value = parseInt($text.innerText)

			switch(className){
				case settings.classNames.simpleDatePickerYear:
					methods.upYear($text);
					break;
				case settings.classNames.simpleDatePickerMonth:
					methods.upMonth($text);
					break;
				case settings.classNames.simpleDatePickerDate:
					methods.upDate($text);
					break;
				case settings.classNames.simpleDatePickerHour:
					methods.upHour($text);
					break;
				case settings.classNames.simpleDatePickerMin:
					methods.upMin($text);
					break;
				case settings.classNames.simpleDatePickerSec:
					methods.upSec($text);
					break;
			}
			methods.reflectAll();
		},
		arrowDown : function($element){
			var $picker = $element.parent().first()[0];
			var className = $picker.className;
			var $text = $picker.children[1]
			var value = parseInt($text.innerText)

			switch(className){
				case settings.classNames.simpleDatePickerYear:
					methods.downYear($text);
					break;
				case settings.classNames.simpleDatePickerMonth:
					methods.downMonth($text);
					break;
				case settings.classNames.simpleDatePickerDate:
					methods.downDate($text);
					break;
				case settings.classNames.simpleDatePickerHour:
					methods.downHour($text);
					break;
				case settings.classNames.simpleDatePickerMin:
					methods.downMin($text);
					break;
				case settings.classNames.simpleDatePickerSec:
					methods.downSec($text);
					break;
			}
			methods.reflectAll();
		},
	};

	$.fn.SimpleDatePicker = function() {

		this.bind("click", function () {
			methods.init($(this));
		});

	};
})( jQuery );
