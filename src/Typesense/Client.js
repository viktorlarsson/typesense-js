'use strict'

import Configuration from './Configuration'
import ApiCall from './ApiCall'
import Collections from './Collections'
import Collection from './Collection'
import Aliases from './Aliases'
import Alias from './Alias'
import Debug from './Debug'

class Client {
  constructor (options) {
    this.configuration = new Configuration(options)
    this._apiCall = new ApiCall(this.configuration)
    this.debug = new Debug(this._apiCall)
    this._collections = new Collections(this._apiCall)
    this._individualCollections = {}
    this._aliases = new Aliases(this._apiCall)
    this._individualAliases = {}
  }

  collections (collectionName) {
    if (collectionName === undefined) {
      return this._collections
    } else {
      if (this._individualCollections[collectionName] === undefined) {
        this._individualCollections[collectionName] = new Collection(collectionName, this._apiCall)
      }
      return this._individualCollections[collectionName]
    }
  }

  aliases (aliasName) {
    if (aliasName === undefined) {
      return this._aliases
    } else {
      if (this._individualAliases[aliasName] === undefined) {
        this._individualAliases[aliasName] = new Alias(aliasName, this._apiCall)
      }
      return this._individualAliases[aliasName]
    }
  }
}

module.exports = Client
