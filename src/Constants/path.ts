export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: '/profile',
  productDetail: ':id'
} as const

export const sortBy = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const
