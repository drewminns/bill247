import React, { useState } from 'react'

import { Doc } from './components/Doc'
import { Form, FormState } from './components/Form'
import { MPS } from './mps'

type MPState = { ridingName: string; firstName: string; lastName: string; email: string }

export const App = () => {
  const [fieldValues, setFieldValues] = useState<FormState | null>(null)
  const [mpValues, setMPValues] = useState<MPState | null>(null)

  const handleFormCallback = (data: FormState) => {
    const mp = MPS.filter((mps) => mps.ridingName === data.riding)[0]
    setMPValues(mp)
    setFieldValues(data)
  }

  const sendEmail = () => {}

  return (
    <div className="px-2 md:px-0 container mx-auto max-w-screen-md">
      <header className="mt-16 text-center ">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-2 text-yellow-500 mb-4">
          <a href="https://healthydebate.ca/opinions/denying-paid-sick-days/">
            Denying sick days is driving the pandemic.
          </a>
        </h1>
        <p className="text-xl md:text-3xl font-bold tracking-tight mb-2">
          We have an opportunity to make a critical decision.
        </p>
        <p className="text-lg tracking-tight text-gray-500">
          Ask your MPP to support{' '}
          <a
            href="https://www.ola.org/en/legislative-business/bills/parliament-42/session-1/bill-247"
            className="underline"
          >
            Bill 247, Paid Personal Emergency Leave Now Act, 2021.
          </a>
        </p>
      </header>
      {!fieldValues && !mpValues ? (
        <>
          <div className="mt-8 ">
            <ol className="list-decimal space-y-4 text-gray-600 list-inside text-sm">
              <li>
                Select your riding. If you don’t know the name of your riding,{' '}
                <a
                  href="https://www.elections.on.ca/en/voting-in-ontario/electoral-districts.html"
                  target="_blank"
                  className="underline"
                  rel="noreferrer"
                >
                  use this link to search by your postal code.
                </a>
              </li>
              <li>Fill out your personal information to generate an email to send.</li>
              <li>Press send!</li>
            </ol>
          </div>
          <div className="py-8 ">
            <Form formCallback={handleFormCallback} />
          </div>
        </>
      ) : null}

      {fieldValues && mpValues ? (
        <div className="my-6">
          <p className="text-gray-500 text-xs text-center mb-1">
            Pssst. Feel free to edit the note before you send it.
          </p>
          <div className="border rounded-md p-4 mb-3">
            <Doc
              name={fieldValues?.name || ''}
              firstName={mpValues?.firstName || ''}
              lastName={mpValues?.lastName || ''}
              postalCode={fieldValues.postalcode || ''}
            />
          </div>
          <button className="text-white font-semibold bg-green-500 py-3 px-5 rounded-md" onClick={sendEmail}>
            Send email
          </button>
        </div>
      ) : null}

      <div className="border-t pt-6">
        <h2 className="text-3xl font-bold mb-6">Resources</h2>
        <ul className="list-inside list-disc space-y-3 text-sm underline">
          <li>
            <a href="https://springmag.ca/the-fight-for-paid-sick-days-isnt-over">
              https://springmag.ca/the-fight-for-paid-sick-days-isnt-over
            </a>
          </li>
          <li>
            <a href="https://www.15andfairness.org/paid_sick_days_for_all">
              https://www.15andfairness.org/paid_sick_days_for_all
            </a>
          </li>
          <li>
            <a href="https://www.thestar.com/amp/news/gta/2021/04/16/ontarians-strongly-favour-paid-sick-days-poll-finds.html">
              https://www.thestar.com/amp/news/gta/2021/04/16/ontarians-strongly-favour-paid-sick-days-poll-finds.html
            </a>
          </li>
          <li>
            <a href="https://www.cbc.ca/amp/1.5907723">https://www.cbc.ca/amp/1.5907723</a>
          </li>
          <li>
            <a href="https://theonn.ca/paid-sick-days-can-help-us-beat-the-pandemic/">
              https://theonn.ca/paid-sick-days-can-help-us-beat-the-pandemic/
            </a>
          </li>
          <li>
            <a href="https://theonn.ca/paid-sick-days-can-help-us-beat-the-pandemic/">
              https://theonn.ca/paid-sick-days-can-help-us-beat-the-pandemic/
            </a>
          </li>
        </ul>
      </div>

      <footer className="py-8 text-center text-gray-500">
        <span role="img" aria-label="wave emoji">
          👋
        </span>{' '}
        Created by the humans at{' '}
        <a href="https://usegoodnbr.com" className="text-purple-600">
          Good Neighbour
        </a>{' '}
        and{' '}
        <a href="https://dvxd.co" className="text-purple-600">
          DVXD
        </a>
      </footer>
    </div>
  )
}
