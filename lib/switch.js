const Tween = require('tween.js')
const und = a=>a===undefined
const exs = a=>a!==undefined
const MuteStyle = require('..').muteStyle

const apply = el=>property=>val=>el[property]=val

const kernelByProp = (el,property,oldValue,newStyle,runningTween)=>{
  if(exs(oldValue) && und(runningTween) && und(newStyle)){
    apply(el)(property)(oldValue)
    return el
  }

  if((oldValue || und(oldValue)) && exs(runningTween) && und(newStyle)){
    runningTween.switch(el)
    return el
  }

  if(exs(oldValue) && und(runningTween) && exs(newStyle)){
    apply(el)(property)(oldValue)
    MuteStyle(el)([newStyle])

    return el
  }
}

module.exports = {kernelByProp}
