import { Mailer } from '@redwoodjs/mailer-core'
import { NodemailerMailHandler } from '@redwoodjs/mailer-handler-nodemailer'
import { ResendMailHandler } from '@redwoodjs/mailer-handler-resend'
import { ReactEmailRenderer } from '@redwoodjs/mailer-renderer-react-email'

import { logger } from 'src/lib/logger'

export const mailer = new Mailer({
  development: {
    when: process.env.NODE_ENV !== 'production',
    handler: 'resend',
  },
  handling: {
    handlers: {
      // TODO: Update this handler config or switch it out for a different handler completely
      nodemailer: new NodemailerMailHandler({
        transport: {
          host: 'localhost',
          port: 4319,
          secure: false,
        },
      }),
      resend: new ResendMailHandler({
        apiToken: process.env.RESEND_API_KEY,
      }),
    },
    default: 'resend',
  },

  rendering: {
    renderers: {
      reactEmail: new ReactEmailRenderer(),
    },
    default: 'reactEmail',
  },

  logger,
})
