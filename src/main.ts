import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import { load } from '@tensorflow-models/coco-ssd'
import '@picocss/pico/css/pico.css'

// カメラを取得
const config: MediaStreamConstraints = {
  video: {
    facingMode: 'environment',  // 外カメ限定
    width: 1920,
    height: 1080
  }
}
const stream = await navigator.mediaDevices.getUserMedia(config)

// カメラ映像を流す要素
const video = document.createElement('video')
video.srcObject = stream
await video.play()

// キャンバスを取得
const canvas = document.querySelector('canvas')!
canvas.width = video.videoWidth
canvas.height = video.videoHeight
const ctx = canvas.getContext('2d')!

// 全画面表示
canvas.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  }
  else {
    document.exitFullscreen()
  }
})

// モデルを読み込み
const model = await load()

// キャンバスを更新
const _canvasUpdate = async () => {
  // キャンバスにカメラ映像を描画
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  // 物体検知
  const predictions = await model.detect(video)

  // 物体を強調表示
  predictions.forEach(prediction => {
    if (prediction.class === 'person') {
      ctx.strokeStyle = 'cyan'
      ctx.strokeRect(...prediction.bbox)
  
      // 左下に適当な体温を表示
      const fake_kt = 35.7 + Math.random()
      ctx.fillStyle = 'pink'
      ctx.font = 'bold 40px sans-serif'
      ctx.fillText(
        `${fake_kt.toPrecision(3)}℃`,
        prediction.bbox[0],
        prediction.bbox[1] + prediction.bbox[3]
      )
    }
  })

  requestAnimationFrame(_canvasUpdate)
}
_canvasUpdate()
