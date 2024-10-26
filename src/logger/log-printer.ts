function debug(message: string, parameters?: Record<string, any>) {
  message = fillMacro(message, parameters);
  console.debug(message);
}

function error(message: string, parameters?: Record<string, any>) {
  message = fillMacro(message, parameters);
  console.error(message);
}

function log(message: string, parameters?: Record<string, any>) {
  message = fillMacro(message, parameters);
  console.log(message);
}

function fillMacro(text: string, parameters?: Record<string, string>) {
  if (!parameters){
    return text;
  }

  return text.replace(/\$([a-zA-Z]+)/g, (match: string, macro: string) => {
    const foundKey = Object.keys(parameters).find((key) => key.toLowerCase() === macro.toLowerCase());

    return foundKey ? parameters[foundKey] : match;
  });
}

export {
  debug,
  error,
  log,
}