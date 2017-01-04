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

// toTween :: animations:ArrayAnimation=>obj:Object=>tweens:ArrayTween
const toTween = animations=>obj=>{
  const fillNone = animation=>initial=>()=>{
    return fillbackwards(animation)?obj[animation.property]=initial:0
  }

  const mute = animation=>{
    const startValue = obj[animation.property]
    const firstKey = animation.keys.shift()
    obj[animation.property]=firstKey

    const tween = new Tween
      .Tween(obj)
      .to({[animation.property]:animation.keys},animation.duration)
      .repeat(animation.iterations-1)
      .delay(animation.delay)
      .interpolation(interpolation(animation))
      .onComplete(fillNone(animation)(startValue))
      .repeatDelay(0)
      .start()

    if(fillFowards(animation)) obj[animation.property]=startValue
    if(!animation.keys.length) obj[animation.property]=firstKey

    return tween
  }

  return comp(id(animations),filter(pick('play')),map(mute))()
}

// isAnimation :: obj:Object => boolean:Boolean
const isAnimation = hasKey('keys')

module.exports={toDefault,toTween,isAnimation}
