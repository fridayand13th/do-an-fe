import { Dispatch, SetStateAction } from 'react';

export type TQuillEditorProps = {
  htmlStr: string;
  setHtmlStr: Dispatch<SetStateAction<string>>;
};
