import { useState } from "react";
import { Sound } from "../types";
import SelectSoundForm, { OnChangeFunc } from "./SelectSoundForm";

export default function CreateSound({ pushSound }: {
  pushSound: (sound: Sound) => void
}) {
  const [count, setCount] = useState(0)

  const create: OnChangeFunc = ({ note, duration }) => {
    const sound = { key: count, note, duration }
    pushSound(sound)
    setCount(count + 1)
  }

  return (
    <div>
      <h3>Add Sound</h3>
      <SelectSoundForm onChange={create} buttonText="create" />
    </div>
  )
}