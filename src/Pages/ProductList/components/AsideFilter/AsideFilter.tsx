import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import { path } from 'src/Constants/path'
import { CategoryType } from 'src/Types/category.type'
import { QueryConfig } from 'src/Types/products.type'
import { schema, schemaType } from 'src/utils/rules'
import { noUndefinedFinder } from 'src/utils/utils'
import StarSort from '../StarSort'

interface Props {
  categories: CategoryType[]
  queryConfig: QueryConfig
}

type FormData = noUndefinedFinder<Pick<schemaType, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_max', 'price_min'])

function AsideFilter({ categories, queryConfig }: Props) {
  const navigate = useNavigate()
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit(
    (data) => {
      console.log('submit form')
      console.log(data)
      navigate({
        pathname: path.home,
        search: createSearchParams({ ...queryConfig, price_max: data.price_max, price_min: data.price_min }).toString()
      })
    }
    // (err) => {
    //   // console.log('err', err)
    // }
  )

  const removeFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['category', 'price_max', 'price_min', 'rating_filter'])).toString()
    })
  }

  return (
    // container
    <div className='px-2 py-3'>
      <Link to={path.home} className='flex flex-row items-center font-bold'>
        {/* bar Icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-2 h-6 w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        <span className=''>Tất cả danh mục</span>
      </Link>
      {/* fake border */}
      <div className='my-4 h-[1px] w-full bg-gray-400'></div>
      <ul className='text-sm'>
        {categories.map((item) => {
          const isActive = category === item._id
          return (
            <li key={item._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, category: item._id, page: '1' }).toString()
                }}
                className={classNames('mb-1 flex flex-row items-center text-sm', {
                  'font-bold text-primary': isActive,
                  'font-normal text-black': !isActive
                })}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      {/* Search Filter toolbox */}
      <Link to={'/'} className='mt-4 flex flex-row items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-[4px] h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        <span className='text-sm font-bold'>Bộ lọc tìm kiếm</span>
      </Link>
      {/* fake border */}
      <div className='my-4 h-[1px] w-full bg-gray-400'></div>
      {/* Price value filter */}
      <form onSubmit={onSubmit}>
        <div className='my-5'>Khoảng giá</div>
        <div className='flex flex-row items-center justify-center'>
          {/* cách handle khi input k nhận vào register bằng controller - react-hook-form*/}
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => (
              <InputNumber
                classInput='text-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-6 p-1 outline-none'
                className='grow'
                placeholder='Từ'
                type='text'
                classError='hidden'
                // khi price_min on change thì sẽ trigger đến price_max để nó check lại dk theo schema
                onChange={(e) => {
                  field.onChange(e)
                  trigger('price_max')
                }}
                value={field.value}
                ref={field.ref}
              />
            )}
          />
          <div className='mx-2 flex-shrink-0'>-</div>

          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  classInput='text-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-6 p-1 outline-none'
                  className='grow'
                  placeholder='Đến'
                  type='text'
                  classError='hidden'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_min')
                  }}
                />
              )
            }}
          />
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.price_min?.message}</div>
        <Button className='mt-2 flex w-full items-center justify-center rounded-sm bg-primary p-2 text-white hover:opacity-90'>
          Áp dụng
        </Button>
      </form>
      {/* fake border */}
      <div className='my-4 h-[1px] w-full bg-gray-400'></div>
      {/* Danh gia */}
      <div className='text-sm'>Đánh giá</div>
      <StarSort queryConfig={queryConfig} />
      {/* fake border */}
      <div className='my-4 h-[1px] w-full bg-gray-400'></div>
      <Button
        onClick={removeFilter}
        className='mt-4 flex w-full items-center justify-center rounded-sm bg-primary p-2 capitalize text-white hover:opacity-90'
      >
        Xoá tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
