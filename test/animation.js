const Should = require('chai').Should()
const Animation = require('../lib/animation')
const {assign,log} = require('../lib/funcs')

describe('animation', ()=>{
  describe('.toDefault :: animations:ArrayAnimation=>animations:ArrayAnimation',()=>{
    it('should return',()=>{
      const standard = {
        duration:1000,
        iterations:1,
        delay:0,
        direction:'normal',
        interpolation:'catmullrom',
        play:true,
        fill:'forwards',
      }

      const animations = [
        {
          property:'x',
          keys:[10,-19,300],
          duration:100,
        },
        {
          property:'y',
          keys:['10','-300'],
        },
        {property:'sdf',},
        {},
        {delay:1000},
      ]

      const expected = [
        assign({},standard,animations[0]),
        assign({},standard,animations[1]),
      ]
      Animation.toDefault(animations).should.be.deep.equal(expected)
    })
  })

  describe.skip('.toTween :: animations:ArrayAnimation=>tweens:ArrayTween',()=>{
    it('should mute')
  })
})
