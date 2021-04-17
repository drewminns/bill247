import { VercelRequest, VercelResponse } from '@vercel/node'

import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'

const sendgridkey = process.env.sendgrid_bill247_key || ''

const sendEmail = async ({ name, email, from, body }: any) => {
  await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sendgridkey,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: 'dminns@gmail.com',
            },
          ],
          subject: 'The importance of Bill 247',
        },
      ],
      from: {
        email: from,
        name: name,
      },
      content: [
        {
          type: 'text/html',
          value: body,
        },
      ],
    }),
  })
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST') {
    const { name, email, from, body } = req.body
    await sendEmail({ name, email, from, body })
    return res.status(200).end()
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      messgae: "The requested endpoint was not found or doesn't support this method.",
    },
  })
}
