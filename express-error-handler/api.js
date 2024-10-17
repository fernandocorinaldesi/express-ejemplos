const express = require('express')
const app = express()
const rutaurich = require('./rutaurich')

app.use(express.json())

app.use('/urich', rutaurich)

//ejemplo de error handler
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack:  err.stack 
    })
});




app.listen(4000, () => {
    console.log("escuchando en el puerto 4000")
})