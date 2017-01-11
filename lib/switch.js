const und = a=>a===undefined

const apply = el=>property=>val=>el[property]=val

const kernelByProp = (el,property,oldValue,newStyle,runningTween)=>{
  if(oldValue && und(runningTween) && und(newStyle)){
    apply(el)(property)(oldValue)
    return el
  }

  if((oldValue || und(oldValue)) && runningTween && und(newStyle)){
    runningTween.switch(el)
    return el
  }
}

module.exports = {kernelByProp}
