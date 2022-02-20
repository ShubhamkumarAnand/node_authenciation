import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Reset } from '../entity/reset.entity';

export const Forgot = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = Math.random().toString(20).substring(2, 12);

        const reset = await getRepository(Reset).save({
            email,
            token,
        });
        res.send(reset);
    } catch (e) {
        return res.status(401).send({
            message: 'You have entered the Invalid Email',
        });
    }
};
