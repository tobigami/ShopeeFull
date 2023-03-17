import range from 'lodash/range'
import React, { useEffect, useState } from 'react'

interface Props {
  errorsMessage?: string
  value?: Date
  onChange?: (value: Date) => void
}

export default function DateSelect({ value, errorsMessage, onChange }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate(),
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    const newDate = { ...date, [name]: value }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className=' flex flex-col sm:flex-row sm:items-baseline'>
      <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>ngày sinh</div>
      <div className='flex flex-col justify-between sm:w-[80%] sm:justify-between'>
        <div className='flex justify-between'>
          <select
            name='date'
            onChange={handleChange}
            className='h-8 w-[30%] rounded border border-gray-400 px-3 outline-none hover:border-primary'
            value={value?.getDate() || date.date}
          >
            <option value='ngay' disabled>
              Ngày
            </option>
            {range(1, 32).map((item) => (
              <option key={item} value={item} className='text-gray-600'>
                {item}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='month'
            className='h-8 w-[30%] rounded border border-gray-400 px-3 outline-none hover:border-primary'
            value={value?.getMonth() || date.month}
          >
            <option value='thang' className=' text-gray-600' disabled>
              Tháng
            </option>
            {range(0, 12).map((item) => (
              <option key={item} value={item} className=' text-gray-600'>
                {item + 1}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='year'
            className='h-8 w-[30%] rounded border border-gray-400 px-3 outline-none hover:border-primary'
            value={value?.getFullYear() || date.year}
          >
            <option value='nam' className=' text-gray-600' disabled>
              Năm
            </option>
            {range(1990, 2030).map((item) => (
              <option key={item} value={item} className=' text-gray-600'>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorsMessage}</div>
      </div>
    </div>
  )
}
