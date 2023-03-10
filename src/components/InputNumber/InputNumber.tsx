import { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorsMessage?: string
  autoComplete?: string
  classInput?: string
  classError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorsMessage,
    className,
    classInput = 'rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-10 p-2 outline-none',
    classError = 'text-red-600 mt-1 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  /**
   *
   * kiểu tra điều kiện khi người dùng nhập vào là số và có
   * onChange truyền vào thì mới cho nhập vào input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      // thực thi onchange callback từ bên ngoài truyền vào props
      onChange && onChange(e)
      // cập nhật local value
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input className={classInput} onChange={handleChange} {...rest} ref={ref} value={value || localValue}></input>
      <div className={classError}>{errorsMessage}</div>
    </div>
  )
})

export default InputNumber
