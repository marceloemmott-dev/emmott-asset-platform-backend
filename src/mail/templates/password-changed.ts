export const passwordChangedTemplate = (name: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #10B981; color: white; padding: 20px; text-align: center; }
      .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
      .alert-box { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
      .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      .btn { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>✅ Password Changed Successfully</h1>
      </div>
      <div class="content">
        <h2>Hello ${name},</h2>
        <p>This email confirms that your password has been successfully changed.</p>
        
        <div class="alert-box">
          <strong>⚠️ Security Alert:</strong>
          <p>If you did NOT make this change, please contact our support team immediately and secure your account.</p>
        </div>

        <p><strong>Change Details:</strong></p>
        <ul>
          <li>📅 Date: ${new Date().toLocaleString()}</li>
          <li>🔐 Action: Password Reset Completed</li>
          <li>✅ Status: Successful</li>
        </ul>

        <p>Your account is now secured with your new password.</p>
        
        <a href="mailto:support@emmott.com" class="btn">Contact Support</a>
      </div>
      <div class="footer">
        <p>Emmott Asset Platform | Secure Asset Management</p>
        <p>This is an automated security notification</p>
      </div>
    </div>
  </body>
  </html>
`;
