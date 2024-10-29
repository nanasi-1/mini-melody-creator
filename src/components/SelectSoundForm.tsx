import { useRef } from "react"
import { Sound } from "../types"

const noteLetters = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
] as const satisfies string[]

const durations = [
  2, 4, 8, 16, 32, 64, 128, 256
]

export type OnChangeFunc = ({ note, duration }: { note: string, duration: string }) => void

export default function SelectSoundForm({ buttonText, onChange, defaultSound }: {
  onChange: OnChangeFunc
  buttonText: string,
  defaultSound: Pick<Sound, "duration"> & { noteLetter: string, noteOctave: number | string }
}) {
  const noteLetterRef = useRef<HTMLSelectElement | null>(null)
  const noteOctaveRef = useRef<HTMLInputElement | null>(null)
  const durationRef = useRef<HTMLSelectElement | null>(null)

  const handleChange = () => {
    const sound = {
      note: `${noteLetterRef.current?.value ?? 'C'}${noteOctaveRef.current?.value ?? 4}`,
      duration: `${durationRef.current?.value ?? 4}n`
    }
    onChange(sound)
  }

  // TODO メロディーの編集用でidがかぶる問題を修正
  return (<>
    <div>
      <label htmlFor="create-sound-note-letter">音程: </label>
      <select id="create-sound-note-letter" ref={noteLetterRef} defaultValue={defaultSound.noteLetter}>
        {noteLetters.map(letter => {
          return <option key={letter} value={letter}>{letter}</option>
        })}
      </select>
      <input type="number" name="create-sound-note-octave" defaultValue={defaultSound.noteOctave} max={11} min={-4} ref={noteOctaveRef} />
    </div>
    <div>
      <label htmlFor="create-sound-duration">長さ: </label>
      <select id="create-sound-duration" defaultValue={defaultSound.duration.toString()} ref={durationRef}>
        {durations.map(letter => {
          return <option key={letter} value={letter}>{letter}</option>
        })}
      </select>
    </div>
    <button className="sound-change-btn" onClick={handleChange}>{buttonText}</button>
  </>)
}