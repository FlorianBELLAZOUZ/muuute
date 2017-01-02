const Should = require('chai').Should()
const Linear = require('tween.js').Easing.Linear.None
const Mute = require('..')
const {log,assign} = require('../lib/funcs')

describe('public', ()=>{
  describe('.style',()=>{
    const obj = {x:100,y:100,opacity:0,scale:{x:0,y:0}}

    it('should return',()=>{
      const style = {x:0,y:0,opacity:1,transition:[{duration:200,property:'x'}]}

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
      const style = {x:0,y:0,transition:[{duration:200,property:['x','y']}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transition:[{duration:200,property:['all']}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transition:[{duration:200,property:'all'}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'y',easing:Linear,targetValue:0},
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transition:[{duration:400},{duration:200,property:'x'}]}

      const expectedStyle = [
        {delay:0,duration:200,property:'x',easing:Linear,targetValue:0},
        {delay:0,duration:400,property:'y',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })

    it('should return',()=>{
      const style = {x:0,y:0,transition:[{duration:200,property:'z'}]}

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
      const style = {'scale.x':0,'scale.y':0}

      const expectedStyle = [
        {delay:0,duration:0,property:'scale.y',easing:Linear,targetValue:0},
        {delay:0,duration:0,property:'scale.x',easing:Linear,targetValue:0},
      ]
      const expected = assign({},obj,{__style__:expectedStyle})

      Mute.style(obj,style).should.be.deep.equal(expected)
    })
  })
})
