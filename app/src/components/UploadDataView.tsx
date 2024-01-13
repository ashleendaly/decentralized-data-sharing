import { useState } from "react";
import { useCommitText } from "../hooks/useCommitText";
import { useHelia } from "../hooks/useHelia";

const UploadDataView = () => {
  const [text, setText] = useState("");
  const { error, starting } = useHelia();
  const { cidString, commitText, fetchCommittedText, committedText } =
    useCommitText();

  return (
    <div className="grid place-items-center h-screen bg-slate-50 text-2xl font-medium">
      <div
        className={
          error
            ? "text-red-500"
            : starting
              ? "text-yellow-400"
              : "text-green-400"
        }
      >
        Helia Status
      </div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <button onClick={() => commitText(text)}>Add Text To Node</button>
      <div>textCid: {cidString}</div>
      {cidString && (
        <>
          <button onClick={() => fetchCommittedText()}>
            Fetch Committed Text
          </button>
          <div>Committed Text: {committedText}</div>
        </>
      )}
      {cidString && (
        <a href={`ipfs://${cidString}`} target="_blank">
          Go to ipfs gateway
        </a>
      )}
    </div>
  );
};

export default UploadDataView;
