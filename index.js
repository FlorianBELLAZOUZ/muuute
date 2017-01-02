const {needTween,toDefault,splitAll,addTargetValue,addNoTransitionValue} = require('./lib/transition')
const {assign,forEach} = require('./lib/funcs')
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
  return assign({},el,{__style__:style.transition})
}

// mergeStyle :: el:Object=>el:Object
// mute the styled element (use the function style before)
const muteStyled = el=>{
  if(!el.__style__) throw 'muteStyled need a styled object'

  const func = style=>{
    if(style.duration==0) return el[style.property] = style.targetValue

    new Tween
      .Tween(el)
      .to({[style.property]:style.targetValue},style.duration)
      .delay(style.delay)
      .easing(style.easing)
      .start()
  }

  forEach(func)(el.__style__)
}

// update :: time:Number Positive Integer => time:Number Positive Integer
// update the transition and animations
const update = Tween.update

module.exports = {mute,style,muteStyled,update}
