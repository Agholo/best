import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";

export async function createUser(
	email: string,
	password: string,
	name?: string
): Promise<{ user: Omit<User, "password">; error: null } | { user: null; error: string }> {
	try {
		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: email.toLowerCase() },
		});

		if (existingUser) {
			return { user: null, error: "User with this email already exists" };
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: hashedPassword,
				name: name || email.split("@")[0],
			},
		});

		// Return user without password
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;
		return { user: userWithoutPassword, error: null };
	} catch (error) {
		console.error("Error creating user:", error);
		return { user: null, error: "Failed to create user" };
	}
}

export async function findUserByEmail(email: string): Promise<User | null> {
	try {
		return await prisma.user.findUnique({
			where: { email: email.toLowerCase() },
		});
	} catch (error) {
		console.error("Error finding user:", error);
		return null;
	}
}

export async function verifyPassword(
	user: User,
	password: string
): Promise<boolean> {
	return bcrypt.compare(password, user.password);
}
