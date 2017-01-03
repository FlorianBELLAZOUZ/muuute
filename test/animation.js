const Should = require('chai').Should()
const Mute = require('..')
const Animation = require('../lib/animation')
const {assign,log} = require('../lib/funcs')
const Tween = require('tween.js')

describe('animation', ()=>{
  const standard = {
    duration:1000,
    iterations:1,
    delay:0,
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
      keys:[10,-290],
    },
    {property:'sdf',},
    {},
    {delay:1000},
  ]

  describe('.toDefault :: animations:ArrayAnimation=>animations:ArrayAnimation',()=>{
    it('should return',()=>{
      const expected = [
        assign({},standard,animations[0]),
        assign({},standard,animations[1]),
      ]
      Animation.toDefault(animations).should.be.deep.equal(expected)
    })
  })

  describe('.toTween :: animations:ArrayAnimation=>obj:Object=>tweens:ArrayTween',()=>{
    const duration = 1000

    it('should mute',()=>{
      let obj = {x:0,y:0}

      const animationsMute = [
        assign({},standard,animations[0]),
        assign({},standard,animations[1]),
      ]

      Animation.toTween(animationsMute)(obj)
      Mute.update(10**20)
      obj.x.should.be.equal(300)
      obj.y.should.be.equal(-290)
    })

    it.skip('should mute nested object',()=>{
      let obj = {scale:{x:0,y:0}}

      const animations = [
        assign({},standard,{property:'scale.x',keys:[100,200]}),
      ]

      Animation.toTween(animations)(obj)
      Mute.update(10**20)
      obj.scale.x.should.be.equal(200)
    })

    it('should iterate',()=>{
      let obj = {x:0,y:0}

      const animations = [
        assign({},standard,{property:'x',keys:[100,200],
        iterations:Infinity,duration}),
      ]

      Animation.toTween(animations)(obj)
      Mute.update(Tween.now()+duration*1)
      Mute.update(Tween.now()+duration*2)
      Mute.update(Tween.now()+duration*2.5)

      Math.round(obj.x).should.be.equal(150)
    })

    it('should delay',()=>{
      let obj = {x:0,y:0}
      const delay = 10000

      const animations = [
        assign({},standard,{property:'x',keys:[100,200],duration,delay}),
      ]

      const tweens = Animation.toTween(animations)(obj)
      Mute.update(Tween.now()+delay*0.5)
      obj.x.should.be.equal(0)
      Mute.update(Tween.now()+delay+duration)
      obj.x.should.be.equal(200)
    })
  })
})
