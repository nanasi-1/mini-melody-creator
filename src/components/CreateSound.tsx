import { useState } from "react";
import { Sound } from "../types";

export default function CreateSound({pushSound}: {
  pushSound: (sound: Sound) => void
}) {
  const [count, setCount] = useState(0)

  const create = () => {
    const sound = {
      key: count,
      note: "F#4",
      duration: "8n"
    }
    pushSound(sound)
    setCount(count + 1)
  }
  
  return (
    <button onClick={create}>create</button>
  )
}