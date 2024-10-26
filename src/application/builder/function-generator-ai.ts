import OpenAI from "openai";

import { error } from "../../logger/log-printer";
import { Message } from "../../logger/default-text";
import { FunctionOptions } from "./types";

async function generateFunction(options: FunctionOptions): Promise<string | void> {

  if (!process.env.OPEN_AI_TOKEN) {
    error(Message.OPEN_AI_TOKEN_NOT_FOUND);
    return;
  }

  const client =  new OpenAI({
    apiKey: process.env.OPEN_AI_TOKEN,
  });

  const parameters = options.parameters?.map(param => param.name);

  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Você é um assistente especializado em gerar código TypeScript claro, eficiente e bem documentado.\n
          Você deve apenas apresentar o código, sem explicações. Seu código deve englobar um unico arquivo.\n
          O código deve seguir boas práticas, ser modular e conter tratamento adequado de erros. Utilize async/await para operações assíncronas.`,
        },
        {
          role: 'user',
          content: `Escreva uma função chamada ${options.name} com os seguintes parâmetros: ${parameters}.
          No seu código inclua as importações necessárias e a função deve estar presente no export no final do arquivo.\n
          A função deve:\n
          - ${options.role}\n
          Certifique-se de que a função esteja bem estruturada e adicione comentários explicativos para cada parte do código.`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const content = chatCompletion.choices[0]!.message?.content
    
    if (content) {
      return extractTypeScriptCode(content);
    }
  } catch(exception) {
    error(Message.OPEN_AI_ERROR, {
      exception
    });
  }
}

const extractTypeScriptCode = (content: string): string => {
  const regex = /```typescript([\s\S]*?)```/g;
  const matches = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1].trim());
  }

  return matches.join('\n');
};

export {
  generateFunction,
}