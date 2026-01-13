export const resetPasswordTemplate = (name: string, token: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
      .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
      .token-box { background: #fff; border: 2px solid #4F46E5; padding: 15px; margin: 20px 0; border-radius: 5px; font-family: monospace; font-size: 14px; word-break: break-all; }
      .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🔐 Reset Your Password</h1>
      </div>
      <div class="content">
        <h2>Hello ${name},</h2>
        <p>You requested to reset your password for Emmott Asset Platform.</p>
        <p>Use the following token to reset your password:</p>
        <div class="token-box">
          ${token}
        </div>
        <p><strong>Important:</strong></p>
        <ul>
          <li>This token is valid for <strong>1 hour</strong></li>
          <li>Use the <code>POST /auth/reset-password</code> endpoint with this token</li>
          <li>If you did not request this, please ignore this email</li>
        </ul>
      </div>
      <div class="footer">
        <p>Emmott Asset Platform | Secure Asset Management</p>
      </div>
    </div>
  </body>
  </html>
`;
