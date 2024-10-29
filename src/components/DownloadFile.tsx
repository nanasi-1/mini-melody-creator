import * as Tone from 'tone'

export default function DownloadFile({ recorder, play }: {
  recorder: Tone.Recorder,
  play: () => Promise<number>
}) {
  const download = async () => {
    console.log('callback')

    recorder.start()
    const time = await play()

    setTimeout(async () => {
      const data = await recorder.stop()
      console.log(URL.createObjectURL(data))
    }, time * 1000)
  }

  return (
    <button onClick={download}>ファイルをダウンロード</button>
  )
}
