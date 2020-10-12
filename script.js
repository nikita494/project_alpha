var oper_start_date;
var oper_date;
var real_start_date;
//if (window.localStorage.getItem('oper_start_date') & window.localStorage.getItem('oper_date') & window.localStorage.getItem('real_start_date')){
//	oper_start_date = new Date(window.localStorage.getItem('oper_start_date'));
//	oper_date = new Date(window.localStorage.getItem('oper_date'));
//	real_start_date = new Date(window.localStorage.getItem('real_start_date'));
//}
//else{
//	window.localStorage.clear();
//}

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" &&
           isFinite(value) &&
           Math.floor(value) === value;
};

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

function validate(days, hour, minutes){
	return (!isNaN(days) & !isNaN(hour) & !isNaN(minutes));
}

$("#main").mouseenter(function(){
	if ($("#change_oper_time_form").css('visibility') == 'hidden'){
		$("#btn_set").css('visibility', 'hidden');
	}
});

$("#main").mouseleave(function(){
	$("#btn_set").css('visibility', 'visible');
});

$("#btn_set").click(function(){
	if ($("#change_oper_time_form").css('visibility') == 'hidden'){
		$("#change_oper_time_form").css('visibility', 'visible');
		var date = new Date();

	var day = date.getDate();
	var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var min  = date.getMinutes();

	month = (month < 10 ? "0" : "") + month;
	day = (day < 10 ? "0" : "") + day;
	hour = (hour < 10 ? "0" : "") + hour;
	min = (min < 10 ? "0" : "") + min;

	var today = year + "-" + month + "-" + day;
	$('#oper_date_in').val(today);
	$('#oper_hour_in').val(hour);
	$('#oper_minute_in').val(min)
	}
	else{
		$("#change_oper_time_form").css('visibility', 'hidden');
	}
});

$("#close_btn").click(function(){
	$("#change_oper_time_form").css('visibility', 'hidden');
});

$("#clear_btn").click(function(){
	//window.localStorage.clear();
	oper_date = undefined;
	real_start_date = undefined;
	oper_start_date = undefined;
	$('#oper_time').text('00:00');
	$('#oper_days').text('01');
	$("#change_oper_time_form").css('visibility', 'hidden');
});

$('#confirm_btn').click(function(){
	date = document.forms['oper_time_setter']['oper_date_in'].value;
	days = document.forms['oper_time_setter']['oper_days_in'].value;
	hours = document.forms['oper_time_setter']['oper_hour_in'].value;
	minutes = document.forms['oper_time_setter']['oper_minute_in'].value;
	if (validate(days, hours, minutes)){
		real_start_date = new Date();
		//window.localStorage.setItem("real_start_date", real_start_date);
		oper_date = new Date(date);
		oper_start_date = new Date(oper_date.getTime() + oper_date.getTimezoneOffset() * 60 * 1000 - days * 24 * 60 * 60 * 1000);
		//window.localStorage.setItem("oper_start_date", oper_start_date);
		oper_date.setHours(hours);
		oper_date.setMinutes(minutes);
		oper_date.setSeconds(real_start_date.getSeconds());
		oper_date.setMilliseconds(real_start_date.getMilliseconds());
		//window.localStorage.setItem('oper_date', oper_date);
		$("#change_oper_time_form").css('visibility', 'hidden');
	}
	else{
		alert('Неккоректные данные');
	}
});

function updateTime(){
	date = new Date();
	$('#khsk .weekday').text(date.toLocaleString('ru', {timeZone: "Asia/Vladivostok", weekday: 'long'}).split(', ')[0]);
	$('#khsk .time').text(date.toLocaleString('ru', {timeZone: 'Asia/Vladivostok', hour: '2-digit', minute: '2-digit', second: '2-digit'}));
	$('#khsk .date').text(date.toLocaleString('ru', {timeZone: "Asia/Vladivostok", day: '2-digit', month: 'long', year: 'numeric'}));
	$('#msc .weekday').text(date.toLocaleString('ru', {timeZone: "Europe/Moscow", weekday: 'long'}).split(', ')[0]);
	$('#msc .time').text(date.toLocaleString('ru', {timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', second: '2-digit'}));
	$('#msc .date').text(date.toLocaleString('ru', {timeZone: "Europe/Moscow", day: '2-digit', month: 'long', year: 'numeric'}));
	if (oper_date){
		oper_date = new Date(oper_date.getTime() + (date.getTime() - real_start_date.getTime()));
		//window.localStorage.setItem('oper_date', oper_date);
		real_start_date = date;
		//window.localStorage.setItem('real_start_date', real_start_date);
		$('#oper_time').text(minTwoDigits(oper_date.getHours()) + ':' + minTwoDigits(oper_date.getMinutes()));
		$('#oper_date').text(oper_date.toLocaleString('ru', {day: '2-digit', month: 'long', year: 'numeric'}));
		$('#oper_days').text(minTwoDigits(parseInt((oper_date.getTime() - oper_start_date.getTime()) / 1000 / 60 / 60 / 24)));
	}
	else{
		$('#oper_date').text(date.toLocaleString('ru', {timeZone: "Asia/Vladivostok", day: '2-digit', month: 'long', year: 'numeric'}));
	}
}

$("#change_oper_time_form, #btn_set").css('visibility', 'hidden');
setInterval(updateTime, 1000);