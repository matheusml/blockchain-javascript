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
        return sha256(this.index + this.previousHash + this.data + this.timestamp).toString()
    }
}

class Blockchain {
    constructor() {
        this.blocks = [new Block()]
        this.index = 1
    }

    getLastBlock() {
        return this.blocks[this.blocks.length - 1]
    }

    addBlock(data) {
        const index = this.index
        const previousHash = this.getLastBlock().hash

        const block = new Block(index, previousHash, data)

        this.index = this.index + 1
        this.blocks.push(block)
    }

    isValid() {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i]
            const previousBlock = this.blocks[i - 1]

            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }
}

const blockchain = new Blockchain()
blockchain.addBlock('Foo')
blockchain.addBlock('Bar')
console.log(blockchain)