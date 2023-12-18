import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { createEmail } from 'src/services/emails/emails'

export const handler = async (_event: APIGatewayEvent, _context: Context) => {
  try {
    const data = createEmail({ input: { to: 'delivered@resend.dev' } })

    logger.debug(JSON.stringify(data), 'Email sent!')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error,
      }),
    }
  }
}
