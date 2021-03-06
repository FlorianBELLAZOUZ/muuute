const {pick,title,forEach,log,not,filter,map,assign,hasAll,comp,
  lowerCase,equal,id,clone,passSome,isUndefined,hasKey,} = require('./funcs')
const Tween = require('tween.js')

const neededKeys = ['property','keys']
const standard = {duration:1000,iterations:1,delay:0,
interpolation:'catmullrom',play:true,fill:'forwards',}

const toStandard = animation=>assign({},standard,animation)
const hasNeededKeys = hasAll(neededKeys)
const formatInterpolation = i=>title(i)=='Catmullrom'?'CatmullRom':title(i)
const getInterpolation = i=>Tween.Interpolation[i]
const interpolation = comp(pick('interpolation'),formatInterpolation,getInterpolation)
const isYoyo = comp(pick('direction'),lowerCase,equal('alternate'))
const backwardsEquals = [equal('none'),equal('backwards')]
const fowardsEquals = [equal('none'),equal('forwards')]
const fillbackwards = comp(pick('fill'),lowerCase,passSome(backwardsEquals))
const fillFowards = comp(pick('fill'),lowerCase,passSome(fowardsEquals))
const forceArray = a=>isUndefined(a)?[]:a

// toDefault :: animations:ArrayAnimation=>animations:ArrayAnimation
const toDefault = comp(forceArray,filter(hasNeededKeys),map(toStandard))

// isAnimation :: obj:Object => boolean:Boolean
const isAnimation = hasKey('keys')

// filterValid :: animations:ArrayAnimation=>animations:ArrayAnimation
const filterValid = comp(filter(isAnimation),filter(pick('play')))

// toTween :: obj:Object=>animations:ArrayAnimation=>tweens:ArrayTween
const toTween = obj=>comp(filterValid,map(mute(obj)))

// mute :: obj:Object => animation:Animation => tween:Tween
const mute = obj=>animation=>{
  const fillNone = initial=>()=>{
    return fillbackwards(animation)?obj[animation.property]=initial:0
  }

  let keys = animation.keys.slice()

  const startValue = obj[animation.property]
  const firstKey = keys.shift()
  obj[animation.property]=firstKey

  const tween = new Tween
    .Tween(obj)
    .to({[animation.property]:keys},animation.duration)
    .repeat(animation.iterations-1)
    .delay(animation.delay)
    .interpolation(interpolation(animation))
    .onComplete(fillNone(startValue))
    .repeatDelay(0)
    .start()

  if(fillFowards(animation)) obj[animation.property]=startValue
  if(!keys.length) obj[animation.property]=firstKey

  return tween
}

module.exports={toDefault,toTween,isAnimation}
