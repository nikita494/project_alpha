function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

var localStorage = window.localStorage;
var oper_date;
var real_start_date;
var oper_time;
var start_stopwatch_time;
var is_data_loaded = false;
var stopwatch_time = 0;
var is_stopwatch_running = false;
var timeZoneOffset = 0

if (!(localStorage.getItem('oper_time') === null | localStorage.getItem('oper_date') === null | localStorage.getItem('real_start_date') === null)){
	is_data_loaded = true;
	real_start_date = new Date(localStorage.getItem('real_start_date'));
	oper_time = parseInt(localStorage.getItem('oper_time'));
	oper_date = new Date(localStorage.getItem('oper_date'));
}

window.onload = function(e){
	if(!(localStorage.getItem('timeZoneOffset') === null | localStorage.getItem('timezone_label') === null)){
		timeZoneOffset = parseInt(localStorage.getItem('timeZoneOffset'));
		document.getElementById('timezone_label').innerHTML = localStorage.getItem('timezone_label');
	}
}

function hotkey_handler(e){
	elem = document.getElementById('stopwatch');
	console.log(e)
	if (e.key == ' ' & elem.style.display == 'block'){
		start_stop_stopwatch();
	}
	else if (e.key == 'r' & elem.style.display == 'block'){
		reset_stopwatch();
	}
	else if (e.key == 's'){
		open_close_stopwatch();
	}	
}

function set_default(){
	oper_time = undefined;
	oper_date = 'undef';
	real_start_date = undefined;
	localStorage.clear();
	console.log('cleared')
	document.getElementById('change_oper_time_form').style.visibility = 'hidden';
	document.getElementById('oper_time').innerHTML = '00:00';
	document.getElementById('oper_days').innerHTML = '00';
	document.getElementById('oper_date').innerHTML = '1 января 1970 г.'
}
 
function move_on(){
	form_elm = document.getElementById('change_oper_time_form');
	if (form_elm.style.visibility == 'visible'){
		form_elm.style.visibility = 'hidden';
	}
	else{
		var date = new Date();
		var date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + timeZoneOffset);
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

function set_settings(){
	timeZoneOffset = document.forms['settings_form']['timezone'].value * 3600 * 1000 ;
	localStorage.setItem('timeZoneOffset', timeZoneOffset)
	document.getElementById('timezone_label').innerHTML = document.forms['settings_form']['timezone_label'].value
	localStorage.setItem('timezone_label', document.forms['settings_form']['timezone_label'].value)
	open_close_settings()
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
		oper_time = days_in * 24 * 3600 * 1000 + hour_in * 3600 * 1000 + minute_in * 60 * 1000 + real_start_date.getSeconds() * 1000 + real_start_date.getMilliseconds();
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

function start_stop_stopwatch(){
	if (is_stopwatch_running){
		is_stopwatch_running = false;
		document.getElementById('start_stop_btn').innerHTML = '&#9654;';
	}
	else{
		is_stopwatch_running = true;
		start_stopwatch_time = new Date();
		document.getElementById('start_stop_btn').innerHTML = '&#10074; &#10074;';
	}
}

function reset_stopwatch(){
	is_stopwatch_running = false;
	stopwatch_time = 0;
	document.getElementById('start_stop_btn').innerHTML = '&#9654;';
	document.getElementById('stopwatch_hours').innerHTML = '00';
	document.getElementById('stopwatch_minute').innerHTML = '00';
	document.getElementById('stopwatch_seconds').innerHTML = '00';
}

function update_time(){
	var date = new Date();
	var offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + timeZoneOffset)
	var weeksays = document.getElementsByClassName('weekday');
	weeksays[0].innerHTML = capitalizeFirstLetter(date.toLocaleString('ru', {timeZone: 'Europe/Moscow', weekday: 'long'}).split(', ')[0]);
	weeksays[1].innerHTML = capitalizeFirstLetter(offsetDate.toLocaleString('ru', {weekday: 'long'}).split(', ')[0]);
	var times = document.getElementsByClassName('time');
	times[0].innerHTML = date.toLocaleString('ru', {timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', second: '2-digit'});
	times[1].innerHTML = offsetDate.toLocaleString('ru', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
	var dates = document.getElementsByClassName('date');
	dates[0].innerHTML = date.toLocaleString('ru', {timeZone: 'Europe/Moscow', day: 'numeric', month: 'long', year: 'numeric'});
	dates[1].innerHTML = offsetDate.toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
	if (oper_date == 'undef'){
		document.getElementById('oper_date').innerHTML = date.toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
	}
	else{
		if (is_data_loaded){
			oper_time = oper_time - oper_time % 1000 + date.getMilliseconds();
			oper_date.setMilliseconds(date.getMilliseconds());
			real_start_date.setMilliseconds(date.getMilliseconds());
			is_data_loaded = false;
		}
		time_diff = date.getTime() -  real_start_date.getTime();
		curr_time = oper_time + time_diff;
		curr_date = new Date(oper_date.getTime() + time_diff);
		console.log(date.getSeconds() + " " + date.getMilliseconds());
		console.log(parseInt(curr_time / 1000 % 60) + " " + curr_time % 1000);
		document.getElementById('oper_time').innerHTML = minTwoDigits(parseInt((curr_time / 1000 / 3600) % 24)) + ':' + minTwoDigits(parseInt((curr_time / 1000 / 60) % 60));
		document.getElementById('oper_days').innerHTML = minTwoDigits(parseInt(curr_time / 1000 / 3600 / 24));
		document.getElementById('oper_date').innerHTML = curr_date.toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
	}
	if (is_stopwatch_running){
		stopwatch_time += date - start_stopwatch_time;
		document.getElementById('stopwatch_hours').innerHTML = minTwoDigits(parseInt(stopwatch_time / 1000 / 3600));
		document.getElementById('stopwatch_minute').innerHTML = minTwoDigits(parseInt((stopwatch_time / 1000 / 60) % 60));
		document.getElementById('stopwatch_seconds').innerHTML = minTwoDigits(parseInt((stopwatch_time / 1000) % 60));
		start_stopwatch_time = new Date();
	}
}

function open_close_stopwatch(){
	elem = document.getElementById('stopwatch');
	if (elem.style.display == 'none' | elem.style.display == ''){
		elem.style.display = 'block';
		document.getElementById('stopwatch_checkbox').checked = true;
	}
	else{
		elem.style.display = 'none';
		document.getElementById('stopwatch_checkbox').checked = false;
	}
}

function open_close_settings(){
	elem = document.getElementById('settings');
	if (elem.style.display == 'none' | elem.style.display == ''){
		elem.style.display = 'block';
		document.getElementById('settings_checkbox').checked = true;
	}
	else{
		elem.style.display = 'none';
		document.getElementById('settings_checkbox').checked = false;
	}
}

document.onkeypress = hotkey_handler;
setInterval(update_time, 1000);