
import argon from 'argon2'
import Chance from 'chance';
import HttpErrors from 'http-errors';
import jwt from 'jsonwebtoken'

import Account from '../models/account.model.js';

const chance = new Chance()

class AccountRepository {

  retrieveById(id) {
    return Account.findById(id)
  }

  async login(email, password) {
    const account = await Account.findOne({ email: email })

    if (!account) {
      return { err: HttpErrors.Unauthorized() }
    }

    const isPasswordValid = await argon.verify(account.passwordHash, password)

    return isPasswordValid ? { account } : { err: HttpErrors.Unauthorized() }
  }

  validatePassword(password, account) {

  }

  async create(account) {
    account.fourDigits = chance.string({ length: 4, numeric: true })
    account.passwordHash = await argon.hash(account.password)
    delete account.password

    return Account.create(account)
  }

  generateJWT(email, userID) {
    const accessToken = jwt.sign({ email }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_LIFE, issuer: process.env.BASE_URL })
    const refreshToken = jwt.sign({ userID }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_LIFE, issuer: process.env.BASE_URL })

    return { accessToken, refreshToken }
  }

  async validateRefreshToken(email, refreshToken) {


  }

  logout(email) {

  }

  logoutRefresh(refreshToken) {

  }

  transform(account) {
    delete account.passwordHash;
    delete account.__v;
    delete account._id

    return account;
  }
}

export default new AccountRepository();