"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../context/auth-context";

export default function Home() {
  const router = useRouter();

  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [usuario, router]);

  return null;
}
