const { v4: uuidv4 } = require('uuid');

const Mutation = {
	createUser: async (parent, args, { prisma }, info) => {
		// const emailTaken = prisma.user.some(user => user.email === args.data.email);
		// if (emailTaken) throw new Error('Email already taken!');

		const newUser = {
			id: uuidv4(),
			...args.data,
		};

		// prisma.user.push(user);

		const createdUser = await prisma.user.create({
			data: {
				...newUser,
			},
		});

		return createdUser;
	},
	deleteUser: (parent, args, { db }, info) => {
		const userIndex = db.users.findIndex(user => user.id === args.id);

		if (userIndex === -1)
			throw new Error('There is no User with that ID. Delete Unsuccessful!');

		const deletedUsers = db.users.splice(userIndex, 1);
		db.posts = db.posts.filter(post => {
			const match = post.author === args.id;

			if (match)
				db.comments = db.comments.filter(comment => comment.post !== post.id);
			return !match;
		});

		db.comments = db.comments.filter(comment => comment.author !== args.id);

		return deletedUsers[0];
	},
	updateUser: (parent, args, { db }, info) => {
		const { id, data } = args;
		const user = db.users.find(user => user.id === id);

		if (!user) throw new Error('User Not Found!');

		if (typeof data.email === 'string') {
			const emailTaken = db.users.some(user => user.email === data.email);

			if (emailTaken) throw new Error('Email already in use!');

			user.email = data.email;
		}

		if (typeof data.name === 'string') user.name = data.name;

		if (typeof data.age !== 'undefined') user.age = data.age;

		return user;
	},
	createPost: (parent, args, { db }, info) => {
		const userExists = db.users.some(user => user.id === args.data.author);
		if (!userExists) throw new Error('User not Found!');

		const post = {
			id: uuidv4(),
			...args.data,
		};

		db.posts.push(post);

		return post;
	},
	deletePost: (parent, args, { db }, info) => {
		const postIndex = db.posts.findIndex(post => post.id === args.id);

		if (postIndex === -1)
			throw new Error('There is no Post with that ID. Delete Unsuccessful!');

		const deletedPosts = db.posts.splice(postIndex, 1);

		db.comments = db.comments.filter(comment => comment.post !== args.id);
		return deletedPosts[0];
	},
	updatePost: (parent, args, { db }, info) => {
		const { id, data } = args;
		const post = db.posts.find(post => post.id === id);

		if (!post) throw new Error('Post Not Found!');

		if (typeof data.title === 'string') post.title = data.title;
		if (typeof data.body === 'string') post.body = data.body;
		if (typeof data.published === 'boolean') post.published = data.published;

		return post;
	},
	createComment: (parent, args, { db }, info) => {
		const userExists = db.users.some(user => user.id === args.data.author);
		const postExists = db.posts.some(
			post => post.id === args.data.post && post.published
		);

		if (!userExists || !postExists)
			throw new Error('User or Post does not exist!');

		const comment = {
			id: uuidv4(),
			...args.data,
		};

		db.comments.push(comment);

		return comment;
	},
	deleteComment: (parent, args, { db }, info) => {
		const commentIndex = db.comments.findIndex(
			comment => comment.id === args.id
		);
		if (commentIndex === -1)
			throw new Error('There is no Comment with that ID. Delete Unsuccessful!');

		const deletedComments = db.comments.splice(commentIndex, 1);

		return deletedComments[0];
	},
	updateComment: (parent, args, { db }, info) => {
		const { id, data } = args;
		const comment = db.comments.find(comment => comment.id === id);

		if (!comment) throw new Error('Comment Not Found!');

		if (typeof data.text === 'string') comment.text = data.text;

		return comment;
	},
};

// export default Mutation;
module.exports = Mutation;
