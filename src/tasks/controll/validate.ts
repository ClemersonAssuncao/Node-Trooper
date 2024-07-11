import { isReservedWord } from "../../commons/utils";

function validateName(functionName: string, params: any){
  console.log(functionName)
  if (isReservedWord(functionName)){
    throw new Error(`O nome da função ${functionName} é uma palavra reservada do Javascript, escolha outro nome`);
  }

  for (const param of params) {
    if (isReservedWord(param)){
      throw new Error(`O nome do parametro ${param} é uma palavra reservada do Javascript, escolha outro nome`);
    }
  }
}

export {
  validateName
}