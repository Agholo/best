"use client";

import useRedirect from "@/hooks/useRedirect";

export default function NotFound() {
  const { redirect } = useRedirect();

  redirect("/home");

  return null;
}