enum Message {
  INDEX_FILE_INSTANCE_ERROR = 'Não foi possível instanciar as funções do app $path. \n$error',
  INDEX_FILE_FILE_NOT_FOUND = 'Não foi possível encontrar o arquivo $path.\nAdicione a flag --new ou crie manualmente esse arquivo.',
  FINDER_APP_NOT_FOUND = 'Não foi possível encontrar o app $app.\nAdicione a flag --new para que ele seja criado automaticamente.',
  FINDER_FUNCTION_NOT_FOUND = 'Não foi possível encontrar a função $functionName.\nAdicione a flag --new para que ele seja criado automaticamente.',
  BUILDER_FILE_NOT_INSTANCE = 'É necessário instanciar o arquivo index para que seja possível carregar seu content.',
  BUILDER_FUNCTION_CREATED = 'Foi adicionado a função $functionName no app $app.',
  BUILDER_FUNCTION_CREATED_WITH_AI = 'Foi adicionado a função $functionName no app $app utilizando Inteligência Artifical.\n\n$message',
  BUILDER_FUNCTION_ERROR = 'Ocorreu um erro na criação da função $functionName usando IA, será criado apenas as declarações.\n$message',
  BUILDER_APP_CREATED = 'O aplicativo $app foi criado.',
  BUILDER_COMPONENT_NOT_SUPPORTED = 'O componente de criação não é compatível.',
  OPEN_AI_TOKEN_NOT_FOUND = 'Não foi encontrado uma variável de ambiente com o nome OPEN_IA_TOKEN.',
  OPEN_AI_ERROR = 'Erro na geração da função.\n$exception',
  VALIDATOR_RESERVED_WORD_ERROR = 'A palavra $word é reservada e não pode ser usada na criação de uma função ou parametro.',
}

export {
  Message,
}