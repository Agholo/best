import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/ui/Card";
import LoginForm from "@/components/LoginForm";
import LoginCardFooter from "./LoginCardFooter";

export default function LoginScreen() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
            Enter your credentials to access your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<LoginForm />
				</CardContent>

				<CardFooter className="flex justify-center">
					<LoginCardFooter />
				</CardFooter>
			</Card>
		</div>
	);
}