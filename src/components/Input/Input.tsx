import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

type Props = {
  type: React.HTMLInputTypeAttribute
  errorsMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

function Input({ type, errorsMessage, placeholder, className, name, register, rules, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-10 p-2 outline-none'
      ></input>
      <div className='text-red-600 mt-1 min-h-[1.25rem] text-sm'>{errorsMessage}</div>
    </div>
  )
}

export default Input
