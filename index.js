const {needTween,toDefault,splitAll,addTargetValue,addNoTransitionValue,
isTransition} = require('./lib/transition')
const Animation = require('./lib/animation')
const {log,assign,forEach,applyWithPath,concat,pick,uniqBy,
  filter,} = require('./lib/funcs')
const Tween = require('tween.js')

// mute :: (el:Object, ...styles:ArrayObject)=>el:Object
// morph the elements to the target style with transitions or animations
const mute = (el,...styles)=>{
  const style = assign.apply(0,styles)
  if(!needTween(style)) return assign(el,style)
}

// style :: (el:Object, ...styles:ArrayObject)=>el:Object
// return a object with key __style__ that contain all datas to mute/animate it
const style = (el,...styles)=>{
  const style = assign.apply(0,styles)
  style.transition = toDefault(style.transition)
  style.transition = splitAll(style)
  style.transition = addNoTransitionValue(style)
  style.transition = addTargetValue(style)

  style.animations = Animation.toDefault(style.animations)

  let __style__ = concat(style.animations)(style.transition)
  __style__ = uniqBy(pick('property'))(__style__)

  return assign({},el,{__style__})
}

// mergeStyle :: el:Object=>el:Object
// mute the styled element (use the function style before)
const muteStyled = el=>{
  if(!el.__style__) throw new Error('muteStyled need a styled object')

  const func = animation=>{
    if(animation.duration==0) return applyWithPath(animation.property)(el)(animation.targetValue)

    new Tween
      .Tween(el)
      .to({[animation.property]:animation.targetValue},animation.duration)
      .delay(animation.delay)
      .easing(animation.easing)
      .start()
  }

  const transitions = filter(isTransition)(el.__style__)
  const animations = filter(Animation.isAnimation)(el.__style__)

  forEach(func)(transitions)
  Animation.toTween(animations)(el)
}

// update :: time:Number Positive Integer => time:Number Positive Integer
// update the transition and animations
const update = Tween.update

// stopAll :: undefined=>undefined
// stopAll running transitions & animations
const stopAll = Tween.removeAll


module.exports = {mute,style,muteStyled,update,stopAll}
