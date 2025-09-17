// Email service simulation for password reset
// In production, this would integrate with services like SendGrid, AWS SES, etc.

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  sentAt: number;
  status: 'sent' | 'failed';
  resetToken?: string;
}

// Email storage (in production, emails would be sent via real service)
let emailLogs: EmailLog[] = [];

// Load email logs from localStorage
const loadEmailLogs = (): void => {
  try {
    const stored = localStorage.getItem('emailLogs');
    if (stored) {
      emailLogs = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load email logs:', error);
    emailLogs = [];
  }
};

// Save email logs to localStorage
const saveEmailLogs = (): void => {
  try {
    localStorage.setItem('emailLogs', JSON.stringify(emailLogs));
  } catch (error) {
    console.error('Failed to save email logs:', error);
  }
};

// Initialize on module load
loadEmailLogs();

export const emailService = {
  // Send password reset email
  sendPasswordResetEmail: async (email: string, resetToken: string): Promise<boolean> => {
    try {
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
      
      const emailTemplate: EmailTemplate = {
        to: email,
        subject: 'Reset Your Password - Greenverse',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">🌱 Greenverse</h1>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Password Reset Request</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Hello! We received a request to reset your password for your Greenverse account.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #1f2937; font-weight: 500;">
                  Click the button below to reset your password:
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                  Reset Password
                </a>
              </div>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>⚠️ Important:</strong> This link will expire in 30 minutes for security reasons.
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
                              <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                This email was sent from Greenverse<br>
                If you have any questions, please contact our support team.
              </p>
            </div>
          </div>
        `,
        text: `
          Password Reset Request - Greenverse
          
          Hello! We received a request to reset your password for your Greenverse account.
          
          Click the link below to reset your password:
          ${resetUrl}
          
          Important: This link will expire in 30 minutes for security reasons.
          
          If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          
          This email was sent from Greenverse
          If you have any questions, please contact our support team.
        `
      };
      
      // Log the email
      const emailLog: EmailLog = {
        id: Date.now().toString(),
        to: email,
        subject: emailTemplate.subject,
        sentAt: Date.now(),
        status: 'sent',
        resetToken: resetToken
      };
      
      emailLogs.push(emailLog);
      saveEmailLogs();
      
      // In production, you would send the email here using a service like:
      // - SendGrid: await sgMail.send(emailTemplate)
      // - AWS SES: await ses.sendEmail(emailTemplate)
      // - Nodemailer: await transporter.sendMail(emailTemplate)
      
      console.log('📧 Password reset email sent:', {
        to: email,
        resetUrl: resetUrl,
        token: resetToken
      });
      
      return true;
      
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      
      // Log failed email
      const emailLog: EmailLog = {
        id: Date.now().toString(),
        to: email,
        subject: 'Password Reset Request - Greenverse',
        sentAt: Date.now(),
        status: 'failed'
      };
      
      emailLogs.push(emailLog);
      saveEmailLogs();
      
      return false;
    }
  },

  // Get email logs (for testing/debugging)
  getEmailLogs: (): EmailLog[] => {
    return [...emailLogs];
  },

  // Clear email logs (for testing)
  clearEmailLogs: (): void => {
    emailLogs = [];
    localStorage.removeItem('emailLogs');
  },

  // Simulate email delivery (for demo purposes)
  simulateEmailDelivery: (email: string): EmailLog | null => {
    const emailLog = emailLogs.find(log => log.to === email && log.status === 'sent');
    return emailLog || null;
  }
};
