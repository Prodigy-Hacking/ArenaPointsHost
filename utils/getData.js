const fetch = require('node-fetch');
async function getData(t, uid) {
   try{
    let url = `https://api.prodigygame.com/game-auth-api/jwt/${uid}?token=${t}&userID=${uid}`;
    var tokendata = await (await fetch(url)).json()
    let arenaseason = await (await fetch(`https://api.prodigygame.com/leaderboard-api/user/${uid}/init?userID=${uid}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Bearer ${tokendata.token}`,
        },
    })).json();
    arenaseason = arenaseason.seasonID;
    let rankdata = await (await fetch(`https://api.prodigygame.com/leaderboard-api/season/${arenaseason}/user/${uid}/rank?userID=${uid}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,az;q=0.8,cs;q=0.7",
            "authorization": `Bearer ${tokendata.token}`,
            "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://play.prodigygame.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })).json()
    let points = rankdata.points
    let rank = rankdata.rank
    playerdata = await (await fetch(`https://api.prodigygame.com/game-api/v2/characters/${uid}?fields=appearance%2CisMember%2Cequipment%2Cdata&userID=${uid}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,az;q=0.8,cs;q=0.7",
            "authorization": `Bearer ${tokendata.token}`,
            "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://play.prodigygame.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })).json()
    let namedata = playerdata[uid].appearance.name
    let gameAPIdata = await (await fetch('https://api.prodigygame.com/game-api/status')).json()
     let version = gameAPIdata.data.prodigyGameFlags.gameDataVersion
    let prodigydata = await (await fetch(`https://cdn.prodigygame.com/game/data/production/${version}/data.json`)).json()
    let fullname;
    let fn = prodigydata.name[namedata.first-1].data.value
    if(namedata.nick){
        let nn = prodigydata.nickname[namedata.nick-1].data.value
                fullname = nn.replace('{first}',fn)
    }else{
        let mn = prodigydata.name[namedata.middle-1].data.value
        let ln = prodigydata.name[namedata.last-1].data.value
        fullname = `${fn} ${mn}${ln}`
    }
    let results = [points,rank,fullname]
    return results;
   }catch (e){console.log(`Error: ${e}`)
   log(`Error: ${e}`)}
}
exports.getData = getData;