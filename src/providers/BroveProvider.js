const SibApiV3Sdk = require('@getbrevo/brevo')
import { env } from '~/config/environment'

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async (recipientEmail, customSubject, customHtmlContent) => {
  // Khởi tạo một cái sendSmtpEmail với những thông tin cần thiết
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  // Tài khoản gửi mail
  sendSmtpEmail.sender = { email: env.ADMIN_EMAIL_ADDRESS, name: env.ADMIN_EMAIL_NAME }

  // Những tài khoản nhận email
  // 'to' phải là một Array để có thể tùy biến gửi 1 email tới nhiều user
  sendSmtpEmail.to = [{ email: recipientEmail }]

  // Tiêu đề của email:
  sendSmtpEmail.subject = customSubject

  // Nội dung email dạng HTML
  sendSmtpEmail.htmlContent = customHtmlContent

  // Gọi hành động gửi mail
  // More info: thằng sendTransacEmail của thư viện nó sẽ return một Promise
  return apiInstance.sendTransacEmail(sendSmtpEmail)
}

export const BrevoProvider = {
  sendEmail
}

