import { useRef } from "react"
import * as Tone from 'tone'

export default function UpdateBpm () {
  const bpmRef = useRef<null | HTMLInputElement>(null)

  const update = () => {
    const bpm = bpmRef.current?.value
    if(!bpm) return
    Tone.getTransport().bpm.value = parseInt(bpm)
  }

  return (
    <div>
      <label htmlFor="update-bpm">BPM: </label>
      <input name="update-bpm" type="number" defaultValue={120} min={1} max={1000} ref={bpmRef}/>
      <button onClick={update}>更新</button>
    </div>
  )
}
