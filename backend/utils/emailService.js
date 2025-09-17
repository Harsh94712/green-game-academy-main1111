import nodemailer from 'nodemailer';
import crypto from 'crypto';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Verify email configuration
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Email service is ready');
      return true;
    } catch (error) {
      console.error('❌ Email service failed:', error.message);
      return false;
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset Your Password - Greenverse',
      html: this.getPasswordResetHTML(resetUrl),
      text: this.getPasswordResetText(resetUrl)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('📧 Password reset email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Greenverse! 🌱',
      html: this.getWelcomeHTML(name),
      text: this.getWelcomeText(name)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('📧 Welcome email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  // Password reset HTML template
  getPasswordResetHTML(resetUrl) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Greenverse</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌱 Greenverse</h1>
          </div>
          <div class="content">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Password Reset Request</h2>
            
            <p>Hello!</p>
            
            <p>We received a request to reset your password for your Greenverse account.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #1f2937; font-weight: 500;">
                Click the button below to reset your password:
              </p>
            </div>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <div class="warning">
              <p style="margin: 0; color: #92400e;">
                <strong>⚠️ Important:</strong> This link will expire in 30 minutes for security reasons.
              </p>
            </div>
            
            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
          </div>
          <div class="footer">
            <p>This email was sent from Greenverse</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Password reset text template
  getPasswordResetText(resetUrl) {
    return `
      Password Reset Request - Greenverse
      
      Hello!
      
      We received a request to reset your password for your Greenverse account.
      
      Click the link below to reset your password:
      ${resetUrl}
      
      Important: This link will expire in 30 minutes for security reasons.
      
      If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
      
      This email was sent from Greenverse
      If you have any questions, please contact our support team.
    `;
  }

  // Welcome email HTML template
  getWelcomeHTML(name) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Greenverse!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌱 Welcome to Greenverse!</h1>
          </div>
          <div class="content">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${name}! 👋</h2>
            
            <p>Welcome to Greenverse - your journey to becoming an environmental champion starts now!</p>
            
            <p>You've successfully created your account and can now:</p>
            <ul>
              <li>🎮 Take interactive quizzes about environmental topics</li>
              <li>🏆 Earn badges and climb the leaderboard</li>
              <li>🌍 Complete daily eco-challenges</li>
              <li>📚 Learn about climate change and sustainability</li>
              <li>👥 Compete with friends and classmates</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}" class="button">Start Learning Now!</a>
            </div>
            
            <p>Ready to make a difference for our planet? Let's go! 🌍✨</p>
          </div>
          <div class="footer">
            <p>This email was sent from Greenverse</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Welcome email text template
  getWelcomeText(name) {
    return `
      Welcome to Greenverse!
      
      Hello ${name}!
      
      Welcome to Greenverse - your journey to becoming an environmental champion starts now!
      
      You've successfully created your account and can now:
      - Take interactive quizzes about environmental topics
      - Earn badges and climb the leaderboard
      - Complete daily eco-challenges
      - Learn about climate change and sustainability
      - Compete with friends and classmates
      
      Visit ${process.env.FRONTEND_URL} to start learning!
      
      Ready to make a difference for our planet? Let's go!
      
      This email was sent from Greenverse
      If you have any questions, please contact our support team.
    `;
  }
}

export default EmailService;

