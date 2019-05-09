import GraphQLClient from '@arcblock/graphql-client';

const client = new GraphQLClient(process.env.chainHost);

export default client;
