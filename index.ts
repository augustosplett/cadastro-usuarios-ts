import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';

const port = 5000;

const server = createServer( (req: IncomingMessage, res: ServerResponse) => {

    const urlParse = url.parse(req.url ? req.url : '', true);

    const params = parse(urlParse.search ? urlParse.search : '');

    var resposta: string;

    if(urlParse.pathname == `/criar-atualizar-usuario`){

        writeFile(`users/${params.id}.txt`, JSON.stringify(params), function(err: any){
            
            if(err) throw err;

            console.log(`Saved!`);

            resposta = `Usuário criado/ atualizado com sucesso!`;
            
            res.statusCode = 200;
            res.setHeader(`Content-Type`, `text/plain`);
            res.end(resposta);

        });
    }
});

server.listen( port, () =>{
    console.log(`Server running on port ${port}`);
});