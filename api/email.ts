import { VercelRequest, VercelResponse } from '@vercel/node'
import sgMail from '@sendgrid/mail'

const sendgridkey = process.env.sendgrid_bill247_key || ''
sgMail.setApiKey(sendgridkey)

const sendEmail = async ({ name, email, from, body }: any) => {
  const msg = {
    to: email,
    from: {
      name,
      email: 'community@usegoodnbr.com',
    },
    cc: from,
    reply_to: from,
    subject: `Constituent Request - ${name} supports Bill 247`,
    html: body,
  }
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST') {
    const { name, email, from, body } = JSON.parse(req.body)
    console.log(JSON.parse(req.body))
    try {
      await sendEmail({ name, email, from, body })
      return res.status(200).json({ success: true })
    } catch (err) {
      return res.status(200).json({ success: false })
    }
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      messgae: "The requested endpoint was not found or doesn't support this method.",
    },
  })
}
