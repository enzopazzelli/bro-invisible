import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, mensaje } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail', // o el servicio que estés utilizando
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
        return res.status(500).json({ error: 'Ocurrió un error al enviar el correo.' });
      } 
      console.log('Email enviado: ' + info.response);
      res.status(200).send('Email enviado: ' + info.response);
    });
  } else {
    res.status(404).send();
  }
}
