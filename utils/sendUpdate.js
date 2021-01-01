const webhook = require('../config/webhook.json').webook
const fetch = require('node-fetch')
async function sendUpdate(usn,pts,rank,uid,s){    
  let message = s ? `User ${usn} (${uid}) got 100 arena points.`:`Arena points addition for user ${usn} (${uid}) failed.`  
  fetch(
        webhook,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'Clankboot',
            avatar_url:
              'https://media.discordapp.net/attachments/738430137439354912/791055492859691037/npc-face-clankboot-removebg-preview.png',
            embeds: [
              {
                title: `Update for user ${usn} (${uid})`,
                description: message,
                fields: [
                  {
                    name: `Points:`,
                    value: pts,
                  },
                  {
                    name: 'Rank;',
                    value: rank,
                  },
                ],
              },
            ],
          }),
        }
      );
}
exports.sendUpdate = sendUpdate