import { NEWS } from '../../../data/news'
import { getNewsById } from '../../utils/news'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid news id' })
  }

  const item = getNewsById(NEWS, id)

  if (!item) {
    throw createError({ statusCode: 404, message: 'News not found' })
  }

  return item
})
