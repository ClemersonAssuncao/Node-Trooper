import { Message } from "../../logger/default-text";
import { log } from "../../logger/log-printer";

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

function isValidWord(words: string | string[]) {

  if (typeof words === "string" && reservedWords.includes(words)) {
    log(Message.VALIDATOR_RESERVED_WORD_ERROR, { word: words })
    return false;
  }
  
  for (const word of words) {
    if (reservedWords.includes(word)){
      log(Message.VALIDATOR_RESERVED_WORD_ERROR, { word })
      return false;
    }
  }

  return true;
}

export {
  isValidWord
}