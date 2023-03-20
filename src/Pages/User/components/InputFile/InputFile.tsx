import React, { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import { config } from 'src/Constants/config'

interface Props {
  onChange?: (file: File) => void
}

export default function InputFile({ onChange }: Props) {
  const InputUploadRef = useRef<HTMLInputElement>(null)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files là 1 file list và ảnh của chúng ta thì chỉ lấy có 1
    const fileLocal = e.target.files?.[0]
    if (fileLocal && fileLocal.size < config.maxSizeImage && fileLocal.type.includes('image')) {
      onChange && onChange(fileLocal)
    } else {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`)
    }
  }

  const handleUploadImage = () => {
    InputUploadRef.current?.click()
  }

  return (
    <Fragment>
      <div>
        <input
          ref={InputUploadRef}
          type='file'
          accept='.jpg,.jpeg,.png'
          className='hidden'
          onChange={onFileChange}
          onClick={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(e.target as any).value = null
          }}
        />
      </div>
      <button
        type='button'
        onClick={handleUploadImage}
        className='mt-3 rounded-sm border border-gray-400 p-1 capitalize hover:bg-gray-100 sm:px-4 sm:py-2'
      >
        chọn ảnh
      </button>
    </Fragment>
  )
}
