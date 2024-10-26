function arrayToObject(params: string[]): any[] {
  const result: any = {};
  for (let i = 0; i < params.length; i += 2) {
    const key = params[i];
    var value: any = params[i + 1];
    
    if (value == null || value == undefined){
      value = true;
    }
    
    if (value === 'false') {
      value = false;
    }

    result[key] = value;
  }
  return result;
}

export {
  arrayToObject
}