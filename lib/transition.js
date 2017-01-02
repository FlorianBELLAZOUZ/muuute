const {assign,comp,concat,drop,equal,filter,find,flat,has,includes,
isArray,keys,log,map,pick,reverse,some,toArray,uniqBy} = require('./funcs')

const Linear = require('tween.js').Easing.Linear.None
const format = tran=>assign({},tran,{property:comp(toArray,overrideAll)(tran.property)})
const standart = {delay:0,duration:0,property:['all'],easing:Linear}
const uniqTransitions = comp(reverse,uniqBy(pick('property')))
const tranHasAll = comp(pick('property'),includes('all'))
const toStandart = tran=>assign({},standart,tran)
const tweenKeys = ['transition','animation']
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
const addTargetValue = style=>map(assignTargetValue(style))(style.transition)

// private

// assignTargetValue :: style:Object => el:Object => el:Object
const assignTargetValue = style=>el=>assign({},el,{targetValue:style[el.property]})

// overrideAll :: properties:ArrayString => properties:ArrayString
const overrideAll = properties=>hasAll(properties)?['all']:properties

// excludeTransitionsNotInStyle :: style:Object => transitions:ArrayTransition
const excludeTransitionsNotInStyle = style=>{
  const trans = style.transition
  const styleKeys = comp(keys,drop(tweenKeys),concat('all'))(style)
  const includeInStyle = some(el=>includes(el)(styleKeys))
  return filter(comp(pick('property'),includeInStyle))(trans)
}

module.exports = {needTween,toDefault,splitAll,addTargetValue}
module.exports.private = {overrideAll,excludeTransitionsNotInStyle}
