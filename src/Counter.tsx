import type React from "react";
import { useRef, useState } from "react";
import { useCounter } from "./CounterContext";

export const Counter: React.FC = () => {
  const {count, increment, reset}= useCounter();
  const [progressivo, setProgressivo] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    setProgressivo((prev) => {
      const year = new Date().getFullYear();
      const previousYear = prev.substring(0, 4);
      if (Number(previousYear) != Number(year)) {
        reset();
      }
      return `${year}-${count.toString().padStart(4, "0")}`;
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
};
