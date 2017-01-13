const {needTween,toDefault,splitAll,addTargetValue,addNoTransitionValue,
isTransition,filterUseless} = require('./lib/transition')
const Transition = require('./lib/transition')
const Animation = require('./lib/animation')
const {log,assign,forEach,applyWithPath,concat,pick,uniqBy,
  filter,comp,} = require('./lib/funcs')
const Tween = require('tween.js')

let isActivate = true

// mute :: (el:Object, ...styles:ArrayObject)=>el:Object
// morph the elements to the target style with transitions or animations
const mute = (el,...styles)=>muteStyled(style(el,...styles))

// style :: (el:Object, ...styles:ArrayObject)=>el:Object
// return a object with key __style__ that contain all datas to mute/animate it
const style = (el,...styles)=>{
  const style = assign.apply(0,styles)

  style.transitions = toDefault(style.transitions)
  style.transitions = splitAll(style)
  style.transitions = addNoTransitionValue(style)
  style.transitions = addTargetValue(style)

  style.animations = Animation.toDefault(style.animations)

  let __style__ = concat(style.animations)(style.transitions)
  __style__ = uniqBy(pick('property'))(__style__)

  return assign(el,{__style__})
}

// muteStyled :: el:Object=>el:Object
// mute the styled element (use the function style before)
const muteStyled = el=>{
  if(!el.__style__) throw new Error('muteStyled need a styled object')
  const style = pick('__style__')(el)

  return muteStyle(el)(style)
}


// muteStyle :: el:Object=>style:Object=>el:Object
// mute element with style
const muteStyle = el=>style=>{
  if(!isActivate) return

  Animation.toTween(el)(style)
  Transition.toTween(el)(style)

  return el
}

// update :: time:Number Positive Integer => time:Number Positive Integer
// update the transition and animations
const update = Tween.update

// stopAll :: undefined=>undefined
// stopAll running transitions & animations
const stopAll = Tween.removeAll

// muted :: undefined=>Boolean
// return true when a element need an update
const muted = ()=>!!Tween.getAll().length

// desactivate
const desactivate = ()=>isActivate=false

// activate
const activate = ()=>isActivate=true

module.exports = {mute,style,muteStyled,update,stopAll,muted,muteStyle,
desactivate,activate}

module.exports.switch = require('./lib/switch').switch
