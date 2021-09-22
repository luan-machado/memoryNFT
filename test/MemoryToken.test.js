const { assert } = require('chai')

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  let token

  before(async () => {
    token = await MemoryToken.deployed()
  })

  describe("deployed", async () => {
    it("Success", async () => {
      const address = token.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, "")
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it("HAs name", async () => {
      const name = await token.name()
      assert.equal(name, "Luan Token")
    })
    it("HAs Symbol", async () => {
      const symbol = await token.symbol()
      assert.equal(symbol, "L$N")
    })
  })

  describe("Token DIstribution", async () => {
    let result

    it("MInts TOken", async () => {
      await token.mint(accounts[0], "https://i.picsum.photos/id/972/200/300.jpg?hmac=UMf5f6BV9GkLiz0Xz9kMwm1riiTtlpIG2jt0WrxZ51Q")
      
      //increase total supply
      result = await token.totalSupply()
      assert.equal(result.toString(), '1', 'TOtal Supply is ok')

      //increment owner balance
      result = await token.balanceOf(accounts[0])
      assert.equal(result.toString(), '1', 'balance of is ok')

      //token should belong to owner
      result = await token.ownerOf(1)
      assert.equal(result.toString(), accounts[0].toString(), 'owner of is ok')
      result = await token.tokenOfOwnerByIndex(accounts[0], 0)

      // Owner see al tokens
      let balanceOf = await token.balanceOf(accounts[0])
      let tokenIds = []
      for(let i = 0; i < balanceOf; i++){
        let id = await token.tokenOfOwnerByIndex(accounts[0], i)
        tokenIds.push(id.toString());
      }

      let expected = ['1']
      assert.equal(tokenIds.toString(), expected.toString(), "Token id are correct")

      // TOken URI correct
      let tokenURI = await token.tokenURI('1')
      assert.equal(tokenURI, "https://i.picsum.photos/id/972/200/300.jpg?hmac=UMf5f6BV9GkLiz0Xz9kMwm1riiTtlpIG2jt0WrxZ51Q")

    })
  })
 
})  
