import { useRef } from "react"

const noteLetters = [
  "C", "D", "E", "F", "G", "A", "B"
] as const satisfies string[]

const durations = [
  2, 4, 8, 16, 32, 64, 128, 256
]

export type OnChangeFunc = ({ note, duration }: { note: string, duration: string }) => void

export default function SelectSoundForm({ buttonText, onChange }: {
  onChange: OnChangeFunc
  buttonText: string
}) {
  const noteLetterRef = useRef<HTMLSelectElement | null>(null)
  const noteOctaveRef = useRef<HTMLInputElement | null>(null)
  const durationRef = useRef<HTMLSelectElement | null>(null)

  const handleChange = () => {
    const sound = {
      note: `${noteLetterRef.current?.value ?? 'C'}${noteOctaveRef.current?.value ?? 4}`,
      duration: `${durationRef.current?.value}n` ?? '4n'
    }
    onChange(sound)
  }

  return (<>
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
      <select id="create-sound-duration" defaultValue={4} ref={durationRef}>
        {durations.map(letter => {
          return <option key={letter} value={letter}>{letter}</option>
        })}
      </select>
    </div>
    <button onClick={handleChange}>{buttonText}</button>
  </>)
}