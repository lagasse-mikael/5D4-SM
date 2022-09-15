
import argon from 'argon2'
import Chance from 'chance';
import HttpErrors from 'http-errors';

import Account from '../models/account.model.js';

const chance = new Chance()

class AccountRepository {

  async login(email, password) {
    const account = Account.findOne({ email: email })

    if (!account) {
      return { err: HttpErrors.Unauthorized() }
    }

    const isPasswordValid = await argon.verify(password, account.passwordHash)

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

  generateJWT(account, needNewRefresh = true) {

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