import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, Brain } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Navbar({ isLoggedIn = false, user }: NavbarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Brain className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Interview Coach
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:text-primary hover:bg-secondary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/interviews"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/interviews")
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:text-primary hover:bg-secondary"
            }`}
          >
            Interviews
          </Link>
          <Link
            to="/progress"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/progress")
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:text-primary hover:bg-secondary"
            }`}
          >
            Progress Tracker
          </Link>
          <Link
            to="/about"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/about")
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:text-primary hover:bg-secondary"
            }`}
          >
            About
          </Link>
        </div>

        {/* Profile/Auth Section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}