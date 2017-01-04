const assign = Object.assign
const clone = a=>assign({},a)
const comp = (...funcs)=>a=>funcs.reduce((a,func)=>func(a),a)
const concat = arrayA=>arrayB=>toArray(arrayA).concat(toArray(arrayB))
const id = a=>()=>a
const copy = obj=>Object.assign({},obj)
const diff = arrayA=>arrayB=>arrayA.filter(el=>not(some(a=>a==el)(arrayB)))
const drop = values=>filter(el=>every(v=>v!=el)(values))
const equal = a=>b=>a===b
const every = func=>array=>array.every(func)
const filter = func=>array=>array.filter(func)
const find = func=>array=>array.find(func)
const flat = array=>array.reduce((out,el)=>out.concat(el),[])
const forEach = func=>array=>array.forEach(func)
const has = keys=>obj=>keys.some((el,i)=>hasKey(el)(obj))
const hasAll = keys=>obj=>keys.every((el,i)=>hasKey(el)(obj))
const hasKey = key=>obj=>Object.keys(obj).includes(key)
const includes = val=>array=>array.includes(val)
const isArray = Array.isArray
const isUndefined = a=>a===undefined
const keys = Object.keys
const log = a=>(console.log(a),a)
const map = func=>array=>isArray(array)?array.map(func):[func(array)]
const not = a=>!a
const omit = key=>obj=>(obj=copy(obj),delete obj[key],obj)
const pick = key=>obj=>obj[key]
const reduce = func=>a=>array=>array.reduce(func,a)
const reverse = array=>(a=concat([])(array),a.reverse(),a)
const some = func=>array=>array.some(func)
const toArray = a=>isArray(a)?a:[a]
const lowerCase = string=>string.toLowerCase()
const upperCase = string=>string.toUpperCase()
const title = string=>upperCase(string[0])+lowerCase(string.slice(1))
const uniq = array=>reduce((uniq,el)=>includes(el)(uniq)?uniq:concat(uniq)(el))([])(array)
const passSome = funcs=>el=>some(func=>func(el))(funcs)

const uniqBy = func=>array=>{
  const save = map(el=>({origin:el,transform:func(el)}))(array)
  const transform = map(pick('transform'))(save)
  const uniqTransform = uniq(transform)
  const uniqSave = reduce((out,el)=>{
    const originEl = find(comp(pick('transform'),equal(el)))(save)
    return includes(originEl.origin)(out)?out:concat(out)(originEl.origin)
  })([])(uniqTransform)
  return uniqSave
}

const applyWithPath = path=>obj=>val=>{
  path = path.split('.')
  path.reduce((obj,key,i)=>i===path.length-1?obj[key]=val:obj[key],obj)
}

module.exports = {assign,comp,concat,copy,drop,diff,equal,filter,find,
flat,forEach,has,hasAll,hasKey,includes,isArray,keys,log,map,not,omit,
pick,reduce,reverse,some,toArray,uniq,uniqBy,title,lowerCase,upperCase,
id,passSome,clone,applyWithPath,isUndefined}
