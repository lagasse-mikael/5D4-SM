import express from 'express';
import httpErrors from 'http-errors';

import accountRepository from '../repositories/account.repository.js';
import accountsValidator from '../validators/accounts.validator.js';

import { guardAuthJWT } from '../middlewares/authorization.jwt.js';
const router = express.Router();

class AccountRoutes {
    // Voir le commentaire dans app.js : use('/accounts',accountRoutes) )
    constructor() {
        router.post('/', this.post);
        router.post('/login', this.login);
        router.post('/refresh', this.refreshToken);
        router.get('/secure', guardAuthJWT, this.secure);
        router.delete('/logout', this.logout);
    }

    async post(req, res, next) {
        try {
            let account = await accountRepository.create(req.body);

            // Object Mongo -> Object JavaScript
            account = account.toObject({ getter: false, virtual: false })
            account = accountRepository.transform(account)

            res.status(201).json(account)
        } catch (err) {
            return next(err);
        }
    }

    async secure(req, res, next) {
        try {
            res.status(200).json(req.auth)
        } catch (err) {
            return next(err)
        }
    }

    async login(req, res, next) {
        // Automatique , je dirais meme quand meme cool
        try {
            const { email, password } = req.body

            const result = await accountRepository.login(email, password)
            if (result.account) {
                let account = result.account.toObject({ getters: false, virtuals: false })
                account = accountRepository.transform(account)

                let token = accountRepository.generateJWT(account.email)
                res.status(201).json({ account, token })
            } else {

            }
        } catch (err) {
            return next(err)
        }
    }

    async refreshToken(req, res, next) { }

    async logout(req, res, next) { }
}

new AccountRoutes();
export default router;
