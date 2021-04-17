import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { MPS } from '../mps'

export type FormState = { riding: string; name: string; email: string }

export const Form = ({ formCallback }: { formCallback: any }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailAddress: '',
      name: '',
      riding: '',
    },
  })
  const onSubmit = (data: FormState) => formCallback(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label htmlFor="emailAddress" className="block">
          <span className="text-gray-700">Email Address</span>
          <input
            type="text"
            {...register('emailAddress', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label htmlFor="name" className="block">
          <span className="text-gray-700">Your name</span>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label htmlFor="riding" className="block">
          <span className="text-gray-700">Your riding</span>
          <select
            defaultValue="ajax"
            {...register('riding', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="" disabled>
              --Please choose your riding--
            </option>
            {MPS.map((mp) => (
              <option key={mp.ridingName} value={mp.ridingName}>
                {mp.ridingName}
              </option>
            ))}
          </select>
        </label>
        <button className="text-white font-semibold bg-gray-900 py-3 px-5 rounded-md">Craft my email</button>
      </form>
    </div>
  )
}
