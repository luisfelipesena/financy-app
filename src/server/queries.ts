import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getUsers() {
	const user = auth();
	// if (!user.userId) user.redirectToSignIn();

	const users = await db.query.users.findMany({
		orderBy: (model, { desc }) => desc(model.name),
		where: (model, { eq }) => eq(model.id, 1),
	});

	return users;
}
