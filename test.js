const fetch = require('node-fetch');
(async () => {
    let url = `https://api.prodigygame.com/game-auth-api/jwt/15558480?token=8c33b3c7aec571a221a2ac7242fc2012c83d20b53b5dc5dc8066e6c5caefe6d6&userID=15558480`;
    var tokendata = await (await fetch(url)).json()
    console.log(await (await fetch("https://api.prodigygame.com/game-api/v2/characters/15558480?fields=appearance%2CisMember%2Cequipment%2Cdata&userID=15558480", {
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
      })).text())
})()