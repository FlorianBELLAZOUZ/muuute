const assign = Object.assign
const comp = (...funcs)=>a=>funcs.reduce((a,func)=>func(a),a)
const concat = arrayA=>arrayB=>toArray(arrayA).concat(toArray(arrayB))
const copy = obj=>Object.assign({},obj)
const drop = values=>filter(el=>every(v=>v!=el)(values))
const equal = a=>b=>a===b
const every = func=>array=>array.every(func)
const filter = func=>array=>array.filter(func)
const find = func=>array=>array.find(func)
const flat = array=>array.reduce((out,el)=>out.concat(el),[])
const forEach = func=>array=>array.forEach(func)
const has = (...keys)=>obj=>keys.every((el,i)=>hasKey(obj)(keys[i]))
const hasKey = key=>obj=>Object.keys(obj).includes(key)
const includes = val=>array=>array.includes(val)
const some = func=>array=>array.some(func)
const isArray = Array.isArray
const keys = Object.keys
const log = a=>(console.log(a),a)
const map = func=>array=>isArray(array)?array.map(func):[func(array)]
const not = a=>!a
const omit = key=>obj=>(obj=copy(obj),delete obj[key],obj)
const pick = key=>obj=>obj[key]
const reduce = func=>a=>array=>array.reduce(func,a)
const reverse = array=>(a=concat([])(array),a.reverse(),a)
const toArray = a=>isArray(a)?a:[a]
const uniq = array=>reduce((uniq,el)=>includes(el)(uniq)?uniq:concat(uniq)(el))([])(array)

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

module.exports = {assign,comp,copy,equal,find,forEach,has,hasKey,
includes,isArray,keys,log,map,omit,pick,reduce,reverse,uniq,uniqBy,
drop,flat,concat,filter,some}
