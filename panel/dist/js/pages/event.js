function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
  }

  const announcementId = get('id')

fetch(`http://marcink50.ddns.net:3000/getEvent?id=${announcementId}`)
.then(response => response.json())
.then(data => {
    const eventTitle = document.getElementById('title-event')
    const eventDescription = document.getElementById('description-event')
    const eventDate = document.getElementById('date-event')

    eventTitle.innerText = data.event.title
    eventDescription.innerText = data.event.description
    var dateFrom = new Date(data.event.dateFrom)
    var dateTo = new Date(data.event.dateTo)
    var month = String(dateFrom.getMonth() + 1).padStart(2, '0');
    var day = String(dateFrom.getDate()).padStart(2, '0');
    var hourFrom = String(dateFrom.getUTCHours()).padStart(2, '0');
    var minutesFrom = String(dateFrom.getUTCMinutes()).padStart(2, '0');
    var hourTo = String(dateTo.getUTCHours()).padStart(2, '0');
    var minutesTo = String(dateTo.getUTCMinutes()).padStart(2, '0');
    eventDate.innerHTML = `Date: <span class="font-weight-bold">${dateFrom.getFullYear()}-${month}-${day} ${hourFrom}:${minutesFrom}z - ${hourTo}:${minutesTo}z</span>`
})