function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
  }

  const announcementId = get('id')

fetch(`http://marcink50.ddns.net:3000/getAnnouncement?id=${announcementId}`)
.then(response => response.json())
.then(data => {
    const announcementTitle = document.getElementById('title-announcement')
    const announcementContent = document.getElementById('content-announcement')
    const announcementPublished = document.getElementById('published-announcement')
    const announcementAuthor = document.getElementById('author-announcement')

    announcementTitle.innerText = data.announcement.title
    announcementContent.innerText = data.announcement.content
    var publishedDate = new Date(data.announcement.date)
    var month = String(publishedDate.getMonth()).padStart(2, '0');
    var day = String(publishedDate.getDate()).padStart(2, '0');
    var hour = String(publishedDate.getUTCHours()).padStart(2, '0');
    var minutes = String(publishedDate.getUTCMinutes()).padStart(2, '0');
    announcementPublished.innerText = `Published at: ${publishedDate.getFullYear()}-${month}-${day} ${hour}:${minutes}`
    announcementAuthor.innerText = `~ ${data.announcement.author}`
})