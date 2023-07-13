const nodemailer = require("nodemailer");

class Mailing {
    constructor() {
    }

    setGmailTransporter(conf) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: conf.from, // sender mail
                pass: conf.password // sender password
            }
        });

        return transporter;
    }

    sendMail(transporter, from, to, subject, content) {
        return new Promise((resolve, reject) => {

            transporter.sendMail({
                from,
                to,
                subject,
                html: content
            }, function (error, info) {
                if (error) {
                    return reject(error);
                }
                return resolve(info);
            });
        });

    }
}

module.exports = Mailing;