const jsonfile = require('jsonfile')
function log(val){
    const path = './logging/logs.json'
let arr = jsonfile.readFileSync(path)
arr.push(val)
jsonfile.writeFileSync(path, arr)
}
exports.log = log