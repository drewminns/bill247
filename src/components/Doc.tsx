import React, { useState } from 'react'
import { HtmlEditor, Editor } from '@aeaton/react-prosemirror'
import { plugins, schema } from '@aeaton/react-prosemirror-config-default'

type DocProps = { name: string; firstName: string; lastName: string }

export const Doc = ({ name, firstName, lastName }: DocProps) => {
  const initialValue = `
    <p>Dear ${firstName} ${lastName}</p>
    <p></p>
    <p>My name is ${name} and I am a constituent in your district. I am writing to you to express my support for Bill 247, Paid Personal Emergency Leave Now Act, 2021.</p>
    <p></p>
    <p>Paid personal emergency leave allows employers and employees alike to succeed, especially during times of public health emergencies.</p>
    <p></p>
    <p>Employees deserve to be able to do their jobs, care for themselves and their families and to stay safe and healthy. Employers deserve workplaces that are productive and kept safe.</p>
    <p></p>
    <p>Time off to get well or to care for an ill loved one is a matter of dignity and public safety and is, ultimately, a key to productivity. Paid personal emergency leave ensures that workplaces remain open and prevents the spread of illnesses by giving employees time off to get well or to care for a loved one.</p>
    <p></p>
    <p>Paid personal emergency leave is necessary to support employers and employees.</p>
    <p></p>
    <p>Many people are being forced to choose between providing for their families or staying safe and healthy. This puts not only them but our public health in jeopardy and can easily be addressed with the passage of this Bill.</p>
    <p></p>
    <p>I ask that you support Bill 247 to provide the working class families in our riding the opportunity to balance both their work requirements and the health and safety of themselves and their families.</p>
    <p></p>
    <p>I would appreciate a response from you before the next vote on this Bill.</p>
    <p></p>
    <p>Thank you for taking the time to listen to my concerns, and I look forward to receiving a response from you.</p>
    <p></p>
    <p>Sincerely,<br /> ${name}</p>
  `
  const [value, setValue] = useState(initialValue)

  return (
    <HtmlEditor schema={schema} plugins={plugins} value={value} handleChange={setValue} debounce={250}>
      <Editor />
    </HtmlEditor>
  )
}
