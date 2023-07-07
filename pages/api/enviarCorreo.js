import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, mensaje } = req.body;

    // Imprime las credenciales de correo electrónico para verificar que se estén cargando correctamente
    console.log(`Credenciales de correo electrónico: ${process.env.EMAIL_USERNAME} / ${process.env.EMAIL_PASSWORD}`);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Resultado del sorteo del Amigo Invisible',
      text: mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error enviando correo:', error);
        return res.status(500).json({ error: error.message }); // Devuelve el mensaje de error
      } 
      console.log('Email enviado: ' + info.response);
      res.status(200).json({ message: 'Email enviado: ' + info.response });

    });
  } else {
    res.status(404).send();
  }
}
