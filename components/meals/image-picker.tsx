'use client';

import { ChangeEvent, useRef, useState } from 'react';
import style from './image-picker.module.css';
import Image from 'next/image';

interface ImagePickerProps {
  label: string;
  name: string;
}

function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  function handlePickClick() {
    inputRef.current?.click()
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string)
    }

    fileReader.readAsDataURL(file);
  }

  return <div className={style.picker}>
    <label htmlFor={name}>{label}</label>
    <div>
      <div className={style.preview}>
        {!pickedImage && <p>No image picked yet</p>}
        {pickedImage && (
          <Image src={pickedImage} alt="The image selected by the user" fill/>
        )}
      </div>
      <input
        className={style.input}
        type='file'
        id={name}
        accept='image/png, image/jpeg'
        name={name}
        ref={inputRef}
        hidden
        onChange={handleImageChange}
        // For can't be submitted without the loaded image.
        required
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