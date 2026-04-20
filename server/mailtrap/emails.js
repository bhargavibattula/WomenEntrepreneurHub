
import { forgotPasswordTemplate,sendResetSuccussEamilTemplate ,  sendEmailVerificationCodeTemplate, sendWelcomeEmailTemplate } from "./email.template.js";
import {mailtrapClient , sender} from "./mailtrap.config.js"


export const sendEmailVerificationCode = async (email , verificationToken) => {
    const recipient = [{email}];
    try {
        const response = await  mailtrapClient.send({
            from : sender,
            to : recipient ,
            subject : "Verify your email" ,
            html : sendEmailVerificationCodeTemplate.replace("{VerificationToken}" , verificationToken) ,
            category : "Email Verfication"
        });

        console.log("Email sent succussfullly" , response);

    } catch (error) {
        console.log('Error sending email' , error);
        throw new Error("Error sending email");
    }
};


export const sendWelcomeEmail = async (email , name) => {
    const recipient = [{email}] ;

    try {
        const response = await mailtrapClient.send({
            from : sender ,
            to : recipient ,
            subject :  "welcome" ,
            html : sendWelcomeEmailTemplate.replace("{username}" , name),
            category : ""
        });


        console.log("Email send succussfully" , response)
    } catch (error) {
        console.log('Error sending email' , error);
        throw new Error("Error sending email");
    }
} 


export  const sendResetPasswordEmail = async (email , token) => {
    const recipient = [{email}] ;
    try {
        const response = await mailtrapClient.send({
            from : sender ,
            to : recipient ,
            subject : "Forgot password" ,
            html : forgotPasswordTemplate.replace("{resetLink}" , token).replace("{{username}}" , email.slice(0 , email.indexOf("@") )) ,
            category : "Forgot password"
        });

        console.log("Email send succussfully" , response);
    } catch (error) {
        console.log('Error sending email' , error);
        throw new Error("Error sending email");
    }
}

export const sendResetSuccussEamil = async (email) => {
    const recipient = [{email}] ;
    try {
        const response = await mailtrapClient.send({
            from : sender ,
            to : recipient ,
            subject : "reset password succussfull" ,
            html : sendResetSuccussEamilTemplate.replace("{{username}}" , email.slice(0 , email.indexOf("@"))) ,
            category : "Reset password"
        });

        console.log("Email sent succussfully " , response)
    } catch (error) {
        console.log('Error sending email' , error);
        throw new Error("Error sending email");
    }
}