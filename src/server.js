import cron from 'node-cron'
import express from 'express'
import axios from 'axios'
import { env } from './config/environment'
import multer from 'multer'

const app = express()

const hostname = 'localhost'

app.get('/', (req, res) => {
  // Test Absolute import mapOrder
  console.log('hello word')
  res.end('<h1>Hello World!</h1><hr>')
})

const upload = multer()

app.post('/', upload.array('files'), async (req, res) => {
  if (req.files.length > 0) {
    req.files.map(async (item) => {
      const response = await axios.put(`https://blog-english.khangluong2002.workers.dev/${item.originalname}`, item.buffer, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
    })
  }

  res.send({ message: '123' })
})

cron.schedule('*/10 * * * *', async () => {
  try {
    // Gửi request lên API
    const response = await axios.get('https://api.trisielts.online/v1/tags')

    // Xử lý dữ liệu trả về nếu cần
    console.log(response.data)
  } catch (error) {
    console.error('Error sending request:', error)
  }
})

if (env.BUILD_MODE === 'production') {
  app.listen(process.env.PORT, () => {
    console.log(`Hello World, I am running at PORT : ${process.env.PORT}`)
  })
} else {
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello World, I am running at http://${env.APP_HOST}:${env.APP_PORT}`)
  })
}
