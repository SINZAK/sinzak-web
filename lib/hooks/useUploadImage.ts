import { useState } from "react";

export const useSubmitImage = () => {
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
