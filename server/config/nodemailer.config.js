import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const user = process.env.USER;
const pass = process.env.PASSFORAPP;

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
});

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");

  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Молимо вас верификујте свој налог",
      html: `<h1>Верификација имејла</h1>
          <h2>Ћао ${name}</h2>
          <p>Хвала што користите апликацију. Молимо Вас потврдите свој имејл кликом на следећи линк</p>
     
          <a href=http://localhost:3000/confirm/${confirmationCode}> Кликните овдје</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
