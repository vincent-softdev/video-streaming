import React from 'react';

interface FileInputProps {
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?:string
}

const FileInput: React.FC<FileInputProps> = ({ accept, onChange, className = '' }) => (
  <input type="file" accept={accept} onChange={onChange} className={`mb-4 p-2 border rounded ${className}`} />
);

export default FileInput;