import { Shield, LogOut, User } from "lucide-react";
import { NavLink } from "./NavLink";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary rounded-xl shadow-soft">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">CrisisLens</span>
          </NavLink>
          
          <div className="flex items-center gap-6">
            <NavLink 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/public" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Public Updates
            </NavLink>
            <NavLink 
              to="/submit-news" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Submit News
            </NavLink>
            <NavLink 
              to="/extension" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Extension
            </NavLink>

            {user ? (
              <div className="flex items-center gap-2 ml-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span className="max-w-32 truncate">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="ml-4"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
