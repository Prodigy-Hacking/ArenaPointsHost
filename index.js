"use strict";
try{
(async () => {
    const express = require('express')
const fetch = require('node-fetch')
const log = require('./utils/logger').log
const clearlog = require('./utils/logger').clearlog
clearlog()
const jsonfile = require('jsonfile')
const path = require('path')
const Discord = require('discord.js')
const key = require('./config/key.json').key
const rateLimit = require('express-rate-limit')
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./utils/tokenify/index");
const app = express()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 1 ,
    message:
    "You are being ratelimited."
  });
app.use("/gen/", limiter);
app.get('/JS/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/JS/${req.params.file}`));
})
app.get('/CSS/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/CSS/${req.params.file}`));
})

app.get('/IMG/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/IMG/${req.params.file}`));
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + `/HTML/index.html`));
    
})

app.post('/gen/', function (req, res) {
    if (!req.headers.body) {
        res.status(400)
        res.send({code: 400, message: "ERR_MISSING_BODY"})
    } else {
        let creds = JSON.parse(req.headers.body)
        if (creds.length != 2) {
            res.status(400)
            res.send({code: 400, message: "ERR_BAD_PARAM"})

        } else {
                _1.tokenify(creds[0],creds[1]).then(x =>{
                    if(!x){
                        res.status(403)
                        res.send({code: 403, message: "ERR_BAD_CREDS"})
                        console.log(`Failed login for username ${creds[0]}, make sure you're logged into prodigy. `)
                        log(`Failed login for username ${creds[0]}.`)
                        
                    }else{res.status(200)
                    res.send({code:200,message:"OK"})
                     console.log(`Successful login for username ${creds[0]}.`)
                     log(`Successful login for username ${creds[0]}.`)
                    let loop = setInterval(async function(){
                        _1.tokenify(creds[0],creds[1]).then(x => {
                          if(!x){
                              console.log(`Failed login for username ${creds[0]}, terminating process.`)
                              log(`Failed login for username ${creds[0]}, terminating process.`)
                              clearInterval(loop)
                          }else{
                            let token = x.authToken
                            let id = x.userID 
                            const genPoints = require('./utils/arenaPoints').genPoints
                                genPoints(token,id)
                          }
                        })
               },240000 + Math.round(Math.random()*15000))
                }

                })
             
            
        }   
    }
})

app.get('/logs/',function(req,res){
if(!req.query.key){
    res.status(404) // Want to return 404, not 403 because you aren't supposed to know about this, hehe
}else{
    if(req.query.key != key){
        res.status(404)
    }else{
        let arr = jsonfile.readFileSync('./logging/logs.json')
        res.status(200)
        res.send(arr.join('\n\n'))
    }
}
})

app.listen(8080,'45.82.72.120', () => {
    console.log(`Site is up on port 8080`)
    log(`Site is up on port 8080`)
})
})()
}catch (e){
console.log(`Error: ${e}`)
log(`Error: ${e}`)
}
