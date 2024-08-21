import { useEffect, useState } from "react";
import "./App.css";

const MAX_TRY = 5;

function App() {
  const [word] = useState("SYNCRONY");
  const [board, setBoard] = useState(Array(word.length).fill(""));
  const [tries, setTries] = useState(MAX_TRY);
  const [result, setResult] = useState<boolean | null>(null);
  const [value, setValue] = useState<string>("");

  const handleTryClick = () => {
    const currentValue = value;

    // Clean input
    setValue("");

    // Check if match letter
    if (!word.includes(currentValue)) {
      setTries((previous) => --previous);
      return;
    }

    // Update board with matches
    const newBoard = [...board];
    const letters = word.split("");
    letters.forEach((letter, idx) => {
      if (letter === currentValue) {
        newBoard[idx] = currentValue;
      }
    });
    setBoard(newBoard);
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    // If it lost
    if (tries === 0) {
      setResult(false);
    }
    // If it won
    else if (board.every((item) => !!item)) {
      setResult(true);
    }
  }, [board, tries]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        alignItems: "center",
      }}
    >
      <div>{tries}</div>
      {result !== null && (
        <div
          style={{
            color: result ? "green" : "red",
          }}
        >
          {result ? "you WON!" : "you LOST..."}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {board.map((char, idx) => (
          <span
            style={{
              width: "20px",
              height: "20px",
              border: "1px black solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={idx}
          >
            {char}
          </span>
        ))}
      </div>
      {result === null ? (
        <>
          <form
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onSubmit={handleTryClick}
          >
            <input
              type="text"
              style={{
                width: "20px",
              }}
              maxLength={1}
              value={value}
              autoFocus
              disabled={result !== null}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
            />
            <button
              type="submit"
              disabled={!value || result !== null}
              onClick={handleTryClick}
            >
              Try
            </button>
          </form>
        </>
      ) : (
        <button type="button" autoFocus onClick={handleResetClick}>
          Play again
        </button>
      )}
    </div>
  );
}

export default App;
