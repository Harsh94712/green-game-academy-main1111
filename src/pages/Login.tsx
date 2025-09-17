import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { checkLoginAttempts } from '@/lib/security';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ allowed: boolean; remainingAttempts: number; lockoutTime?: number } | null>(null);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check rate limiting when email changes
  useEffect(() => {
    if (email.trim()) {
      const attemptCheck = checkLoginAttempts(email.trim());
      setRateLimitInfo(attemptCheck);
    } else {
      setRateLimitInfo(null);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'You have successfully logged in!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
          <div className="bg-blue-50 p-3 rounded-lg mt-2">
            <p className="text-sm text-blue-800 text-center">
              <strong>New to Greenverse?</strong><br />
              You must create an account first before you can login.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {rateLimitInfo && !rateLimitInfo.allowed && (
            <Alert className="mb-4" variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Account temporarily locked due to too many failed attempts. 
                Try again in {Math.ceil((rateLimitInfo.lockoutTime! - Date.now()) / (1000 * 60))} minutes.
              </AlertDescription>
            </Alert>
          )}
          
          {rateLimitInfo && rateLimitInfo.allowed && rateLimitInfo.remainingAttempts < 5 && (
            <Alert className="mb-4">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                {rateLimitInfo.remainingAttempts} login attempts remaining. 
                Account will be locked after {5 - rateLimitInfo.remainingAttempts} more failed attempts.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={rateLimitInfo && !rateLimitInfo.allowed}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={rateLimitInfo && !rateLimitInfo.allowed}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || (rateLimitInfo && !rateLimitInfo.allowed)}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;