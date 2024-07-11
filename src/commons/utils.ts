const reservedWords = [
  'abstract', 'app', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 
  'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 
  'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 
  'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 
  'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 
  'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 
  'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 
  'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
];

function isReservedWord(value: string) {
  return reservedWords.includes(value);
}

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
  arrayToObject,
  isReservedWord
}