'use client';

import { useRef } from 'react';
import style from './image-picker.module.css';

interface ImagePickerProps {
  label: string;
  name: string;
}

function ImagePicker({ label, name }: ImagePickerProps) {
  const inputRef = useRef(null);

  function handlePickClick() {
    inputRef.current.click()
  }

  return <div className={style.picker}>
    <label htmlFor={name}>{label}</label>
    <div>
      <input
        className={style.input}
        type='file'
        id={name}
        accept='image/png, image/jpeg'
        name={name}
        ref={inputRef}
      />
      {/* IMPORTANT: type must be a button because this button should not submit */}
      <button
        className={style.button}
        type='button'
        onClick={handlePickClick}
      >
        PICK AN IMAGE
      </button>
    </div>
  </div>;
}

export default ImagePicker;