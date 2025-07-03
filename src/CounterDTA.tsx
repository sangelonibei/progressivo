import { useEffect, useRef, useState } from "react";
import { supabase, type CounterRow } from "./supabase";

const COUNTER_ID = 2;

export const CounterDTA: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progressivo, setProgressivo] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setLoading(false); // inizialmente non facciamo fetch, solo al click
  }, []);

  const fetchCounter = async (): Promise<string | null> => {
    const { data, error } = await supabase
      .from("counter")
      .select("value")
      .eq("id", COUNTER_ID)
      .single<CounterRow>();

    if (error || !data) {
      console.error("Fetch error:", error);
      return null;
    }

    return data.value;
  };

  const incrementCounter = async (currentValue: string) => {
    const year = new Date().getFullYear();
    const numericPart = Number(currentValue.split("-")[0]);
    const newNumeric = (numericPart + 1).toString().padStart(6, "0");
    const newValue = `${newNumeric}-DTA-${year}`;

    const { data, error } = await supabase
      .from("counter")
      .update({ value: newValue })
      .eq("id", COUNTER_ID)
      .select()
      .single<CounterRow>();

    if (error) {
      console.error("Update error:", error);
    } else {
      console.log("Counter updated:", data);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const value = await fetchCounter();
    if (value) {
      setProgressivo(value);
      if (dialogRef.current) dialogRef.current.showModal();
    }
    setLoading(false);
  };

  const handleClose = async () => {
    if (dialogRef.current) dialogRef.current.close();
    await incrementCounter(progressivo); // usa il valore mostrato
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Digital Training Academy</h1>
          <button onClick={handleClick}>Mostra progressivo</button>
          <dialog ref={dialogRef}>
            <h3>{progressivo}</h3>
            <button onClick={handleClose}>Chiudi</button>
          </dialog>
        </>
      )}
    </>
  );
};
