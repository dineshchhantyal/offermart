import Link from "next/link";
import { currentUser } from "@/lib/auth";
import LogoLink from "../LogoLink";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import { UserButton } from "../auth/user-button";

interface HeaderProps {
  label: string;
}

export const Header = async ({ label }: HeaderProps) => {
  const user = await currentUser();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40" aria-label={label}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <LogoLink showText={true} />

        <div className="flex space-x-4">
          {!user && (
            <>
              <LoginButton mode="modal" asChild>
                <Button variant={"outline"}>Sign In</Button>
              </LoginButton>
              <LoginButton mode="modal" asChild>
                <Button>Sign Up</Button>
              </LoginButton>
            </>
          )}
          {user && (
            <>
              <Link href="/dashboard">
                <Button variant={"outline"} className="text-primary">
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
