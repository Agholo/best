import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/services/user";
import { signupSchema } from "@/app/auth/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input using zod schema
    const validationResult = signupSchema.safeParse({
      email,
      password,
      name: name || undefined,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    // Create user with validated data
    const validatedData = validationResult.data;
    const result = await createUser(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully", user: result.user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
