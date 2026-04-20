export const sendEmailVerificationCodeTemplate = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .content {
            text-align: center;
        }
        .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            color: #888;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Email Verification</h1>
            <p>Hello,</p>
            <p>Thank you for registering with us. Please use the verification code below to verify your email address.</p>
            <div class="verification-code">{VerificationToken}</div> 
            <p>If you didn't request this, please ignore this email.</p>
            <p>Otherwise, you can verify your account by clicking the button below:</p>
            <a href="https://yourwebsite.com/verify" class="btn">Verify Email</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;

export const sendWelcomeEmailTemplate = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .content {
            text-align: center;
        }
        .content h1 {
            color: #4CAF50;
        }
        .username {
            font-size: 22px;
            font-weight: bold;
            color: #333;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            color: #888;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Welcome to Our Community!</h1>
            <p>Hello <span class="username">{username}</span>,</p> <!-- Replace {{username}} dynamically -->
            <p>We are thrilled to have you on board! Thank you for joining us.</p>
            <p>Feel free to explore and get started with your account. If you need any help, don’t hesitate to reach out.</p>
            <p>Click the button below to get started:</p>
            <a href="https://yourwebsite.com/dashboard" class="btn">Go to Dashboard</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;

export const forgotPasswordTemplate = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .content {
            text-align: center;
        }
        .content h1 {
            color: #FF6F61;
        }
        .username {
            font-size: 22px;
            font-weight: bold;
            color: #333;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            color: #888;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background-color: #FF6F61;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #e65d55;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Password Reset Request</h1>
            <p>Hello <span class="username">{{username}}</span>,</p> 
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="{resetLink}" class="btn">Reset Password</a> 
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`


export const sendResetSuccussEamilTemplate = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .content {
            text-align: center;
        }
        .content h1 {
            color: #4CAF50;
        }
        .username {
            font-size: 22px;
            font-weight: bold;
            color: #333;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            color: #888;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Password Reset Successfully!</h1>
            <p>Hello <span class="username">{{username}}</span>,</p> <!-- Replace {{username}} dynamically -->
            <p>Your password has been reset successfully. You can now log in to your account using your new password.</p>
            <a href="https://yourwebsite.com/login" class="btn">Login to Your Account</a> <!-- Replace with actual login link -->
            <p>If you didn’t request this change, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`