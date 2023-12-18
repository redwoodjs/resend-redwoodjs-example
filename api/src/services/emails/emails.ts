import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { mailer } from 'src/lib/mailer'
import { ExampleEmail } from 'src/mail/Example/Example'

export const emails: QueryResolvers['emails'] = () => {
  return db.email.findMany()
}

export const email: QueryResolvers['email'] = ({ id }) => {
  return db.email.findUnique({
    where: { id },
  })
}

export const createEmail: MutationResolvers['createEmail'] = async ({
  input,
}) => {
  logger.debug(input, 'creating email ...')

  const emailData = await sendEmail({ input })

  logger.debug(emailData, 'saving sent email ...')

  return db.email.create({
    data: emailData,
  })
}

export const sendEmail = async ({ input }) => {
  try {
    const from =
      input.from || 'RedwoodJS Mailer Service <onboarding@resend.dev>'
    const to = input.to || 'delivered@resend.dev'
    const subject = input.subject || 'hello world from RedwoodJS'
    const when = new Date().toLocaleString()

    logger.debug({ from, to, subject, when }, 'sending email ....')

    const data = await mailer.send(
      ExampleEmail({
        when,
      }),
      {
        from,
        to,
        subject,
      }
    )

    logger.debug(data, 'raw resend email data')

    if (
      data.handlerInformation &&
      data.handlerInformation['statusCode'] &&
      data.handlerInformation['statusCode'] !== 200
    ) {
      logger.error(data.handlerInformation, 'error sending email')
      throw new ValidationError(
        data.handlerInformation['message'] || 'Unable to send email'
      )
    }

    const emailData = { from, to, subject, resendId: data.messageID }

    logger.debug(emailData, 'sent email and saving with data')

    return emailData
  } catch (error) {
    logger.error(error, 'Error sending email')

    throw new ValidationError(error)
  }
}
