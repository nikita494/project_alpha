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

if (localStorage.getItem('oper_start_date') === null | localStorage.getItem('oper_date') === null | localStorage.getItem('real_start_date') === null){
	localStorage.clear()
}
else{
	oper_start_date = new Date(localStorage.getItem('oper_start_date'));
	oper_date = new Date(localStorage.getItem('oper_date'));
	real_start_date = new Date(localStorage.getItem('real_start_date'));
}
 
function move_on(){
	form_elm = document.getElementById('change_oper_time_form');
	if (form_elm.style.visibility == 'visible'){
		form_elm.style.visibility = 'hidden';
	}
	else{
		form_elm.style.visibility = 'visible';
	}
}

function set_oper_time(){
	real_start_date = new Date();
	localStorage.setItem('real_start_date', real_start_date);
	oper_date = new Date(document.forms['oper_time_setter']['oper_date_in'].value);
	oper_date.setHours(document.forms['oper_time_setter']['oper_hour_in'].value);
	oper_date.setMinutes(document.forms['oper_time_setter']['oper_minute_in'].value);
	oper_date.setSeconds(real_start_date.getSeconds());
	oper_date.setMilliseconds(real_start_date.getMilliseconds());
	localStorage.setItem('oper_date', oper_date);
	oper_start_date = new Date(new Date(document.forms['oper_time_setter']['oper_date_in'].value) - 3 * 3600 * 1000 - parseInt(document.forms['oper_time_setter']['oper_days_in'].value) * 24 * 3600 * 1000);
	localStorage.setItem('oper_start_date', oper_start_date);
	console.log(oper_start_date);
	form_elm = document.getElementById('change_oper_time_form');
	form_elm.style.visibility = 'hidden';
}

function mouse_out_over(is_over){
	if (is_over){
		document.getElementById('btn_set').style.visibility = 'hidden';
		document.getElementById('change_oper_time_form').style.visibility = 'hidden';
		
	}
	else{
		document.getElementById('btn_set').style.visibility = 'visible';
	}
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