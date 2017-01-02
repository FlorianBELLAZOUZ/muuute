const {needTween} = require('./lib/transition')
const {assign} = require('./lib/funcs')

// mute :: (el:Object, ...styles:ArrayObject)=>el:Object
// morph the elements to the target style with transitions or animations
const mute = (el,...styles)=>{
  const style = assign.apply(0,styles)
  if(!needTween(style)) return assign(el,style)
}

// TODO
// style :: (el:Object, ...styles:ArrayObject)=>el:Object
// return a object with key __style__ that contain all datas to mute/animate it
const style = (el,...styles)=>el

// TODO
// mergeStyle :: el:Object=>newEl:Object=>el:Object
// return a object with style override by the newEl
const mergeStyle = el=>newEl=>el

module.exports = {mute}
