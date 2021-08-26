var loginButton = document.getElementsByClassName('btn-login-settings')[0]
var username = document.getElementById('username-settings')
var password = document.getElementById('password-settings')

var cardLogin = document.getElementsByClassName('card-login-settings')[0]
var cardSettings = document.getElementsByClassName('card-settings')[0]

function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
  }
var username = get('username')
var usernameText = document.getElementsByClassName('username')[0]

  if(get('username') != undefined) {
    localStorage.setItem('username', get('username'))
  } else {
    username = localStorage.getItem('username')
  }

  usernameText.innerText = username

loginButton.addEventListener('click', () => {
    console.log(username.value)
    console.log(password.value)
    var body = { 
        username: username.value, 
        password: password.value 
    }
    fetch('http://marcink50.ddns.net:3000/getRestrictedUserInfo', {
        method: 'POST',
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.code == 200) {
            
            cardLogin.classList += ' d-none'
            cardSettings.classList = 'card card-primary card-settings'
            document.getElementById('user-name').value = data.username
            document.getElementById('user-email').value = data.email
            var ranks = ['Newbie', 'Novice', 'First Officer', 'Captain', 'Advanced Captain', 'Amazing Pilot']
            function translateRank(rankNumber) {
                switch (rankNumber) {
                    case 0:
                        return ranks[0]
                        break;
                    case 1:
                        return ranks[1]
                        break;
                    case 2:
                        return ranks[2]
                        break;
                    case 3:
                        return ranks[3]
                        break;
                    case 4:
                        return ranks[4]
                        break;
                    case 5:
                        return ranks[5]
                }
            }
            document.getElementById('user-rank').value = translateRank(data.ranking)
            function convertSeconds(sec) {
                let hours = Math.floor(sec / 3600); // get hours
                let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
                let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
                // add 0 if value < 10; Example: 2 => 02
                if (hours < 10) { hours = "0" + hours; }
                if (minutes < 10) { minutes = "0" + minutes; }
                if (seconds < 10) { seconds = "0" + seconds; }
                return `${hours}:${minutes}`; // Return is HH : MM : SS
              }
            document.getElementById('user-time').value = convertSeconds(data.seconds)
        }
    })
})