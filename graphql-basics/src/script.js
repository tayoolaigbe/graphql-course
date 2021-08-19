// 1
const { PrismaClient } = require('@prisma/client');

// 2
const prisma = new PrismaClient();

// 3
async function main() {
	// const newUser = await prisma.user.create({
	// 	data: {
	// 		name: 'Biola Olusola',
	// 		email: 'biola@example.com',
	// 	},
	// });
	// const userToDel = await prisma.user.delete({
	// 	where: {
	// 		id: 'cksjg5hny0000lkgfzvao25sq',
	// 	},
	// });
	// const postToDel = await prisma.post.delete({
	// 	where: {
	// 		id: 'cksjg7he90000kkgfzx174sc8',
	// 	},
	// });
	const post = await prisma.post.create({
		data: {
			title: 'Second post',
			body: 'This is my second post',
			published: true,
			author: {
				connect: {
					id: 'cksjh4inx000004gfrqtmg51m',
				},
			},
		},
	});
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
