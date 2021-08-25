// 1
const { PrismaClient } = require('@prisma/client');

// 2
const prisma = new PrismaClient();

// 3
async function main() {
	// const newUser = await prisma.user.create({
	// 	data: {
	// 		name: 'Eyitayo Olaigbe',
	// 		email: 'eyitayo@example.com',
	// 	},
	// });
	const userToDel = await prisma.user.delete({
		where: {
			id: 'cksrkr35v00004kgf5ylrj8v1',
		},
	});
	// const postToDel = await prisma.post.delete({
	// 	where: {
	// 		id: 'cksjh4inx000004gfrqtmg51m',
	// 	},
	// });
	// const post = await prisma.post.create({
	// 	data: {
	// 		title: 'First post',
	// 		body: 'This is my first post',
	// 		published: true,
	// 		author: {
	// 			connect: {
	// 				id: 'cksrkr35v00004kgf5ylrj8v1',
	// 			},
	// 		},
	// 	},
	// });
	// const comment = await prisma.comment.create({
	// 	data: {
	// 		text: 'This post is actually a good read',
	// 		author: {
	// 			connect: {
	// 				id: 'cksrkr35v00004kgf5ylrj8v1',
	// 			},
	// 		},
	// 		post: {
	// 			connect: {
	// 				id: 'cksrksp5w0000v4gfa89swl23',
	// 			},
	// 		},
	// 	},
	// });
	const allUsers = await prisma.user.findMany();
	console.log(allUsers);
}

// 4
main()
	.catch(e => {
		throw e;
	})
	// 5
	.finally(async () => {
		await prisma.$disconnect();
	});
