const Query = {
	users: (parent, args, { db }, info) => {
		if (!args.query) {
			return db.users;
		}

		return db.users.filter(user =>
			user.name.toLowerCase().includes(args.query.toLowerCase())
		);
	},
	posts: (parent, args, { db }, info) => {
		if (!args.query) {
			return db.posts;
		}

		return db.posts.filter(post => {
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
	comments: (parents, args, { db }, info) => db.comments,
};

export default Query;
