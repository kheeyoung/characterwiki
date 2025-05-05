import React from 'react';
import { Editor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';

interface IconProps {
  editor: Editor;
}

function IconButton({
  onClick,
  src,
  alt,
}: {
  onClick: () => void;
  src: string;
  alt: string;
}) {
  return (
    <button onClick={onClick}>
      <img src={src} alt={alt} className="w-5 h-5" />
    </button>
  );
}

const H1 = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    src="/icons/h1.png"
    alt="H1"
  />
);

const H2 = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    src="/icons/h2.png"
    alt="H2"
  />
);

const H3 = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    src="/icons/h3.png"
    alt="H3"
  />
);

const Bold = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleBold().run()}
    src="/icons/bold.png"
    alt="Bold"
  />
);

const Italic = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleItalic().run()}
    src="/icons/italic.png"
    alt="Italic"
  />
);

const Strikethrough = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleStrike().run()}
    src="/icons/strikethrough.png"
    alt="Strikethrough"
  />
);

const Code = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleCode().run()}
    src="/icons/code.png"
    alt="Code"
  />
);

const Quote = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    src="/icons/quote.png"
    alt="Quote"
  />
);

const AddPhoto = ({ editor }: IconProps) => (
  <IconButton
    onClick={() => {
      const url = window.prompt('이미지 URL을 입력하세요');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }}
    src="/icons/addphoto.png"
    alt="Add Photo"
  />
);

export const Icon = {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Quote,
  AddPhoto,
};
