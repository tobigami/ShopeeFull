import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classWrapper?: string
}

export default function QuantityController({
  onIncrease,
  onType,
  onDecrease,
  classWrapper,
  value,
  max,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))
  console.log('localValue', localValue)
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
    <div className={`mt-12 flex items-center ${classWrapper}`}>
      <span className='text-md text-gray-400'>số lượng</span>
      <div className='ml-4 flex items-center'>
        <button
          onClick={decrease}
          className='flex h-7 w-7 items-center justify-center rounded-sm border border-gray-400 bg-white shadow-sm hover:bg-white/70'
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
          classError='hidden'
          classInput='h-7 w-14  border-t border-b border-gray-400 text-center outline-none'
          value={value || localValue}
          {...rest}
        />
        <button
          onClick={increase}
          className='shadow-xm flex h-7 w-7 items-center justify-center rounded-sm border border-gray-400 bg-white hover:bg-white/70'
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
      <span className='text-md ml-4 text-gray-400'>{max} sản phẩm có sẵn</span>
    </div>
  )
}
