import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";



    @Injectable()
    export class Mailer {
        constructor(private readonly mailerservice:MailerService){}
    
        async SendAccessCodeMail(email:string, accesscode: string,fullname:string,eventtitle:string, eventlocation:string,eventtime:string,table_number:string[]):Promise<void>{
            const subject = "Event AccessCode Issuance";
        const content = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Guest Registration - AccessCode Issuance</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              color: #333333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .logo {
              text-align: center;
              margin-bottom: 10px;
            }
            .verification-heading {
              text-align: center;
              color: #43215b;
              font-size: 24px;
              margin-bottom: 10px;
            }
            .message {
              text-align: center;
              font-size: 16px;
              margin-bottom: 20px;
            }
            .otp {
              text-align: center;
              font-size: 30px;
              color: #43215b;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .instructions {
              font-size: 16px;
              line-height: 1.4;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #43215b;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-6/300373057_467529195382525_3707963933638634387_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BUu0IqM6JJ8AX-B8GBn&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&oh=00_AfBH8xGPdfAgQMLJh-eqJX_3y1_fNVmaqaek8azQpyfUwg&oe=6557D0EF" alt="elf events Logo" width="250" height="250" />
            </div>
            <h1 class="verification-heading">Dear, ${fullname}!</h1>
            <p class="message">Your Registration Access Code:</p>
            <p class="otp">${accesscode}</p>
            <div class="instructions">
              <p>
                Thank you for registering with us! Your Access Code is a key to a magical experience at our upcoming event. with the following details: 
              </p>
              <p> Event Title:  ${eventtitle} </p>
              <p> Event Venue:  ${eventlocation} </p>
              <p> Event Time:  ${eventtime} </p>
              <p> Table Number:  ${table_number} </p>
              <p>
                Use the Access Code provided above for seamless entry during the event. This unique code serves as your exclusive invitation.
              </p>
              <p>
                If you didn't request this Access Code, please disregard this email. Your data is secure with us.
              </p>
              <p>
                For any questions or assistance, contact our support team at <a class="button" href="mailto:support@elfevents.com">support@elfevents.com</a>
              </p>
            </div>
            <p class="footer">EASE HUB <br> powered by ElfEvents</p>
          </div>
        </body>
        </html>
        
        `;
    
    
            await this.mailerservice.sendMail({to:email,subject,html:content })
            
        }
    
    
        async SendVerificationeMail(email:string, token: string,name:string):Promise<void>{
          const subject = "Verification Link";
      const content = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Verification - Verification Linke</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            color: #333333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 10px;
          }
          .verification-heading {
            text-align: center;
            color: #43215b;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .message {
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .otp {
            text-align: center;
            font-size: 30px;
            color: #43215b;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .instructions {
            font-size: 16px;
            line-height: 1.4;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #43215b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-6/300373057_467529195382525_3707963933638634387_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BUu0IqM6JJ8AX-B8GBn&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&oh=00_AfBH8xGPdfAgQMLJh-eqJX_3y1_fNVmaqaek8azQpyfUwg&oe=6557D0EF" alt="elf events Logo" width="250" height="250" />
          </div>
          <h1 class="verification-heading">Dear, ${name}!</h1>
          <p class="message">Your Verification Link:</p>
          <p class="otp">${token}</p>
    
         
          <div class="instructions">
            <p>
              You are getting this email because, you just signed up as a new User on Blogz .
            </p>      
            <p>
              Please use the verication link sent to complete your registration process.
            </p>
            <p>
              If you didn't request this Verification Link, please disregard this email. Your data is secure with us.
            </p>
            <p>
              For any questions or assistance, contact our support team at <a class="button" href="mailto:support@blogz.com">support@blogz.com</a>
            </p>
          </div>
          <p class="footer">BLOGZ <br> powered by nedsolution</p>
        </div>
      </body>
      </html>
      
      `;
    
    
          await this.mailerservice.sendMail({to:email,subject,html:content })
          
      }
    
    
        
        async SendPasswordResetLinkMail(email:string, resetlink: string, name:string):Promise<void>{
          const subject = "Password Reset Token";
          const content = `<!DOCTYPE html>
      <html>
        <head>
          <title>Forgot Password Reset Token</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              color: #333333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .logo {
              text-align: center;
              margin-bottom: 10px;
            }
            .verification-heading {
              text-align: center;
              color: #43215b;
              font-size: 20px;
              margin-bottom: 10px;
            }
            .message {
              text-align: center;
              font-size: 16px;
              margin-bottom: 20px;
            }
            .otp {
              text-align: center;
              font-size: 30px;
              color: #43215b;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .instructions {
              font-size: 16px;
              line-height: 1.4;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #43215b;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-6/300373057_467529195382525_3707963933638634387_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BUu0IqM6JJ8AX-B8GBn&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&oh=00_AfBH8xGPdfAgQMLJh-eqJX_3y1_fNVmaqaek8azQpyfUwg&oe=6557D0EF" alt="elfevents Logo" width="250" height="250" />
            </div>
            <h1 class="verification-heading">Password Reset Token</h1>
            <p class="message"><span class="username">HI ${name}</span>,</p>
            <p class="otp">Your Password Reset Token : <span class="otp-code">${resetlink}</span></p>
            <div class="instructions">
              <p>
                We are sorry you couldn't get access into BLOGZ, a blogpost Content Management System. Please use the Reset Token  provided above to enter a new password.
              </p>
              <p>
                The password reset token is valid for a limited time, and it should be used to complete the password reset process.
              </p>
              <p>
                If you did not request this reset link, please ignore this email. Your account will remain secure.
              </p>
              <p >
              For any questions or assistance, contact our support team at <a class="button" href="mailto:support@blogz.com">support@blogz.com</a>
              </p>
            </div>
            <p class="footer">BLOGZ  <br> powered by nedsolutions</p>
          </div>
        </body>
      </html>
      `;
    
          await this.mailerservice.sendMail({to:email,subject,html:content })
          
      }
    
    
      async SendMailForEventReminder(email:string,contract_duration:string,contract_worth:string,contract_validity_number:string,to:string,partner:string,expiration_date:Date):Promise<void>{
        const subject = "contract expiry reminder"
        const content = `
        <!DOCTYPE html>
    <html>
    <head>
    <title>Contract Expiry Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        color: #333333;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .logo {
        text-align: center;
        margin-bottom: 10px;
      }
      .contract-heading {
        text-align: center;
        color: #aa6c39;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .contract-details {
        font-size: 16px;
        line-height: 1.4;
      }
      .contract-qr-code {
        text-align: center;
        margin-top: 30px;
      }
      .signature {
        text-align: right;
        font-size: 18px;
        font-weight: bold;
        margin-top: 20px;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <div class="logo">
        <img src="https://yourcompanylogo.com/logo.png" alt="Company Logo" width="150" height="150" />
      </div>
      <h1 class="contract-heading">Contract Expiry reminder</h1>
      <p class="contract-details">
        Dear ${to},
      </p>
      <p class="contract-details">
    
        This letter is to inform you that the contract between ${to} and ${partner}  is expiring in few days.
    
        The details of the contract are as follows:
      </p>
      <ul class="contract-details">
        <li>Contract Worth: ${contract_worth}</li>
        <li>Contract Validity Number: ${contract_validity_number}</li>
        <li>Contract Duration: ${contract_duration}</li>
        <li>Contract Expiration Date: ${expiration_date}</li>
      </ul>
      <div class="contract-qr-code">
        <!-- Insert the QR code here (if applicable) -->
        <img src="https://yourqrcode.com/contract_qr_code.png" alt="Contract QR Code" width="200" height="200" />
      </div>
      <p class="contract-details">
        If you have any questions or concerns, feel free to contact our support team at support@walkway.com.
      </p>
      <p class="contract-details">
        We look forward to a successful partnership with you. Thank you for choosing Walkway!
      </p>
      <p class="signature">
        Best regards,
        Walkway Team
      </p>
    </div>
    </body>
    </html>
        `
        await this.mailerservice.sendMail({to:email,subject,html:content})
    
      }
    }