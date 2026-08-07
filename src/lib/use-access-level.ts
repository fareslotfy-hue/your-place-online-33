import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useSession } from "@/lib/use-session";
import { getMyAccessLevel } from "@/lib/app.functions";

export type AccessLevel = "guest" | "free" | "subscribed";

export function useAccessLevel(): { level: AccessLevel; loading: boolean } {
  const { user, loading: sessionLoading } = useSession();
  const accessFn = useServerFn(getMyAccessLevel);

  const query = useQuery({
    queryKey: ["access-level", user?.id ?? null],
    queryFn: () => accessFn(),
    enabled: !!user,
    staleTime: 60_000,
  });

  if (sessionLoading) return { level: "guest", loading: true };
  if (!user) return { level: "guest", loading: false };
  if (query.isLoading) return { level: "free", loading: true };
  return { level: query.data?.subscribed ? "subscribed" : "free", loading: false };
}

export const FREE_PREVIEW_PAGES = 5;
