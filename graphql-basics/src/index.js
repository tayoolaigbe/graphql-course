const { ApolloServer } = require('apollo-server');

const typeDefs = `
type Query {
  hello: String!
  name: String!
  location: String!
  bio: String!
}
`;
const resolvers = {
	Query: {
		hello: () => 'This is my first query!',
		name: () => 'Eyitayo Olaigbe',
		bio: () => 'CEO and Founder of gidi',
		location: () => 'Edinburgh, UK',
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
