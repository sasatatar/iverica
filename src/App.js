import { useState } from "react";
import { elements } from "./elements";

export function App() {
  const [query, setQuery] = useState("");

  const filteredElements = elements.filter((el) => {
    return (
      el.length.toString().indexOf(query) === 0 ||
      el.width.toString().indexOf(query) === 0
    );
  });

  return (
    <div className="p-4 h-full">
      <h1 className="text-lg font-medium">Dimenzije (mm):</h1>
      <input
        type="number"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
      <div className="h-full overflow-auto">
        <ul>
          {filteredElements.map((el) => {
            const id = `${el.length}x${el.width}`;
            return (
              <li key={id}>
                <div className="flex gap-2">
                  <div className="w-28">
                    {el.length} x {el.width}
                  </div>
                  <div> {el.count} komada </div>
                </div>
                <div className="text-sm text-slate-400">
                  {el.category}: {el.description}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
