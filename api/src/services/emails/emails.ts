import type { QueryResolvers, MutationResolvers } from 'types/graphql'

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
  try {
    const emailData = await sendEmail({ input })

    logger.debug(emailData, 'sent email')

    return db.email.create({
      data: emailData,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const sendEmail = async ({ input }) => {
  try {
    const from = 'RedwoodJS Mailer Service <onboarding@resend.dev>'
    const to = input.to || 'delivered@resend.dev'
    const subject = 'hello world from RedwoodJS'

    logger.debug({ from, to, subject }, 'sending email')

    const data = await mailer.send(
      ExampleEmail({
        when: new Date(0).toLocaleString(),
      }),
      {
        from,
        to,
        subject,
      }
    )

    const emailData = { from, to, subject, resendId: data.messageID }

    logger.debug(emailData, 'sent email')

    return emailData
  } catch (error) {
    throw new Error(error)
  }
}
