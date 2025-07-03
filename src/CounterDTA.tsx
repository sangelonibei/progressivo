
import { useEffect, useRef, useState } from "react";
import { supabase, type CounterRow } from "./supabase";



export const CounterDTA: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const COUNTER_ID = 2; // Replace with actual row ID
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
    await incrementCounter(data.value); // usa direttamente il valore ottenuto
  }

  setLoading(false);
};

const incrementCounter = async (currentValue: string) => {
  const year = new Date().getFullYear();

  const counterValue = Number(currentValue.split("-")[0]);
  const newValue = counterValue + 1;

  const { data, error } = await supabase
    .from("counter")
    .update({ value: `${newValue.toString().padStart(6, '0')}-DTA-${year}` })
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
        <h1>Digital Training Academy</h1>
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

