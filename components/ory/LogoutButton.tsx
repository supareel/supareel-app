"use client";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@/hooks/ory";

type LogoutButtonProps = {
  refresh?: string;
  aal?: string;
};
function LogoutButton({ refresh, aal }: LogoutButtonProps) {
  const onLogout = LogoutLink([aal, refresh]);

  return (
    <Button variant="destructive" onClick={onLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
