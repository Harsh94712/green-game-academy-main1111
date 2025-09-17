import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { emailService } from '@/lib/emailService';
import { passwordResetService } from '@/lib/passwordReset';
import { Mail, Clock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

const EmailSimulator: React.FC = () => {
  const [emailLogs, setEmailLogs] = useState(emailService.getEmailLogs());
  const [showTokens, setShowTokens] = useState(false);

  const refreshLogs = () => {
    setEmailLogs(emailService.getEmailLogs());
  };

  const clearLogs = () => {
    emailService.clearEmailLogs();
    passwordResetService.clearAllTokens();
    setEmailLogs([]);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    return status === 'sent' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'sent' ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        Sent
      </Badge>
    ) : (
      <Badge variant="destructive">
        Failed
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Simulation Dashboard
            </CardTitle>
            <CardDescription>
              View password reset emails sent during development
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshLogs}>
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={clearLogs}>
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {emailLogs.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No emails sent yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try the "Forgot Password" feature to see emails here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {emailLogs.map((log) => (
              <Card key={log.id} className="border">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="font-medium">{log.to}</span>
                        {getStatusBadge(log.status)}
                      </div>
                      
                      <h4 className="font-semibold">{log.subject}</h4>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(log.sentAt)}
                        </div>
                        {log.resetToken && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowTokens(!showTokens)}
                              className="h-auto p-0 text-xs"
                            >
                              {showTokens ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              {showTokens ? 'Hide Token' : 'Show Token'}
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {log.resetToken && showTokens && (
                        <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
                          <strong>Reset Token:</strong> {log.resetToken}
                        </div>
                      )}
                      
                      {log.resetToken && (
                        <div className="text-sm">
                          <strong>Reset Link:</strong>{' '}
                          <a 
                            href={`/reset-password?token=${log.resetToken}`}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here to test password reset
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">📧 How Email Simulation Works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• When users request password reset, emails are "sent" and logged here</li>
            <li>• Click "Show Token" to see the reset token for testing</li>
            <li>• Use the reset link to test the complete password reset flow</li>
            <li>• In production, this would integrate with real email services like SendGrid or AWS SES</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSimulator;


