require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;




// Middleware para procesar datos en formato JSON
app.use(bodyParser.json());

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Ruta POST para enviar correos
app.post("/send-email", (req, res) => {
  const { subject, content } = req.body;

  if (!subject || !content) {
    return res.status(400).send("El asunto y el contenido son requeridos.");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject,
    text: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar correo:", error);
      return res.status(500).send("Error al enviar el correo.");
    }
    res.status(200).send("Correo enviado con éxito.");
  });
});

// Manejador de rutas no encontradas (otras que no sean POST /send-email)
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada o método incorrecto. Solo se permiten solicitudes POST en /send-email.");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.EMAIL_PASSWORD);

transporter.verify((error, success) => {
  if (error) {
    console.error("Error de transporte:", error);
  } else {
    console.log("El servidor está listo para enviar correos:", success);
  }
});



