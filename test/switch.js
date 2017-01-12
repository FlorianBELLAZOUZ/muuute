const Linear = require('tween.js').Easing.Linear.None
const Switch = require('../lib/switch')
const Should = require('chai').Should()
const Tween = require('tween.js')

describe('.kernelByProp :: el=>property=>oldValue=>newStyle=>runningTween=>el',()=>{
  afterEach(Tween.removeAll)

  it('should apply old value',()=>{
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

  it('should apply old value and create newTween',()=>{
    let el = {x:30,y:0}

    const oldValue = 0
    const runningTween = undefined
    const newStyle = {delay:0,duration:100,property:'x',easing:Linear,targetValue:100}

    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    Tween.getAll().length.should.be.equal(1)
    newEl.x.should.be.equal(0)
    Tween.update(10**10)
    newEl.x.should.be.equal(100)
  })

  it('should create newTween',()=>{
    let el = {x:30,y:0}

    const oldValue = undefined
    const runningTween = undefined
    const newStyle = {delay:0,duration:100,property:'x',easing:Linear,targetValue:100}

    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    Tween.getAll().length.should.be.equal(1)
    newEl.x.should.be.equal(30)
    Tween.update(10**10)
    newEl.x.should.be.equal(100)
  })

  it('should transfert running tween',()=>{
    let el = {x:30,y:0}

    const oldValue = 0
    const runningTween = new Tween.Tween({x:0}).to({x:100},100).start(0)
    const newStyle = {delay:0,duration:100,property:'x',easing:Linear,targetValue:100}

    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    Tween.getAll().length.should.be.equal(1)
    runningTween.update(30)
    newEl.x.should.be.equal(30)
    Tween.update(10**10)
    newEl.x.should.be.equal(100)
  })

it('should apply runningTween and remove runningTween and create new Tween',()=>{
    let el = {x:-20,y:0}

    const oldValue = 0
    const runningTween = new Tween.Tween({x:0}).to({x:100},100).start(0)
    const newStyle = {delay:0,duration:100,property:'x',easing:Linear,targetValue:-100}

    runningTween.update(30)
    const newEl = Switch.kernelByProp(el,'x',oldValue,newStyle,runningTween)
    Tween.getAll().length.should.be.equal(1)
    newEl.x.should.be.equal(30)
    Tween.update(10**10)
    newEl.x.should.be.equal(-100)
  })
})
