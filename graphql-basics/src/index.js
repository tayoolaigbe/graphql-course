const { ApolloServer } = require('apollo-server');

const comments = [
	{
		id: '4332',
		text: 'This is a lovely post.',
	},
	{
		id: '42',
		text: 'Really enjoyed this post',
	},
	{
		id: '32',
		text: 'Thanks for this.',
	},
	{
		id: '409',
		text: 'Another interesting angle.',
	},
];

const users = [
	{
		id: '1',
		name: 'Andrew',
		email: 'andrew@example.com',
		age: 27,
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com',
		age: 20,
	},
	{
		id: '3',
		name: 'Mike',
		email: 'mike@example.com',
	},
];

const posts = [
	{
		id: '10',
		title: 'Programming Music',
		body: '',
		published: false,
		author: '1',
	},
	{
		id: '11',
		title: 'GraphQl Basics',
		body: 'I believe this course will help my graphql journey.',
		published: true,
		author: '1',
	},
	{
		id: '12',
		title: 'Understanding Graphql',
		body: 'This post is about how to quickly understand Graphql',
		published: true,
		author: '2',
	},
];

const typeDefs = `
	type Query {
		users(query: String!): [User!]!
		posts(query: String!): [Post!]!
		me: User!
		post: Post!
		comments: [Comment!]!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
	}

	type Comment {
		id:ID!
		text: String!
	}
`;
const resolvers = {
	Query: {
		users: (parent, args, ctx, info) => {
			if (!args.query) {
				return users;
			}

			return users.filter(user =>
				user.name.toLowerCase().includes(args.query.toLowerCase())
			);
		},
		posts: (parent, args, ctx, info) => {
			if (!args.query) {
				return posts;
			}

			return posts.filter(post => {
				let titleMatch = post.title
					.toLowerCase()
					.includes(args.query.toLowerCase());
				let bodyMatch = post.body
					.toLowerCase()
					.includes(args.query.toLowerCase());

				return titleMatch | bodyMatch;
				// return posts;
			});
		},
		me: () => ({
			id: '123098',
			name: 'Mike',
			email: 'mike@example.com',
		}),
		post: () => ({
			id: '794085342',
			title: 'This is the first Post',
			body: 'Hello there, \n\nYou are now ready my first post on this website. Hope you enjoy it!',
			published: true,
		}),
		comments: () => comments,
	},
	Post: {
		author: (parent, args, ctx, info) =>
			users.find(user => user.id === parent.author),
	},
	User: {
		posts: (parent, args, ctx, info) =>
			posts.filter(post => post.author === parent.id),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
