import "server-only";
import { db } from "./db";
import analyticsServerClient from "./analytics-server";
import { auth } from "@clerk/nextjs/server";

export async function getUsers() {
	const user = auth();
	// if (!user.userId) user.redirectToSignIn();

	const users = await db.query.users.findMany({
		orderBy: (model, { desc }) => desc(model.name),
		where: (model, { eq }) => eq(model.id, 1),
	});

	analyticsServerClient.capture({
		distinctId: user.userId ?? "",
		event: "user getting users",
		properties: {
			lengthReturned: users.length,
		},
	});

	return users;
}
