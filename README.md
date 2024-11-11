# Payments by Payco Client SDK

### O SDK tem a finalidade de facilitar a tokenização de cartões de crédito e débito de forma segura e integrar com e coletar dados de um navegador para análises 3DS.

#### Este SDK deve ser utilizado em aplicações front-end, que tenham acesso ao contexto do navegador (`window` e `navigator`). É possível fazer o uso do SDK em aplicações Node mas este caso não foi testado portanto não há garantias.
---

### Funções
 - `initialize()`: Inicializa nosso SDK, gera um ID único de sessão, e injeta scripts para o recurso antifraude
   - Parâmetros:
     - **`keyId`** (`string`, obrigatório): Key ID do seu Estabelecimento Payments by Payco.
     Faça o login na plataforma e acesse a página https://dash.payments.payco.com.br/configuracoes/credenciais para obter a Key ID
     - `orgId` (`string`, opcional): ID do seu Estabelecimento Paymenes by Payco.
     Faça o login na plataforma e acesse a página https://dash.payments.payco.com.br/configuracoes/credenciais para obter o valor deste campo (`Client ID`)
     - `installScripts` (`string`, opcional, padrão: `true`): injeta os scripts para o recurso antifraude na página web onde o SDK é executado.
     **Incluir essa opção com o valor `false` desativará a injeção automática destes scripts e necessitará que a injeção seja feita de forma manual**.
     - `sessionId` (`string`, opcional): ID único utilizado pela verificação 3DS para relacionar o visitante ou usuário de sua aplicação com uma compra sendo analisada pelo sistema de pagamento.
     Caso nenhum valor seja informado, será preenchido automaticamente se `installScripts` for `true` ou não tiver valor definido na função `initialize()`, mas caso `installScripts` tenha valor `false`, `sessionId` sempre deverá ter um valor inicial
- `tokenize()`: Realiza a tokenização dos dados de um cartão de crédito ou débito para que possa ser enviado à nossa API de forma segura.

  Esta função valida os dados do cartão, obtém a chave pública (public key) de seu estabelecimento (através do `keyId` informado na inicialização) e utiliza esta chave pública para criptografar os dados do cartão e retorna a string com o resultado desta operação.

  _No contexto das operações de pagamento com cartão de crédito na API Payments by Payco, este token é utilizado no campo `card_vault_token`_
  - Parâmetros:
    - `cardData`: Dados do cartão de crédito ou débito (todos os valores são **obrigatórios**)
      - `cardBrand` (string): Bandeira do cartão
        - Valores aceitos: `mastercard`, `visa`, `amex`, `hipercard`, `elo`
      - `cvv` (string): Código de validação do cartão
      - `expirationMonth`: Mês de expiração do cartão (2 dígitos, ex: `03` para março)
      - `expirationYear`: Ano da expiração do cartão (2 dígitos, ex: `29` para 2029)
      - `holderDocument`: Documento do Titular do cartão (ex: CPF ou CNPJ, sem pontuação)
      - `holderName`: Nome do Titular do cartão (da mesma forma como é impresso)
      - `number`: Número do cartão (sem espaços)
- `getDeviceInfo()`: Coleta dados do navegador e retorna um objeto. Os dados coletados são necessários para que a verificação 3DS seja feita para as compras feitas com cartão.

  Nenhuma informação pessoal do visitante do site é coletada, apenas informações sobre o navegador como resolução da tela, idioma, fuso horário e marca do navegador são coletadas.
  
  _No contexto das operações de pagamento com cartão de crédito na API Payments by Payco, este token é utilizado no campo `device_info`_