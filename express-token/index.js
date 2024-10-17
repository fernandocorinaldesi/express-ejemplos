const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Clave secreta para firmar el JWT (debe estar protegida en un entorno real)
const SECRET_KEY = 'mi_clave_secreta';

// Credenciales hardcodeadas (para el ejemplo)
const hardcodedUsername = 'usuario';
const hardcodedPassword = 'contrasena';

// Endpoint de login que genera el token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificación de credenciales
    if (username === hardcodedUsername && password === hardcodedPassword) {
        // Crear el payload con datos del usuario
        const payload = {
            username: username,
            role: 'usuario_normal',
            endpoint : '/datos'
            // Ejemplo de datos adicionales
        };

        // Generar el token (válido por 1 hora)
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        // Devolver el token en la respuesta
        res.json({ token });
    } else {
        // Si las credenciales no son válidas
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

// Middleware para verificar el token en los endpoints protegidos
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    // Verificación del token
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user; // Guardar los datos del usuario en la request
        next();
    });
};

const validarRuta = (req,res,next)=>{
    const endpoint = req.user.endpoint
    const ruta = req.path
    if(endpoint === ruta){
     return next()
    }else{
     return res.status(403).json({ message: 'No autorizado' });
    }
}

// Endpoints protegidos que requieren el token para acceder
app.get('/datos', verifyToken, (req, res) => {
    return res.json({ message: 'Este es un dato protegido', user: req.user });
});

app.get('/informacion', verifyToken, validarRuta, (req, res) => {
    return res.json({ message: 'Información exclusiva', user: req.user });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});