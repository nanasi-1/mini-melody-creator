import type { MelodyData } from "../types";

export default function Melody({ melody, updateMelody }
  : { melody: MelodyData, updateMelody: (param1: MelodyData) => void }
) {
  return (
    <ul>{
      melody.map(({key, note, duration}) => {
        return (
          <li key={key}>note: {note} duration: {duration.toString()}</li>
        )
      })
    }</ul>
  )
}
