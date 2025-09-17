import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/UserProfile';
import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Navbar = () => {
  const { user, isAuthenticated, logout, isOffline } = useAuth();

  return (
    <nav className="bg-background border-b py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold">Greenverse</Link>
        {isOffline && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                <AlertCircle size={16} />
                <span>Offline Mode</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Backend server is not available. Using local storage for authentication.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <UserProfile />
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;