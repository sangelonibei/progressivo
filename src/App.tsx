import { useRef, useState } from "react";
import "./App.css";

function App() {
  const count= useRef(0);
  const [progressivo, setProgressivo] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const reset = () => {
   count.current= 0;
  };

  const increment = () => {
    count.current += 1;
  };

  const handleClick = () => {
    setProgressivo((prev) => {
      const year = new Date().getFullYear();
      const previousYear = progressivo.substring(0, 4);
      if (Number(previousYear) != Number(year)) {
        reset();
      }
      return `${year}-${count.current.toString().padStart(3, "0")}`;
    });
    increment();

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <button onClick={handleClick}>Mostra progressivo</button>
      <dialog ref={dialogRef}>
        <h1>Progressivo: {progressivo}</h1>
        
        <button
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
          }}
        >
          Close
        </button>
      </dialog>
    </>
  );
}

export default App;
