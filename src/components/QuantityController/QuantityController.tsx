import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classWrapper?: string
}

export default function QuantityController({
  onIncrease,
  onType,
  onDecrease,
  onFocusOut,
  classWrapper,
  value,
  max,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.target.value))
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (max !== undefined && _value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }
  return (
    <div className={`flex items-center ${classWrapper}`}>
      <button
        onClick={decrease}
        className='flex h-7 w-7 items-center justify-center rounded-sm border border-gray-400 bg-white shadow-sm hover:bg-white/70 sm:h-7 sm:w-7'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        onChange={handleChange}
        className=''
        classError='hidden'
        classInput='sm:h-7 sm:w-12 h-7 w-10 p-1  border-t border-b border-gray-400 text-center outline-none'
        value={value || localValue}
        onBlur={handleBlur}
        {...rest}
      />
      <button
        onClick={increase}
        className='shadow-xm flex h-7 w-7 items-center justify-center rounded-sm border border-gray-400 bg-white hover:bg-white/70 sm:h-7 sm:w-7'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
