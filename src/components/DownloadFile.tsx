import { useState } from 'react'
import * as Tone from 'tone'

export default function DownloadFile({ recorder, play, pause }: {
  recorder: Tone.Recorder,
  play: () => Promise<number>
  pause: () => void
}) {
  const [state, setState] = useState<'none' | 'progress' | 'done'>('none')
  const [timeoutId, setTimeoutId] = useState(0)
  const [blobUrl, setBlobUrl] = useState('')

  const download = async () => {
    setState('progress')

    recorder.start()
    const time = await play()

    const id = setTimeout(async () => {
      const data = await recorder.stop()
      setBlobUrl(URL.createObjectURL(data))
      setState('done')
    }, time * 1000)
    setTimeoutId(id)
  }

  const stop = () => {
    if(state !== 'progress') return
    pause()
    recorder.stop()
    clearTimeout(timeoutId)
    setState('none')
  }

  const revokeUrl = () => {
    URL.revokeObjectURL(blobUrl)
    setState('none')
  }

  return (<>
    { state !== 'progress' ? <button onClick={download}>ファイルをダウンロード</button> : null}
    { state === 'progress' ? 
      <>
        <span>録音中...</span>
        <button onClick={stop}>中断</button>
      </>
    : null}
    { state === 'done' ? 
      <>
        <a href={blobUrl} download>ダウンロード</a>
        <button onClick={revokeUrl}>録音を削除</button>
      </>
    : null}
  </>)
}
