import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/stores/user-store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function UserNav() {
  const { user, setUser, resetUser } = useUserStore();
  const [showDialog, setShowDialog] = useState(false);

  const { setTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const address = formData
      .get("address")
      ?.toString()
      .toLowerCase() as `0x${string}`;

    setUser({ username, address });

    setShowDialog(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={`@${
                user?.address ?? "0x0000000000000000000000000000000000000000"
              }`}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <div className="flex flex-col space-y-1">
                {user ? (
                  <>
                    <p className="text-sm font-medium leading-none">
                      {user?.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.address}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-medium leading-none">
                    Not logged in
                  </p>
                )}
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="p-4 space-y-4">
                <form onSubmit={handleSubmit}>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={user?.username}
                    placeholder="username"
                    required
                  />
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={user?.address}
                    placeholder="0x0000000000000000000000000000000000000000"
                    pattern="^0x[a-fA-F0-9]{40}$"
                    title="Must be a valid Ethereum address"
                    required
                  />
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="w-full block">
                      Theme
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button type="submit" className="w-full">
                    Save
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setShowDialog(true)}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={resetUser}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
