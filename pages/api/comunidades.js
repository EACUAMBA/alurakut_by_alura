import { SiteClient } from 'datocms-client';


export default async function receberComunidadesDatoCMS(request, response) {
    const TOKEN = 'token';
    const client = new SiteClient(TOKEN);
    const resposta = await client.items.create({
        itemType: "976894",
        ...request.body,
    });
    response.json({
       Resposta: resposta
    });
}
