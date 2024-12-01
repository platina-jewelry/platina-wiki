import { Router } from 'express'

import { themeRoute } from '../services/theme/theme'

export const apiRoute = Router()

apiRoute
  .use('/theme', themeRoute)
