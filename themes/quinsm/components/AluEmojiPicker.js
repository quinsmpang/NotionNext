import { useCallback, useRef } from 'react'
import { ALU_EMOJI_LIST, ALU_BASE } from '../lib/aluEmoji'

/**
 * 阿鲁表情选择器
 * 点击表情将对应快捷码（如 :smile:）插入到目标 textarea 的光标位置
 */
export default function AluEmojiPicker({ textareaId }) {
  const pickerRef = useRef(null)

  const insertShortcut = useCallback(
    shortcut => {
      const myField = document.getElementById(textareaId)
      if (!myField || myField.type !== 'textarea') return

      const tag = ` ${shortcut} `
      myField.focus()

      if (myField.selectionStart || myField.selectionStart === 0) {
        const startPos = myField.selectionStart
        const endPos = myField.selectionEnd
        const cursorPos = endPos + tag.length
        myField.value =
          myField.value.substring(0, startPos) +
          tag +
          myField.value.substring(endPos, myField.value.length)
        myField.selectionStart = cursorPos
        myField.selectionEnd = cursorPos
      } else {
        myField.value += tag
      }
      myField.focus()
    },
    [textareaId]
  )

  return (
    <div className='comment-form-smilies' ref={pickerRef}>
      {ALU_EMOJI_LIST.map(item => (
        <button
          key={item.shortcut}
          type='button'
          className='add-smily'
          title={item.shortcut}
          onClick={() => insertShortcut(item.shortcut)}
          aria-label={item.shortcut}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='wp-smiley'
            src={`${ALU_BASE}/${item.img}`}
            alt={item.shortcut}
            loading='lazy'
          />
        </button>
      ))}
    </div>
  )
}
