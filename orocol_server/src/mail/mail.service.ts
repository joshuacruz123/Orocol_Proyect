import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'orocolweb@gmail.com',
                pass: 'ynqioaprgoamdmpf', // Contraseña de aplicación
            },
        });
    }

    async enviarCorreosRegistro(correoUsuario: string, nombreUsuario: string): Promise<void> {
        const mailOptions = {
          from: 'orocolweb@gmail.com',
          to: correoUsuario,
          subject: 'Registro exitoso - Orocol',
          text: `Te damos la bienvenida a Orocol, ${nombreUsuario}.
          
    Gracias por registrarte en nuestro sitio web.
    
    Puedes cambiar tu contraseña si es necesario.
    
    Gracias por tu atención.`,
        };
    
        try {
          await this.transporter.sendMail(mailOptions);
          console.log('Correo enviado: ' + correoUsuario);
        } catch (error) {
          console.error('Error al enviar correo:', error);
          throw new Error('Error al enviar correo o correo incorrecto'); 
          // Para validar correos conectarse a una API como SendGrid, hunter.io, Mailgun, NeverBounce, MailboxValidator, etc
        }
      }
}
