'use client';

import { Camera, ImagePlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';

interface ProfilePictureUploaderProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ProfilePictureUploader({
  value,
  onChange,
  disabled = false,
  className,
}: ProfilePictureUploaderProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' ? value : null,
  );

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof value === 'string') {
      setPreview(value);
      return;
    }

    setPreview(null);
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      onChange?.(file);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      },
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE,
      disabled,
    });

  const handleRemove = () => {
    onChange?.(null);
  };

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'group relative flex size-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors',
          'border-muted-foreground/25 bg-muted/30',
          'hover:border-primary/50 hover:bg-muted/50',
          isDragActive && 'border-primary bg-primary/5',
          isDragReject && 'border-destructive bg-destructive/5',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Profile preview"
              className="size-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="size-6 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            {isDragActive ? (
              <ImagePlus className="size-7" />
            ) : (
              <Camera className="size-7" />
            )}

            <span className="text-xs font-medium">
              {isDragActive ? 'Drop image' : 'Upload'}
            </span>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        JPG, PNG or WebP · Max 5MB
      </p>

      {isDragReject && (
        <p className="text-xs text-destructive">
          Please select a valid image under 5MB.
        </p>
      )}
    </div>
  );
}
