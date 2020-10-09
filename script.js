function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

var localStorage = window.localStorage;
var oper_start_date;
var oper_date = 'undef';
var real_start_date;
var can_close = true;

if (localStorage.getItem('oper_start_date') === null | localStorage.getItem('oper_date') === null | localStorage.getItem('real_start_date') === null){
	localStorage.clear()
}
else{
	oper_start_date = new Date(localStorage.getItem('oper_start_date'));
	oper_date = new Date(localStorage.getItem('oper_date'));
	real_start_date = new Date(localStorage.getItem('real_start_date'));
}

function set_default(){
	oper_start_date = undefined;
	oper_date = 'undef';
	real_start_date = undefined;
	localStorage.clear();
	console.log('cleared')
	can_close = true;
	document.getElementById('change_oper_time_form').style.visibility = 'hidden';
	document.getElementById('oper_time').innerHTML = '00:00';
	document.getElementById('oper_days').innerHTML = '01';
	document.getElementById('oper_date').innerHTML = '1 января 1970 г.'
}
 
function move_on(){
	form_elm = document.getElementById('change_oper_time_form');
	if (form_elm.style.visibility == 'visible'){
		form_elm.style.visibility = 'hidden';
		can_close = true;
	}
	else{
		form_elm.style.visibility = 'visible';
		can_close = false;
	}
}

function set_oper_time(){
	date_in = document.forms['oper_time_setter']['oper_date_in'].value;
	hour_in = parseInt(document.forms['oper_time_setter']['oper_hour_in'].value);
	minute_in = parseInt(document.forms['oper_time_setter']['oper_minute_in'].value);
	days_in = parseInt(document.forms['oper_time_setter']['oper_days_in'].value);
	if (validate(hour_in, minute_in, days_in)){
		real_start_date = new Date();
		localStorage.setItem('real_start_date', real_start_date);
		oper_date = new Date(date_in);
		oper_date.setHours(hour_in);
		oper_date.setMinutes(minute_in);
		oper_date.setSeconds(real_start_date.getSeconds());
		oper_date.setMilliseconds(real_start_date.getMilliseconds());
		localStorage.setItem('oper_date', oper_date);
		oper_start_date = new Date(new Date(date_in).getTime() + oper_date.getTimezoneOffset() * 60 * 1000 - days_in * 24 * 3600 * 1000);
		localStorage.setItem('oper_start_date', oper_start_date);
		console.log(oper_start_date);
		form_elm = document.getElementById('change_oper_time_form');
		form_elm.style.visibility = 'hidden';
		can_close = true;
	}
}

function mouse_out_over(is_over){
	if (is_over & can_close){
		document.getElementById('btn_set').style.visibility = 'hidden';
		document.getElementById('change_oper_time_form').style.visibility = 'hidden';
		
	}
	else{
		document.getElementById('btn_set').style.visibility = 'visible';
	}
}

function validate(hour_in, minute_in, days_in){
		return (Number.isInteger(hour_in) & Number.isInteger(minute_in) & Number.isInteger(days_in));
}

function update_time(){
	var date = new Date();
	var weeksays = document.getElementsByClassName('weekday');
	weeksays[0].innerHTML = capitalizeFirstLetter(date.toLocaleString('ru', {timeZone: 'Europe/Moscow', weekday: 'long'}));
	weeksays[1].innerHTML = capitalizeFirstLetter(date.toLocaleString('ru', {timeZone: 'Asia/Vladivostok', weekday: 'long'}));
	var times = document.getElementsByClassName('time');
	times[0].innerHTML = date.toLocaleString('ru', {timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', second: '2-digit'});
	times[1].innerHTML = date.toLocaleString('ru', {timeZone: 'Asia/Vladivostok', hour: '2-digit', minute: '2-digit', second: '2-digit'});
	var dates = document.getElementsByClassName('date');
	dates[0].innerHTML = date.toLocaleString('ru', {timeZone: 'Europe/Moscow', day: 'numeric', month: 'long', year: 'numeric'});
	dates[1].innerHTML = date.toLocaleString('ru', {timeZone: 'Asia/Vladivostok', day: 'numeric', month: 'long', year: 'numeric'});
	if (oper_date == 'undef'){
		document.getElementById('oper_date').innerHTML = date.toLocaleString('ru', {timeZone: 'Asia/Vladivostok', day: 'numeric', month: 'long', year: 'numeric'});
	}
	else{
		oper_date = new Date(oper_date.getTime() + (new Date().getTime() -  real_start_date.getTime()));
		real_start_date = new Date();
		localStorage.setItem('real_start_date', real_start_date);
		localStorage.setItem('oper_date', oper_date);
		document.getElementById('oper_date').innerHTML = oper_date.toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
		document.getElementById('oper_time').innerHTML = oper_date.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'});
		document.getElementById('oper_days').innerHTML = minTwoDigits(parseInt((oper_date.getTime() - oper_start_date.getTime()) / 1000 / 60 / 60 / 24));
	}
}
setInterval(update_time, 1000);