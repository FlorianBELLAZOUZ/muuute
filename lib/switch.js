const und = a=>a===undefined

const apply = el=>property=>val=>el[property]=val

const kernelByProp = (el,property,oldValue,newStyle,runningTween)=>{
  if(oldValue && und(newStyle) && und(runningTween)){
    apply(el)(property)(oldValue)
    return el
  }
}

module.exports = {kernelByProp}
