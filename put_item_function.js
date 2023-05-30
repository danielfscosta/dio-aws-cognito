// Importação do SDK da AWS
var AWS = require('aws-sdk');

// Criação de instância do cliente do DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Exportação da função handler
exports.handler = async (event) => {
    
    // Inicialização de variáveis
    let responseBody = "";
    let statusCode = 0;
    
    // Extração das propriedades 'id' e 'price' do corpo da solicitação
    let {id, price} = JSON.parse(event.body);
    
    // Criação do objeto 'params' com os detalhes da inserção no DynamoDB
    const params = {
      TableName : 'Items',
      /* As propriedades do item dependem das necessidades da aplicação */
      Item: {
         id: id,
         price: price
      }
    }
    
    try {
        // Execução da operação de inserção no DynamoDB
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Item inserido com sucesso!');
    } catch (err) {
        // Tratamento de erros, caso ocorram
        statusCode = 200;
        responseBody = JSON.stringify(err);
    }
      
    // Criação de objeto de resposta com o código de status e corpo da resposta
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    
    // Retorno da resposta
    return response;
};
