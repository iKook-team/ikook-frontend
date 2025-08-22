"use client";
import React, { useEffect, useRef, useState } from 'react';

interface MessageInputProps {
  onSendMessage?: (message: string, image?: File | null) => void;
  placeholder?: string;
}

export function MessageInput({ onSendMessage, placeholder = "Type message..." }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSend = () => {
    if (!onSendMessage) return;
    const trimmed = message.trim();
    if (!trimmed && !file) return;
    onSendMessage(trimmed, file);
    setMessage('');
    setFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const onPickFile = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const clearFile = () => setFile(null);

  // Create/revoke object URL when file changes
  useEffect(() => {
    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="box-border flex absolute justify-between items-center pt-2 pr-2 pb-1.5 pl-2 rounded-md border border-solid border-neutral-500 h-[auto] min-h-[50px] left-[18px] top-[600px] w-[609px] max-md:relative max-md:top-auto max-md:mt-5 max-md:inset-x-[18px] max-md:w-[calc(100%_-_36px)] max-sm:left-3 max-sm:p-1.5 max-sm:min-h-11 max-sm:w-[calc(100%_-_24px)]">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-xs text-neutral-700 placeholder-neutral-400 max-sm:text-xs"
      />

      <div className="flex absolute right-2 gap-4 items-center top-[7px] h-auto w-auto max-sm:top-1.5 max-sm:right-1.5 max-sm:gap-3">
        <div className="flex relative gap-3 items-center max-sm:gap-2">
          {!!file && (
            <div className="flex items-center gap-2">
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-8 h-8 object-cover rounded border border-neutral-300" />
              )}
              <div className="text-[10px] text-neutral-600 bg-neutral-100 border border-neutral-300 rounded px-2 py-1 flex items-center gap-2">
                <span className="truncate max-w-[140px]" title={file.name}>{file.name}</span>
                <button type="button" onClick={clearFile} aria-label="Remove attachment" className="text-neutral-500 hover:text-neutral-700">✕</button>
              </div>
            </div>
          )}
          <button type="button" aria-label="Attach file" onClick={onPickFile}>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"attachment-icon\" style=\"width: 20px; height: 20px; position: relative\"> <path d=\"M9.5 15.5L14.5 10.5C16 9 16 6.5 14.5 5C13 3.5 10.5 3.5 9 5L3.5 10.5C1.5 12.5 1.5 15.5 3.5 17.5C5.5 19.5 8.5 19.5 10.5 17.5L16 12\" stroke=\"#262626\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
              }}
            />
          </button>
          {/* attach button only; send icon button is below */}
        </div>
        <button
          type="button"
          onClick={handleSend}
          className="flex relative gap-2.5 items-start px-1.5 py-1 bg-amber-400 rounded max-sm:px-1.5 max-sm:py-1"
          aria-label="Send message"
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg layer-name=\"send\" width=\"29\" height=\"29\" viewBox=\"0 0 29 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"send-icon\" style=\"width: 20px; height: 20px; transform: rotate(-45deg); position: relative\"> <path d=\"M11.7852 16.4963L14.1422 14.1393M11.34 16.3691L6.12564 14.8793C5.33784 14.6542 5.31377 13.5465 6.09105 13.2874L17.8643 9.36301C18.5158 9.14586 19.1356 9.76564 18.9184 10.4171L14.994 22.1904C14.7349 22.9677 13.6273 22.9436 13.4022 22.1558L11.9123 16.9414C11.8332 16.6646 11.6168 16.4482 11.34 16.3691Z\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path> </svg>",
            }}
          />
        </button>
      </div>
    </div>
  );
}
