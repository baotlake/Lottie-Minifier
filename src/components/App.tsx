import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { Editor } from "./Editor";
import type { LottieData } from "../types";
import { processLottieFile } from "../utils/fileProcessor";

export default function App() {
  const [editorVisible, setEditorVisible] = useState(false);
  const [files, setFiles] = useState<LottieData[]>([]);

  const handleFilesSelected = async (files: File[]) => {
    const filesData = await Promise.all(files.map(processLottieFile));
    setEditorVisible(true);
    setFiles(filesData);
    history.pushState({}, "", "/editor");
  };

  return (
    <div className="">
      <FileUploader onFilesSelected={handleFilesSelected} />

      {editorVisible && (
        <div className="fixed top-0 left-0 w-full h-full z-10 bg-white">
          <Editor defaultFiles={files} />
        </div>
      )}
    </div>
  );
}
