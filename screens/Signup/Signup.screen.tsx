import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/ui/Card";
import SignupForm from "@/components/SignupForm";
import SignupCardFooter from "./SignupCardFooter";

export default function SignupScreen() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
            Create an account to get started
					</CardDescription>
				</CardHeader>

				<CardContent>
					<SignupForm />
				</CardContent>

				<CardFooter className="flex justify-center">
					<SignupCardFooter />
				</CardFooter>
			</Card>
		</div>
	);
}

