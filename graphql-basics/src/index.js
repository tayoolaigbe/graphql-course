const { ApolloServer } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

let comments = [
	{
		id: '4332',
		text: 'This is a lovely post.',
		author: '1',
		post: '11',
	},
	{
		id: '42',
		text: 'Really enjoyed this post',
		author: '1',
		post: '10',
	},
	{
		id: '32',
		text: 'Thanks for this.',
		author: '1',
		post: '12',
	},
	{
		id: '409',
		text: 'Another interesting angle.',
		author: '2',
		post: '11',
	},
];

let users = [
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

let posts = [
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

	type Mutation {
		createUser(data: CreateUserInput!): User!
		deleteUser(id: ID!): User!
		createPost(data: CreatePostInput!): Post!
		deletePost(id: ID!): Post!
		createComment(data: CreateCommentInput!): Comment!
		deleteComment(id: ID!): Comment!
	}

	input CreateUserInput {
		name: String!
		email: String!
		age: Int
	}

	input CreatePostInput {
		title: String!
		body: String!
		published: Boolean!
		author: ID!
	}

	input CreateCommentInput {
		text: String!
		author: ID!
		post: ID!

	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
		comments: [Comment!]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}

	type Comment {
		id:ID!
		text: String!
		author: User!
		post: Post!
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
			body: 'Hello there, \n\nYou are now reading my first post on this website. Hope you enjoy it!',
			published: true,
		}),
		comments: () => comments,
	},
	Mutation: {
		createUser: (parent, args, ctx, info) => {
			const emailTaken = users.some(user => user.email === args.data.email);
			if (emailTaken) throw new Error('Email already taken!');

			const user = {
				id: uuidv4(),
				...args.data,
			};

			users.push(user);

			return user;
		},
		deleteUser: (parent, args, ctx, info) => {
			const userIndex = users.findIndex(user => user.id === args.id);

			if (userIndex === -1)
				throw new Error('There is no User with that ID. Delete Unsuccessful!');

			const deletedUsers = users.splice(userIndex, 1);
			posts = posts.filter(post => {
				const match = post.author === args.id;

				if (match)
					comments = comments.filter(comment => comment.post !== post.id);
				return !match;
			});

			comments = comments.filter(comment => comment.author !== args.id);

			return deletedUsers[0];
		},
		createPost: (parent, args, ctx, info) => {
			const userExists = users.some(user => user.id === args.data.author);
			if (!userExists) throw new Error('User not Found!');

			const post = {
				id: uuidv4(),
				...args.data,
			};

			posts.push(post);

			return post;
		},
		deletePost: (parent, args, ctx, info) => {
			const postIndex = posts.findIndex(post => post.id === args.id);

			if (postIndex === -1)
				throw new Error('There is no Post with that ID. Delete Unsuccessful!');

			const deletedPosts = posts.splice(postIndex, 1);

			comments = comments.filter(comment => comment.post !== args.id);
			return deletedPosts[0];
		},
		createComment: (parent, args, ctx, info) => {
			const userExists = users.some(user => user.id === args.data.author);
			const postExists = posts.some(
				post => post.id === args.data.post && post.published
			);

			if (!userExists || !postExists)
				throw new Error('User or Post does not exist!');

			const comment = {
				id: uuidv4(),
				...args.data,
			};

			comments.push(comment);

			return comment;
		},
		deleteComment: (parent, args, ctx, info) => {
			const commentIndex = comments.findIndex(
				comment => comment.id === args.id
			);
			if (commentIndex === -1)
				throw new Error(
					'There is no Comment with that ID. Delete Unsuccessful!'
				);

			const deletedComments = comments.splice(commentIndex, 1);

			return deletedComments[0];
		},
	},
	Post: {
		author: (parent, args, ctx, info) =>
			users.find(user => user.id === parent.author),
		comments: (parent, args, ctx, info) =>
			comments.filter(comment => comment.post === parent.id),
	},
	User: {
		posts: (parent, args, ctx, info) =>
			posts.filter(post => post.author === parent.id),
		comments: (parent, args, ctx, info) =>
			comments.filter(comment => comment.author === parent.id),
	},
	Comment: {
		author: (parent, args, ctx, info) =>
			users.find(user => user.id === parent.author),
		post: (parent, args, ctx, info) =>
			posts.find(post => post.id === parent.post),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
