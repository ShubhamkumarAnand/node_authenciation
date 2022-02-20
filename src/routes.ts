import { Router } from 'express';
import {
    AuthenciatedUser,
    Login,
    Logout,
    Refresh,
    Register,
} from './controller/auth.controller';
import { Forgot } from './controller/forgot.controller';

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthenciatedUser);
    router.post('/api/refresh', Refresh);
    router.post('/api/logout', Logout);
    router.post('/api/forgot', Forgot);
};
