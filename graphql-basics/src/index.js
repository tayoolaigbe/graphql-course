const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');
const User = require('./resolvers/User');

const prisma = new PrismaClient();

const resolvers = {
	Query,
	Mutation,
	Post,
	User,
	Comment,
};

const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers,
	context: {
		prisma,
	},
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
