const express = require('express')
const app = express()
const client = require('./conexion-bd')
app.use(express.json())


client.connect()
    .then(() => console.log("Conexión exitosa a PostgreSQL"))
    .catch(err => console.error("Error de conexión", err.stack));


app.get('/prueba', (req, res) => {
    // Ejecutar la consulta SQL
    client.query('SELECT * FROM public.prueba', (err, result) => {
        if (err) {
            // Si hay un error, respondemos con un código 500 y el mensaje de error
            return res.status(500).json({ message: 'Error al consultar la base de datos', error: err.stack });
        }

        // Si la consulta fue exitosa, devolvemos los resultados como respuesta
        res.status(200).json(result.rows);
    });
});

app.listen(5000, () => {
    console.log("servidor conectado")
})