const {assign,comp,concat,drop,equal,filter,find,flat,has,hasKey,includes,
  isArray,diff,keys,log,map,pick,reverse,some,toArray,uniqBy,omit,not,
  applyWithPath,propertyByPath,forEach,} = require('./funcs')
const Tween = require('tween.js')

const Linear = require('tween.js').Easing.Linear.None
const format = tran=>assign({},tran,{property:comp(toArray,overrideAll)(tran.property)})
const standart = {delay:0,duration:0,property:['all'],easing:Linear}
const uniqTransitions = comp(reverse,uniqBy(pick('property')))
const tranHasAll = comp(pick('property'),includes('all'))
const toStandart = tran=>assign({},standart,tran)
const tweenKeys = ['transitions','animations']
const styleKeys = comp(keys,drop(tweenKeys))
const hasAll = find(equal('all'))

// needTween :: style:Object => boolean
const needTween = has(tweenKeys)

// toDefault :: transitions:ArrayTransition => transitions:ArrayTransition
const toDefault = map(comp(toStandart,format))

// splitAll :: style:Object => transitions:ArrayTransition
const splitAll = style=>{
  const getProps = tran=>tranHasAll(tran)?styleKeys(style):pick('property')(tran)
  const splitByProps = tran=>map(prop=>assign({},tran,{property:prop}))
  const splitOne = tran=>splitByProps(tran)(getProps(tran))
  const split = comp(map(splitOne),flat)

  return comp(excludeTransitionsNotInStyle,split,uniqTransitions)(style)
}

// addTargetValue :: style:Object => transitions:ArrayTransition
const addTargetValue = style=>map(assignTargetValue(style))(style.transitions)

// isTransition :: obj:Object => boolean:Boolean
const isTransition = hasKey('easing')

// toTween :: obj:Object => transitions:ArrayTransitions => tweens:ArrayTween
const toTween = obj=>comp(filter(isTransition),muteNanTransitions(obj),map(mute(obj)))

// muteNanTransitions :: obj:Object => transitions:ArrayTransitions => numberTransitions :ArrayTransitions
const muteNanTransitions = obj=>transitions=>{
  const transitionIsNan = comp(pick('targetValue'),isNaN)
  const nanTransitions = filter(transitionIsNan)(transitions)
  const numberTransitions = filter(comp(transitionIsNan,not))(transitions)

  const muteNanTransition = tran=>{
    applyWithPath(tran.property)(obj)(tran.targetValue)
    Tween.add({update:()=>false})
  }

  forEach(muteNanTransition)(nanTransitions)

  return numberTransitions
}

// mute :: obj:Object => transition:Transition => tween:Tween
const mute = obj=>transition=>{
  return new Tween
    .Tween(obj)
    .to({[transition.property]:transition.targetValue},transition.duration)
    .delay(transition.delay)
    .easing(transition.easing)
    .start()
}

// private

// assignTargetValue :: style:Object => tran:Transition => tran:Transition
const assignTargetValue = style=>tran=>assign({},tran,{targetValue:style[tran.property]})

// overrideAll :: properties:ArrayString => properties:ArrayString
const overrideAll = properties=>hasAll(properties)?['all']:properties

// excludeTransitionsNotInStyle :: style:Object => transitions:ArrayTransition
const excludeTransitionsNotInStyle = style=>{
  const trans = style.transitions
  const styleKeys = comp(keys,drop(tweenKeys),concat('all'))(style)
  const includeInStyle = some(el=>includes(el)(styleKeys))
  return filter(comp(pick('property'),includeInStyle))(trans)
}

const addNoTransitionValue = style=>{
  const styleKeys = diff(keys(style))(tweenKeys)
  const transitionKeys = map(pick('property'))(style.transitions)
  const noTransitionKey = diff(styleKeys)(transitionKeys)
  const toStandart = key=>assign({},standart,{property:key})
  const transition = comp(map(toStandart),concat(style.transitions))
  return transition(noTransitionKey)
}

const getStyledTarget = obj=>__style__property=>{
  if(!obj.__style__) return undefined
  var transition = obj.__style__.find(el=>el.property===__style__property)
  if(!transition) return undefined
  return transition.targetValue
}

const haveDifferentStyledTargetValue = obj=>transition=>{
  const styledTarget = getStyledTarget(obj)(transition.property)
  return styledTarget !== undefined && transition.targetValue !== styledTarget
}

module.exports = {needTween,toDefault,splitAll,addTargetValue,
  addNoTransitionValue,isTransition,toTween,}
module.exports.private = {overrideAll,excludeTransitionsNotInStyle}
