const express = require("express")
const app = express()
app.use(express.json())


const db = require('./sequelize')
require('./usuario');

db.sync({
    schema: 'public', searchPath: 'public'
    , alter: true
})
    .then(resultado => { console.log("\u001b[1;34m  [sequelize sync core]" + JSON.stringify(resultado.models)) })
    .catch(error => { throw new Error(error) })



app.listen(4500, () => {
    console.log("el servidor ha iniciado correctamente.")
})