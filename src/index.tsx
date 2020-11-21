import * as React from "react";

const { useState, useEffect } = React;

export interface CounterProps extends Partial<HTMLDivElement> {}

const Counter: React.FC<CounterProps> = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 99) return setCount(0);

      setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, setCount]);

  return (
    <div>
      <p>{count}</p>
    </div>
  );
};

export default Counter;
