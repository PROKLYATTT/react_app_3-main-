import express from 'express' ;

import cors from 'cors'

import testRouter from './routers/testRouter/testRouter.js'
import postRouter from './routers/postRouter/postRouter.js'
import authRouter from './routers/authRouter/authRouter.js'
import userRouter from './routers/userRouter/userRouter.js'

const app = express()


const PORT = 3555
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())



app.use('/test/',  testRouter)
app.use('/posts/',  postRouter)
app.use('/auth/',  authRouter)
app.use('/user/',  userRouter)


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})