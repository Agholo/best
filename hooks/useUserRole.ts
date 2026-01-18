import { useSession } from "next-auth/react";
import { Role } from "@/types/user";

export default function useUserRole() {
	const { data: session } = useSession();
	const isAdmin = session?.user?.role === Role.admin;
	const isCustomer = session?.user?.role === Role.customer;

	return {
		role: session?.user?.role,
		isAdmin,
		isCustomer,
	};
}