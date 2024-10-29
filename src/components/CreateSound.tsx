import { useRef, useState } from "react";
import { Sound } from "../types";

const noteLetters = [
  "C", "D", "E", "F", "G", "A", "B"
] as const satisfies string[]

const durations = [
  2, 4, 8, 16, 32, 64, 128, 256
]

// SoundSelectorでもいいかもしれない
export default function CreateSound({ pushSound }: {
  pushSound: (sound: Sound) => void
}) {
  const [count, setCount] = useState(0)
  const noteLetterRef = useRef<HTMLSelectElement | null>(null)
  const noteOctaveRef = useRef<HTMLInputElement | null>(null)
  const durationRef = useRef<HTMLSelectElement | null>(null)

  const create = () => {
    const sound = {
      key: count,
      note: `${noteLetterRef.current?.value ?? 'C'}${noteOctaveRef.current?.value ?? 4}`,
      duration: `${durationRef.current?.value}n` ?? '4n'
    }
    pushSound(sound)
    setCount(count + 1)
  }

  return (
    <div>
      <h3>Add Sound</h3>
      <div>
        <label htmlFor="create-sound-note-letter">音程: </label>
        <select id="create-sound-note-letter" ref={noteLetterRef}>
          {noteLetters.map(letter => {
            return <option key={letter} value={letter}>{letter}</option>
          })}
        </select>
        <input type="number" name="create-sound-note-octave" defaultValue={4} max={11} min={-4} ref={noteOctaveRef} />
      </div>
      <div>
        <label htmlFor="create-sound-duration">長さ: </label>
        <select id="create-sound-note-letter" defaultValue={4} ref={durationRef}>
          {durations.map(letter => {
            return <option key={letter} value={letter}>{letter}</option>
          })}
        </select>
      </div>
      <button onClick={create}>create</button>
    </div>
  )
}