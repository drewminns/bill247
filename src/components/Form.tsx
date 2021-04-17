import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { MPS } from '../mps'

export type FormState = { riding: string; name: string; emailAddress: string; postalcode: string }

function compareStrings(a: string, b: string) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase()
  b = b.toLowerCase()

  return a < b ? -1 : a > b ? 1 : 0
}

export const Form = ({ formCallback }: { formCallback: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: '',
      name: '',
      riding: '',
      postalcode: '',
    },
  })
  const onSubmit = (data: FormState) => formCallback(data)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="md:flex flex-wrap">
        <label htmlFor="emailAddress" className="block md:w-1/2 mb-6 md:pr-6">
          <span className="text-gray-700">Your Email Address</span>
          <input
            type="email"
            {...register('emailAddress', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.emailAddress ? <p className="text-sm text-red-500">Your email is required</p> : null}
        </label>
        <label htmlFor="name" className="block md:w-1/2 mb-6 md:pr-6">
          <span className="text-gray-700">Your name</span>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name ? <p className="text-sm text-red-500">Name is required</p> : null}
        </label>
        <label htmlFor="name" className="block md:w-1/2 mb-6 md:pr-6">
          <span className="text-gray-700">Your Postal Code</span>
          <input
            type="text"
            autoComplete="off"
            {...register('postalcode', {
              required: true,
              pattern: /[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d/,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.postalcode ? <p className="text-sm text-red-500">Please provide a valid postal code</p> : null}
        </label>
        <label htmlFor="riding" className="block md:w-1/2 mb-6 md:pr-6">
          <span className="text-gray-700">Your riding</span>
          <select
            defaultValue="ajax"
            {...register('riding', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="" disabled>
              --Please choose your riding--
            </option>
            {MPS.sort((a, b) => compareStrings(a.ridingName, b.ridingName)).map((mp) => (
              <option key={mp.ridingName} value={mp.ridingName}>
                {mp.ridingName}
              </option>
            ))}
          </select>
          {errors.riding ? <p className="text-sm text-red-500">Please select your postal code</p> : null}
        </label>
        <button className="text-white font-semibold bg-gray-900 py-3 px-5 rounded-md w-full md:w-auto">
          Preview my email
        </button>
      </form>
    </div>
  )
}
