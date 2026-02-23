"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth-service";

export default function Greeting() {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUserName(user.name);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="text-center py-4">
      <div className="text-gray-500 text-xs font-semibold tracking-normal">
        {currentDate}
      </div>
      <div className="text-zinc-900 text-4xl pt-1 font-bold tracking-tight">
        {loading ? (
          <div className="h-10 w-48 bg-zinc-200 animate-pulse rounded mx-auto mt-1" />
        ) : (
          `Hello, ${userName.split(" ")[0]}!`
        )}
      </div>
    </div>
  );
}
