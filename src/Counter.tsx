import type React from "react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";

export type CounterRow = {
  id: number;
  value: string;
};

export const Counter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const COUNTER_ID = 1; // Replace with actual row ID
  const [progressivo, setProgressivo] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    const { data, error } = await supabase
      .from("counter")
      .select("value")
      .eq("id", COUNTER_ID)
      .single<CounterRow>();

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setProgressivo(data.value);
    }

    setLoading(false);
  };

  const incrementCounter = async () => {
    if (progressivo === null) return;

    const year = new Date().getFullYear();
  
    const counterValue = Number(progressivo.split("-")[1]);
    const newValue = counterValue + 1;

    const { data, error } = await supabase
      .from("counter")
      .update({ value: `DC-${newValue.toString()}-${year}`})
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
    await fetchCounter();

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={handleClick}>Mostra progressivo</button>
          <dialog ref={dialogRef}>
            <h3>{progressivo}</h3>

            <button
              onClick={ async () => {
                if (dialogRef.current) {
                  dialogRef.current.close();
                }
                 await incrementCounter();
              }}
            >
              Chiudi
            </button>
          </dialog>
        </>
      )}
    </>
  );
};
