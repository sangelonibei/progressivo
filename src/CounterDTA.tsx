import { useEffect, useRef, useState } from "react";
import { supabase, type CounterRow } from "./supabase";

const COUNTER_ID = 2;

export const CounterDTA: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progressivo, setProgressivo] = useState("");
  const [showDialog, setShowDialog] = useState(false); // trigger per aprire il popup
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Mostra il dialog appena dopo il rendering
  useEffect(() => {
    if (showDialog && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [showDialog]);

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

    const { error } = await supabase
      .from("counter")
      .update({ value: newValue })
      .eq("id", COUNTER_ID);

    if (error) {
      console.error("Update error:", error);
    } else {
      console.log("Counter incrementato:", newValue);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const value = await fetchCounter();
    if (value) {
      setProgressivo(value);
      setShowDialog(true); // trigger per aprire
    }
    setLoading(false);
  };

  const handleClose = async () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setShowDialog(false);
    await incrementCounter(progressivo);
  };

  return (
    <>
      <h1>Digital Training Academy</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Caricamento..." : "Mostra progressivo"}
      </button>

      {/* Il dialog è sempre nel DOM, ma viene mostrato via showModal */}
      <dialog ref={dialogRef}>
        <h3>{progressivo}</h3>
        <button onClick={handleClose}>Chiudi</button>
      </dialog>
    </>
  );
};
