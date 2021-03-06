import React, { useState } from 'react'

import { Doc } from './components/Doc'
import { Form, FormState } from './components/Form'
import { MPS } from './mps'

type MPState = { ridingName: string; firstName: string; lastName: string; email: string }

export const App = () => {
  const [fieldValues, setFieldValues] = useState<FormState | null>(null)
  const [mpValues, setMPValues] = useState<MPState | null>(null)
  const [docValue, setDocValue] = useState<string | null>(null)
  const [errors, setErrors] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleFormCallback = (data: FormState) => {
    const mp = MPS.filter((mps) => mps.ridingName === data.riding)[0]
    setMPValues(mp)
    setFieldValues(data)
  }

  const handleReset = () => {
    setSuccess(false)
    setErrors(false)
    setMPValues(null)
    setDocValue(null)
    setFieldValues(null)
  }

  const sendEmail = async () => {
    const body = {
      name: fieldValues?.name,
      from: fieldValues?.emailAddress,
      email: mpValues?.email,
      body: docValue,
    }
    try {
      setErrors(false)
      await fetch('api/email', {
        method: 'post',
        body: JSON.stringify(body),
      })
      setSuccess(true)
    } catch (err) {
      setSuccess(false)
      setErrors(true)
    }
  }

  return (
    <div className="px-2 md:px-0 container mx-auto max-w-screen-md">
      <header className="mt-16 text-center">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-2 text-purple-500 mb-4">
          <a href="https://healthydebate.ca/opinions/denying-paid-sick-days/">
            Paid sick days can help end the pandemic.
          </a>
        </h1>
        <p className="text-xl md:text-3xl font-bold tracking-tight mb-2">
          Tell your MPP to support Bill 247 —{' '}
          <a
            href="https://www.ola.org/en/legislative-business/bills/parliament-42/session-1/bill-247"
            className="underline"
          >
            Paid Personal Emergency Leave Now Act.
          </a>
        </p>
      </header>
      {!fieldValues && !mpValues ? (
        <>
          <div className="mt-12">
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
              <li>
                Fill out your personal information to generate an email to send. We will send a copy to you and your
                MPP.
              </li>
              <li>Press send!</li>
            </ol>
          </div>
          <div className="py-8 ">
            <Form formCallback={handleFormCallback} />
          </div>
        </>
      ) : null}

      {fieldValues && mpValues && !success ? (
        <div className="my-8">
          <p className="text-gray-500 text-xs text-center mb-1">
            Pssst. Feel free to edit the note before you send it.
          </p>
          <div className="border rounded-md p-4 mb-3">
            <Doc
              name={fieldValues?.name || ''}
              firstName={mpValues?.firstName || ''}
              lastName={mpValues?.lastName || ''}
              postalCode={fieldValues.postalcode || ''}
              handleChangeCB={setDocValue}
            />
          </div>
          <button
            className="text-white font-semibold bg-gray-900 py-3 px-5 rounded-md w-full md:w-auto"
            onClick={sendEmail}
          >
            Send email
          </button>
          {errors ? (
            <div>
              <p className="text-red-400">Error!</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {success ? (
        <div className="text-center py-8">
          <p className="text-green-500 text-4xl font-bold">Sent!</p>
          <p className="text-xl">Thank you. Please share this link and ask others to contact their MPP's.</p>
          <p className="text-gray-600">You should receive a copy in your mailbox shortly.</p>
          <button onClick={handleReset} className="font-semibold py-3 px-4 bg-gray-900 text-white rounded-md mt-4">
            Send another?
          </button>
        </div>
      ) : null}

      <div className="border-t pt-10">
        <h2 className="text-3xl font-bold mb-6">Resources</h2>
        <ul className="list-inside list-disc space-y-3 text-sm underline">
          <li>
            <a
              href="https://springmag.ca/the-fight-for-paid-sick-days-isnt-over"
              title="The fight for paid sick days isn’t over"
            >
              The fight for paid sick days isn’t over
            </a>
          </li>
          <li>
            <a href="https://www.15andfairness.org/paid_sick_days_for_all" title="Help us win paid sick days for all">
              Help us win paid sick days for all
            </a>
          </li>
          <li>
            <a
              href="https://www.thestar.com/amp/news/gta/2021/04/16/ontarians-strongly-favour-paid-sick-days-poll-finds.html"
              title="Ontarians strongly favour paid sick days, poll finds"
            >
              Ontarians strongly favour paid sick days, poll finds
            </a>
          </li>
          <li>
            <a
              href="https://www.cbc.ca/amp/1.5907723"
              title="'Small investment, big payback': Business owners call on Ford government to legislate paid sick leave"
            >
              'Small investment, big payback': Business owners call on Ford government to legislate paid sick leave
            </a>
          </li>
          <li>
            <a
              href="https://theonn.ca/paid-sick-days-can-help-us-beat-the-pandemic/"
              title="Paid sick days can help us beat the pandemic"
            >
              Paid sick days can help us beat the pandemic
            </a>
          </li>
        </ul>
      </div>

      <footer className="py-12 text-center text-gray-500">
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
        <p>
          Found a bug or something missing?{' '}
          <a href="mailto:drew@usegoodnbr.com" className="text-purple-600">
            Email me and let me know.
          </a>
        </p>
      </footer>
    </div>
  )
}
