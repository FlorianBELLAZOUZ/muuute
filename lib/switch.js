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

  if(und(oldValue) && und(runningTween) && exs(newStyle)){
    MuteStyle(el)([newStyle])

    return el
  }

  if(exs(oldValue) && exs(runningTween) && exs(newStyle) ||
    und(oldValue) && exs(runningTween) && exs(newStyle)){

    if(tweenSameThanStyle(runningTween)(newStyle)){
      runningTween.switch(el)
    }else{
      Tween.remove(runningTween)
      MuteStyle(el)([newStyle])
    }

    return el
  }
}

const tweenSameThanStyle = tween=>style=>true

module.exports = {kernelByProp}
