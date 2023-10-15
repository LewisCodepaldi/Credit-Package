import { useEffect } from 'react';
import { FileWithPath } from 'react-dropzone';

export const usePreview = (
  file: FileWithPath | null,
  setPreview: (preview: string | null) => void
) => {
  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file, setPreview]);
};
