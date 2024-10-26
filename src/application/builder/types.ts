enum Component{
	EMPTY_LINE,
	FUNCTION,
	IMPORT,
}

interface FunctionOptions {
	name: string;
	parameters?: Parameters[];
	role?: string;
}

interface Parameters {
  name: string;
  type?: string;
}

interface ImportOptions {
	name: string;
	library: string;
}

type ComponentOptions = FunctionOptions | ImportOptions

type FileContent = {
	ast: any;
	path: string;
	originalCode: string; 
}

type GeneratorContent = {
	code: string;
	message: string;
}

export {
  Component,
  ComponentOptions,
  FileContent,
  GeneratorContent,
  FunctionOptions,
  ImportOptions,
  Parameters,
}