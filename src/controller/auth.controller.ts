import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) =>
{
  const body = req.body;
  if (body.password !== body.password_confirm)
  {
    return res.status(400).send({
      message: "Passwords do not Match"
    });
  }

  const user = await getRepository(User).save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 12)
  });
  res.send(user);
};

export const Login = async (req: Request, res: Response) =>
{
  const user = await getRepository(User).findOne({
    email: req.body.email
  });

  if (!user)
  {
    return res.status(400).send({
      message: "Invalid Credentials"
    });
  }

  if (!(await bcryptjs.compare(req.body.password, user.password)))
  {
    return res.status(400).send({
      message: "Invalid Credentials"
    });
  }

  const accessToken = sign({
    id: user.id
  }, process.env.ACCESS_SECRET || '', {expiresIn: '30s'});

  const refreshToken = sign({
    id: user.id
  }, process.env.REFRESH_SECRET || '', {expiresIn: '1w'});

  res.cookie('access_secret', accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.send({
    message: "Successfully Authenciated"
  });
};