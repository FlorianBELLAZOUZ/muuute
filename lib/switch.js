const Tween = require('tween.js')
const und = a=>a===undefined
const exs = a=>a!==undefined
const MuteStyle = require('..').muteStyle

const Switch = (el,properties,oldEl={},newStyles=[])=>{
  return kernel(el,properties,oldEl,newStyles,Tween.getAll())
}

const kernel = (el,properties,oldEl={},newStyles=[],runningTweens=[])=>{
  properties.forEach(prop=>{
    const oldValue = oldEl[prop]
    const newStyle = newStyles.find(style=>style.property==prop)
    const tween = runningTweens.find(tween=>tween.getObject()===oldEl&&exs(tween.getInitialValuesEnd()[prop]))

    kernelByProp(el,prop,oldValue,newStyle,tween)
  })

  return el
}

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
      runningTween.switch(el)
      Tween.remove(runningTween)
      MuteStyle(el)([newStyle])
    }

    return el
  }
}

const tweenSameThanStyle = tween=>style=>{
  const tweenEnd = tween.getInitialValuesEnd()
  const styleEnd = style.targetValue || style.keys
  return isEqual(tweenEnd)(styleEnd)
}

const isEqual = a=>b=>{
  const isArray = Array.isArray(a) && Array.isArray(b)
  if(isArray) return a.every((el,i)=>el===b[i])
  return a === b
}

const apply = el=>property=>val=>el[property]=val

module.exports = {kernelByProp,kernel,switch:Switch}
