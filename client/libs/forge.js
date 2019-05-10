import GraphQLClient from '@arcblock/graphql-client';

const client = new GraphQLClient(process.env.chainHost);

console.log('Inspect GraphQLClient');
console.dir(client);

export default client;
