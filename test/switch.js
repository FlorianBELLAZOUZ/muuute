const Switch = require('../lib/switch')
const Should = require('chai').Should()
const Tween = require('tween.js')

describe.only('.switchKernelByProp',()=>{
  it('should apply old style',()=>{
    let el = {x:0,y:0}

    const oldValue = 10
    const runningTween = undefined
    const newStyle = undefined

    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    newEl.x.should.be.equal(10)
  })

  it('should apply running style and transfertTween',()=>{
    let el = {x:0,y:0}

    const oldValue = 10
    const runningTween = new Tween.Tween({x:0}).to({x:100},100).start(0)
    const newStyle = undefined

    runningTween.update(20)
    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    newEl.x.should.be.equal(20)
    runningTween.update(50)
    newEl.x.should.be.equal(50)
  })

  it('should apply running style and transfertTween',()=>{
    let el = {x:0,y:0}

    const oldValue = undefined
    const runningTween = new Tween.Tween({x:0}).to({x:100},100).start(0)
    const newStyle = undefined

    runningTween.update(20)
    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    newEl.x.should.be.equal(20)
    runningTween.update(50)
    newEl.x.should.be.equal(50)
  })
})
