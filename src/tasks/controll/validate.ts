import { isReservedWord } from "../../commons/utils";

function getReservedName(functionName: string, params: any){
  if (isReservedWord(functionName)){
    return functionName;
  }

  for (const param of params) {
    if (isReservedWord(param)){
      return param;
    }
  }
}

export {
  getReservedName
}