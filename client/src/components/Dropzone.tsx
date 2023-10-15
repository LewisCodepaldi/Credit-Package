import React, { useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import './Dropzone.scss';

interface DropzoneProps {
  onDrop: (acceptedFiles: FileWithPath[]) => void;
  label: string;
  file: FileWithPath | null;
  preview: string | null;
  isDragActive: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop, label, file, preview, isDragActive }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (file) {
      window.btracking.add({ eventName: 'fileUpload', name: label, value: file.name, u: window.location.href });    }
  }, [file, label]);

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <label>{label}</label>
      {preview ? (
        <img src={preview} alt={`${label} Preview`} className="preview" />
      ) : file ? (
        <div className="file-info">
          <i className="file-icon">📄</i>
          <span>{file.name}</span>
        </div>
      ) : isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
