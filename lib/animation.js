const {log,not,filter,map,assign,hasAll,comp} = require('./funcs')
const neededKeys = ['property','keys']
const standard = {duration:1000,iterations:1,delay:0,direction:'normal',
interpolation:'catmullrom',play:true,fill:'forwards',}

const toStandard = animation=>assign({},standard,animation)
const hasNeededKeys = hasAll(neededKeys)

// .toDefault :: animations:ArrayAnimation=>animations:ArrayAnimation
const toDefault = comp(filter(hasNeededKeys),map(toStandard))

module.exports={toDefault}
