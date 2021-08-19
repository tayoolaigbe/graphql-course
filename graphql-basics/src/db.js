const comments = [
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

const db = { users, posts, comments };

// export default db;
module.exports = db;
