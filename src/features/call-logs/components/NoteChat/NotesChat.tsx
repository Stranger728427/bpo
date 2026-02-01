import { useState } from "react"
import styles from './NotesChat.module.scss'
import { PiPaperPlaneRightLight } from "react-icons/pi"

export type Note = {
  id?: number
  speaker?: 'ai' | 'user' | string
  timestamp?: string
  message?: string
}

type NotesChatProps = {
  notes?: Note[]
  onAddNote: (note: Note) => void
  currentUser?: string
}

export const NotesChat: React.FC<NotesChatProps> = ({
  notes,
  onAddNote,
  currentUser,
}) => {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim()) return

    const newNote: Note = {
      id: Date.now(),
      speaker: currentUser,
      timestamp: new Date().toLocaleString(),
      message: value,
    }

    onAddNote(newNote)
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
   <div className={styles.userNotes}>
  <h4 className={styles.sectionTitle}>Notes:</h4>

  <div className={styles.notesList}>
    {notes?.map(note => (
      <div key={note.id} className={styles.noteCard}>
        <div className={styles.noteHeader}>
          <span className={styles.noteUser}>{note.speaker}</span>
          <span className={styles.noteTime}>{note.timestamp}</span>
        </div>

        <div className={styles.noteMessage}>
          {note.message}
        </div>
      </div>
    ))}
  </div>

  <div className={styles.notesInputContainer}>
    <input
      value={value}
      placeholder="Enter Your Notes"
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <button onClick={handleSend} aria-label="Send note">
      <PiPaperPlaneRightLight className={styles.enterIcon} />
    </button>
  </div>
</div>

  )
}
