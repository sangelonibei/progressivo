import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type CounterContextType = {
  count: number;
  increment: () => void;
  reset: () => void;
};

const counterConterx = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  return (
    <counterConterx.Provider
      value={{
        count,
        increment: () => {
          setCount((prev) => prev + 1);
        },
        reset: () => {
          setCount(0);
        },
      }}
    >
      {children}{" "}
    </counterConterx.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(counterConterx);
  if (!context) {
    throw new Error("useCounter must be used within a CounterContextProvider");
  }
  return context;
};
