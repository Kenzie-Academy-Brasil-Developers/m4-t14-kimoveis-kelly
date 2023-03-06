import express, { Application } from 'express'
import { categoriesRoutes, loginRoute, realEstateRoutes, schedulesRoutes, usersRoutes } from './routers'

const app: Application = express()

app.use(express.json())
app.use('/users', usersRoutes)
app.use('/login', loginRoute)
app.use('/categories', categoriesRoutes)
app.use('/realEstate', realEstateRoutes)
app.use('/schedudeles', schedulesRoutes)

export default app