/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

/* global moment:false */

$(function () {
  'use strict'

  function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
  }

  $('.daterange').daterangepicker({
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate: moment()
  }, function (start, end) {
    // eslint-disable-next-line no-alert
    alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  /* jQueryKnob */
  $('.knob').knob()

  // The Calender
  $('#calendar').datetimepicker({
    format: 'L',
    inline: true
  })

  var eventsBody = document.getElementsByClassName('events')[0]
  var announcementsBody = document.getElementsByClassName('announcements')[0]
  var flewHours = document.getElementsByClassName('flew-hours')[0]
  var usernameText = document.getElementsByClassName('username')[0]
  var greeting = document.getElementsByClassName('greeting')[0]
  var username = get('username')

  if(get('username') != undefined) {
    localStorage.setItem('username', get('username'))
  } else {
    username = localStorage.getItem('username')
  }

  fetch('http://marcink50.ddns.net:3000/getEvents')
  .then(response => response.json())
  .then(data => {
    var events = data.events
    events.forEach(flightEvent => {
      var eventDiv = document.createElement('div')
      var dateFrom = new Date(flightEvent.dateFrom)
      var dateTo = new Date(flightEvent.dateTo)
      dateFrom.setHours(dateFrom.getHours() + 1)
      dateTo.setHours(dateTo.getHours() + 1)
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var dayName = days[dateFrom.getDay()];
      if (dateFrom.getDate() == 1) var dayNumber = "1st" 
      else if (dateFrom.getDate() == 2) var dayNumber = "2nd" 
      else if (dateFrom.getDate() == 3) var dayNumber = "3rd" 
      else var dayNumber = dateFrom.getDate()
      var minutesFrom = String(dateFrom.getMinutes()).padStart(2, '0');
      var minutesTo = String(dateTo.getMinutes()).padStart(2, '0');
      var hoursFrom = String(dateFrom.getUTCHours()).padStart(2, '0');
      var hoursTo = String(dateTo.getUTCHours()).padStart(2, '0');
      eventDiv.innerHTML = `
      <h5 class="font-weight-bold">${flightEvent.title}
        <a href="event.html?id=${flightEvent.id}" class="btn btn-md btn-secondary float-right">More Info
          <span class="fas fa-external-link-alt"></span>
        </a>
      </h5>
      <p>${dayName}, ${dayNumber} ${dateFrom.toLocaleString('en-US', { month: 'long' })} ${dateFrom.getFullYear()}, ${hoursFrom}:${minutesFrom}z - ${hoursTo}:${minutesTo}z</p>`
      eventsBody.append(eventDiv)
    })
  })
  fetch('http://marcink50.ddns.net:3000/getAnnouncements')
  .then(response => response.json())
  .then(data => {
    var announcements = data.announcements
    announcements.forEach(announcement => {
      var announcementDiv = document.createElement('tr')
      var date = new Date(announcement.date)
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      announcementDiv.innerHTML = `
      <td>${date.getFullYear()}-${month}-${day}</td>
      <td><a href="announcement.html?id=${announcement.id}" class="font-weight-bold">${announcement.title}</a></td>
      <td>${announcement.author}</td>`
      announcementsBody.append(announcementDiv)
    })
  })

  function convertSeconds(sec) {
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return `You flew ${hours}:${minutes} hours.`; // Return is HH : MM : SS
  }

  fetch(`http://marcink50.ddns.net:3000/getUserInfo?username=${username}`)
  .then(response => response.json())
  .then(data => {
    var seconds = data.seconds
    flewHours.innerText = convertSeconds(seconds)
    usernameText.innerText = username
    greeting.innerText = `Hello, ${username}!`
  })
})
