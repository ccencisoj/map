const isArray = v => Array.isArray(v);
const isObject = v => typeof v === "object";
const isPlainObject = v=> v && v.constructor === Object;

const mapObject = async (obj, cb)=> {
  const r_obj = {};
  for(const k in obj) r_obj[k] = await cb(obj[k], k);
  return r_obj;
}

const mapArray = async (arr, cb)=> {
  const r_arr = [];
  for(const i in arr) r_arr[i] = await cb(arr[i], i);
  return r_arr;
}

const map = async (obj, fn, key)=> 
  isArray(obj) ? await mapArray(obj, async (v, i)=> await map(v, fn, i)) :
  isPlainObject(obj) ? await mapObject(obj, async (v, k)=> await map(v, fn, k)) :
  isObject(obj) ? await fn(obj, key) : await fn(obj, key);

module.exports = map;