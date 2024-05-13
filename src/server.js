/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import cron from 'node-cron'
import express from 'express'
import axios from 'axios'
import { env } from './config/environment'

const app = express()

const hostname = 'localhost'

app.get('/', (req, res) => {
  // Test Absolute import mapOrder

  res.end('<h1>Hello World!</h1><hr>')
})

cron.schedule('*/2 * * * *', async () => {
  try {
    // Gửi request lên API
    const response = await axios.get('http://localhost:4000')

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
