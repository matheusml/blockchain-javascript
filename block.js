const sha256 = require('crypto-js/sha256')

class Block {
    constructor(index = 0, previousHash = null, data = 'Genesis block') {
        this.index = index
        this.previousHash = previousHash
        this.data = data
        this.timestamp = new Date().getTime()
        this.hash = this.generateHash()
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp).toString()
    }
}

module.exports = Block