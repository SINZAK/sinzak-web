import { useState } from "react";

export const useSelectImage = () => {
  const [image, setImage] = useState<null | [string, File]>();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    let images: [string, File][] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      images.push([URL.createObjectURL(file), file]);
    }

    setImage(images[0]);
  };

  return {
    imageFile: image?.[1],
    imageString: image?.[0],
    selectFile,
  };
};

export const useImage = (onSelect: (image: File) => void) => {
  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    let images: [string, File][] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      images.push([URL.createObjectURL(file), file]);
    }
    if (!images?.[0]) return;
    onSelect(images?.[0][1]);
    event.target.value = "";
  };

  return {
    selectFile,
  };
};
