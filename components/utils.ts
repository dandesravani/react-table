
let data = [['q','f','c','rn','hsgdf'],['s','r',"p"],['g','l','n','gn']]

let sub = data[0]

export const contains = (arr: string[], val: string) => {
  let result  =[]
  for (let v of arr) {
    if (v.includes(val)) {
      result.push(v)
    }
  }
  return result
}


export const containedValues = (arr: string[][],text:string):string[][] => {
  let result:string[][] = []
  for (let v of arr) {
    let con = contains(v, text)
    if (con.length !== 0) {
       result.push(con)
    }
  }
  return result
}

console.log(contains(sub!, 'f'))
console.log(containedValues(data, 'r'))
console.log('helo')
