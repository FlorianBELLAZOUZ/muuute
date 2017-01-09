const Should = require('chai').Should()
const Tween = require('tween.js')
const Linear = Tween.Easing.Linear.None
const Mute = require('..')
const {log,assign} = require('../lib/funcs')

afterEach(Mute.stopAll)

describe('public', ()=>{
  describe('.style',()=>{
    const obj = {x:100,y:100,opacity:0,scale:{x:0,y:0}}

    it('should return',()=>{
      const style = {x:0,y:0,opacity:1,transitions:[{duration:200,property:'x'}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
        {delay:0,duration:0,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:0,property:'opacity',easing:Linear,targetValue:1},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const obj = {x:0,y:0,text:'nice'}
      const style = {x:100,y:200,text:'ok'}

      const expectedStyle = [
        {delay:0,duration:0,property:'text',easing:Linear,targetValue:'ok'},
        {delay:0,duration:0,property:'y',easing:Linear,targetValue:200},
        {delay:0,duration:0,property:'x',easing:Linear,targetValue:100},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transitions:[{duration:200,property:['x','y']}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transitions:[{duration:200,property:['all']}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transitions:[{duration:200,property:'all'}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transitions:[{duration:400},{duration:200,property:'x'}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
        {delay:0,duration:400,property:'y',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transitions:[{duration:200,property:'z'}]}

      const expectedStyle = [
        {delay:0,duration:0,property:'x',easing:Linear,targetValue:0},
        {delay:0,duration:0,property:'y',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,z:0}

      const expectedStyle = [
        {delay:0,duration:0,property:'z',easing:Linear,targetValue:0},
        {delay:0,duration:0,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:0,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {'scale.x':100,'scale.y':100}

      const expectedStyle = [
        {delay:0,duration:0,property:'scale.y',easing:Linear,targetValue:100},
        {delay:0,duration:0,property:'scale.x',easing:Linear,targetValue:100},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const animations = [
        {
          property:'scale.x',
          keys:[100,200,100],
          duration:2000,
          iterations:Infinity,
        }
      ]

      const style = {animations}

      const expectedStyle = [
        {property:'scale.x',keys:[100,200,100],duration:2000,
        iterations:Infinity,delay:0,interpolation:'catmullrom',
        play:true,fill:'forwards',}
      ]

      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const animations = [
        {
          property:'scale.x',
          keys:[100,200,100],
          duration:2000,
          iterations:Infinity,
        }
      ]

      const transitions = [{duration:100,property:'scale.y',}]

      const style = {'scale.y':42,animations,transitions}

      const expectedStyle = [
        {
          property:'scale.x',keys:[100,200,100],duration:2000,
          iterations:Infinity,delay:0,interpolation:'catmullrom',
          play:true,fill:'forwards',
        },
        {
          delay:0,duration:100,property:'scale.y',easing:Linear,
          targetValue:42
        },
      ]

      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const animations = [
        {
          property:'scale.x',
          keys:[100,200,100],
          duration:2000,
          iterations:Infinity,
        }
      ]

      const style = {'scale.x':0,'scale.y':100,animations}

      const expectedStyle = [
        {property:'scale.x',keys:[100,200,100],duration:2000,
          iterations:Infinity,delay:0,interpolation:'catmullrom',
          play:true,fill:'forwards',},
        {delay:0,duration:0,property:'scale.y',easing:Linear,
          targetValue:100}
      ]

      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const animations = [
        {
          property:'scale.x',
          keys:[100,200,100],
          duration:2000,
          iterations:Infinity,
        }
      ]

      const transitions = [{duration:100}]

      const style = {'scale.x':0,'scale.y':100,animations,transitions}

      const expectedStyle = [
        {property:'scale.x',keys:[100,200,100],duration:2000,
          iterations:Infinity,delay:0,interpolation:'catmullrom',
          play:true,fill:'forwards',},
        {delay:0,duration:100,property:'scale.y',easing:Linear,
          targetValue:100}
      ]

      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return empty style',()=>{

      const obj = {scale:{x:0,y:0}}
      const transitions = [{duration:100}]

      const style = {'scale.x':0,'scale.y':0,transitions}

      const expectedStyle = []

      Mute.style(obj,style).__style__.should.be.deep.equal([])
    })
  })

  describe('.muteStyled',()=>{
    it('should mute',()=>{
      const style = [
        {delay:0,duration:0,property:'text',easing:Linear,targetValue:'ok'},
        {delay:0,duration:0,property:'y',easing:Linear,targetValue:200},
        {delay:0,duration:20,property:'x',easing:Linear,targetValue:100},
      ]
      const obj = {x:0,y:0,__style__:style}

      Mute.muteStyled(obj)
      Mute.update(10**10)
      obj.x.should.be.equal(100)
      obj.y.should.be.equal(200)
      obj.text.should.be.equal('ok')
    })

    it('should mute nested object',()=>{
      const style = [
        {delay:0,duration:100,property:'scale.x',easing:Linear,targetValue:200},
        {delay:0,duration:0,property:'scale.y',easing:Linear,targetValue:200},
      ]
      const obj = {scale:{x:0,y:0},__style__:style}

      Mute.muteStyled(obj)
      Mute.update(10**10)
      obj.scale.y.should.be.equal(200)
      obj.scale.x.should.be.equal(200)
    })

    it('should mute nested object with animations',()=>{
      const style = [
        {property:'scale.x',keys:[100,200,100],duration:200,
        iterations:1,delay:0,interpolation:'catmullrom',
        play:true,fill:'forwards',},
        {delay:0,duration:100,property:'scale.y',easing:Linear,
        targetValue: 20}
      ]
      const obj = {scale:{x:0,y:0},__style__:style}

      Mute.muteStyled(obj)
      Mute.update(10**10)
      obj.scale.y.should.be.equal(20)
      obj.scale.x.should.be.equal(100)
    })
  })

  describe('.mute',()=>{
    it('should mute noTransition value with Tween',()=>{
      const style = {x:100,y:0}

      let obj = {x:0,y:0}

      Mute.mute(obj,style)

      Tween.getAll().length.should.be.equal(1)
      Mute.update(10**10)
      obj.x.should.be.equal(100)
    })

    it('should mute value not inTransition and not inObject with Tween',()=>{
      const style = {x:100,y:0,text:'ok'}

      let obj = {x:0,y:0}

      Mute.mute(obj,style)

      Tween.getAll().length.should.be.equal(2)
      Mute.update(10**10)
      obj.x.should.be.equal(100)
      obj.text.should.be.equal('ok')
    })

    it('should mute string',()=>{
      const style = {x:0,y:0,text:'ok'}

      let obj = {x:0,y:0,text:'nice'}

      Mute.mute(obj,style)

      Mute.update(10**10)
      obj.text.should.be.equal('ok')
    })
  })
})
