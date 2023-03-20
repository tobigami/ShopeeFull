/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  errorsMessage?: string
  // placeholder?: string
  // className?: string
  name: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
  classInput?: string
  classError?: string
}

function Input({
  type,
  errorsMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete,
  classInput = 'rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-10 p-2 outline-none',
  classError = 'text-red-600 mt-1 min-h-[1.25rem] text-xs sm:text-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        {...registerResult}
        // {...register(name, rules)}
        className={classInput}
      ></input>
      <div className={classError}>{errorsMessage}</div>
    </div>
  )
}

export default Input
