import { forwardRef } from 'react'

type Props = {
  label: string
}

const Input = forwardRef<HTMLInputElement, Props>((label, ref) => {
  return <input type='text' ref={ref} {...props} />
})

export default Input
Component definition is missing display name