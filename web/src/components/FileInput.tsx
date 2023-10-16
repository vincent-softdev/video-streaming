import React from 'react';

interface FileInputProps {
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ accept, onChange }) => (
  <input type="file" accept={accept} onChange={onChange} className="mb-4 p-2 border rounded" />
);

export default FileInput;