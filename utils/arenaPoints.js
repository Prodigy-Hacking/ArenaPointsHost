const fetch = require('node-fetch');
const getData = require('./getData').getData
const sendUpdate = require('./sendUpdate.js').sendUpdate
async function genPoints(t,uid){
    let url = `https://api.prodigygame.com/game-auth-api/jwt/${uid}?token=${t}&userID=${uid}`
    let userID = uid
    var tokendata = await (await fetch(url)).json()
    let arenaseason = await (await fetch(`https://api.prodigygame.com/leaderboard-api/user/${userID}/init?userID=${userID}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Bearer ${tokendata.token}`,
        },
    })).json();
    arenaseason = arenaseason.seasonID;
    var tokendata = await (await fetch(url)).json()
fetch(("https://api.prodigygame.com/leaderboard-api/season/" + arenaseason + "/user/" + userID + "/pvp?userID=" + userID), {
    headers: {
        "authorization": `Bearer ${tokendata.token}`,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-mode": "cors",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    },
    referrer: "https://play.prodigygame.com/",
    referrerPolicy: "no-referrer-when-downgrade",
    body: ("seasonID=" + arenaseason + "&action=win"),
    method: "POST",
    mode: "cors"
}).then(x => {
   let status = x.status;
   x.text().then(y => {
       console.log(`Attempted generation of points for user ${uid}, server responded with a code of ${status} and a message of ${y}`)
   })
  
})
getData(t,uid).then(x => {
    let points = x[0]
    let rank =  x[1]
    let name = x[2]
    sendUpdate(name,points,rank,uid);
})
}
exports.genPoints = genPoints