function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

var localStorage = window.localStorage;
var oper_date = 'undef';
var real_start_date;
var oper_time;

if (localStorage.getItem('oper_time') === null | localStorage.getItem('oper_date') === null | localStorage.getItem('real_start_date') === null){
	localStorage.clear();
}
else{
	oper_time = parseInt(localStorage.getItem('oper_time'));
	console.log(oper_time);
	oper_date = new Date(localStorage.getItem('oper_date'));
	real_start_date = new Date(localStorage.getItem('real_start_date'));
}

function set_default(){
	oper_time = undefined;
	oper_date = 'undef';
	real_start_date = undefined;
	localStorage.clear();
	console.log('cleared')
	document.getElementById('change_oper_time_form').style.visibility = 'hidden';
	document.getElementById('oper_time').innerHTML = '00:00';
	document.getElementById('oper_days').innerHTML = '01';
	document.getElementById('oper_date').innerHTML = '1 января 1970 г.'
}
 
function move_on(){
	form_elm = document.getElementById('change_oper_time_form');
	if (form_elm.style.visibility == 'visible'){
		form_elm.style.visibility = 'hidden';
	}
	else{
		var date = new Date(new Date().toLocaleString('en', {timeZone: 'Asia/Vladivostok'}));
		var day = date.getDate(),
			month = date.getMonth() + 1,
			year = date.getFullYear();
		month = (month < 10 ? "0" : "") + month;
		day = (day < 10 ? "0" : "") + day;

		var today = year + "-" + month + "-" + day;
		document.getElementById('oper_date_in').value = today;
		document.getElementById('oper_hour_in').value = '0';
		document.getElementById('oper_minute_in').value = '0';
		form_elm.style.visibility = 'visible';
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
		oper_date.setHours(real_start_date.getHours());
		oper_date.setMinutes(real_start_date.getMinutes());
		oper_date.setSeconds(real_start_date.getSeconds());
		oper_date.setMilliseconds(real_start_date.getMilliseconds());
		localStorage.setItem('oper_date', oper_date);
		oper_time = days_in * 24 * 3600 * 1000 + hour_in * 3600 * 1000 + minute_in * 60 * 1000;
		localStorage.setItem('oper_time', oper_time);
		form_elm = document.getElementById('change_oper_time_form');
		form_elm.style.visibility = 'hidden';
	}
}

function mouse_out_over(is_over){
	if (is_over & document.getElementById('change_oper_time_form').style.visibility != 'visible'){
		document.getElementById('btn_set').style.visibility = 'hidden';
		
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
		time_diff = new Date().getTime() -  real_start_date.getTime();
		oper_date = new Date(oper_date.getTime() + time_diff);
		oper_time += time_diff;
		console.log(oper_time);
		real_start_date = new Date();
		localStorage.setItem('real_start_date', real_start_date);
		localStorage.setItem('oper_date', oper_date);
		localStorage.setItem('oper_time', oper_time);
		document.getElementById('oper_time').innerHTML = minTwoDigits(parseInt((oper_time / 1000 / 3600) % 24)) + ':' + minTwoDigits(parseInt((oper_time / 1000 / 60) % 60));
		document.getElementById('oper_days').innerHTML = minTwoDigits(parseInt(oper_time / 1000 / 3600 / 24));
		document.getElementById('oper_date').innerHTML = oper_date.toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
		real_start_date = new Date();
	}
}
setInterval(update_time, 1000);