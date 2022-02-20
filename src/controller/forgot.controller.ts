import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { getRepository } from 'typeorm';
import { Reset } from '../entity/reset.entity';

export const Forgot = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = Math.random().toString(20).substring(2, 12);

        await getRepository(Reset).save({
            email,
            token,
        });

        const transporter = createTransport({
            host: '0.0.0.0',
            port: 1025,
        });

        const url = `http://localhost:3000/reset/${token}`;
        await transporter.sendMail({
            from: 'from@example.com',
            to: email,
            subject: 'Reset Your Password',
            html: `Click <a href="${url}"> here <a/> to reset your Password`,
        });
        res.send({
            message: 'Please check your Email',
        });
    } catch (e) {
        return res.status(401).send({
            message: 'You have entered the Invalid Email',
        });
    }
};
