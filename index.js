const {needTween} = require('./lib/transition')
const {assign} = require('./lib/funcs')

const mute = (el,...styles)=>{
  const style = assign.apply(0,styles)
  if(!needTween(style)) return assign(el,style)
}

module.exports = {mute}
