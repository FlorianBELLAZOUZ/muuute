const {keys,log,copy,has,assign,map,pick,omit,reduce,comp,equal,find,
concat,isArray,includes,drop,uniq,uniqBy,reverse,flat,filter,some} = require('./funcs')
const Linear = require('tween.js').Easing.Linear.None

const standart = {delay:0,duration:0,property:['all'],easing:Linear}
const toStandart = tran=>assign({},standart,tran)
const oneToArray = property=>isArray(property)?property:[property]
const hasAll = find(equal('all'))
const overrideAll = property=>hasAll(property)?['all']:property

const format = tran=>assign({},tran,{property:comp(oneToArray,overrideAll)(tran.property)})

const tweenKeys = ['transition','animation']
const omits = comp(map(omit,tweenKeys))
const picks = comp(map(pick,tweenKeys))
const needTween = has(tweenKeys)

const styleKeys = comp(keys,drop(tweenKeys))
const toDefault = map(comp(toStandart,format))

const splitAll = style=>{
  const getProps = tran=>tranHasAll(tran)?styleKeys(style):pick('property')(tran)
  const splitByProps = tran=>map(prop=>assign({},tran,{property:prop}))
  const split = tran=>splitByProps(tran)(getProps(tran))

  return comp(excludeTransitionsNotInStyle,map(split),flat,reverse,uniqBy(pick('property')))(style)
}

// excludeTransitionsNotInStyle :: style => transitions
const excludeTransitionsNotInStyle = style=>{
  const trans = style.transition
  const styleKeys = comp(keys,drop(tweenKeys),concat('all'))(style)
  const includeInStyle = some(el=>includes(el)(styleKeys))
  return filter(comp(pick('property'),includeInStyle))(trans)
}

const tranHasAll = comp(pick('property'),includes('all'))

module.exports = {toDefault,splitAll,needTween}
module.exports.private = {overrideAll}
