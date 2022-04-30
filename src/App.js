import { useState } from "react";
// import { getDataGrouper } from "./dataGrouper";
import { elements } from "./elements";
// const dataGrouper = getDataGrouper([
//   {
//     key: "cat",
//     getKey: (el) => el.category,
//     mapper: ({ key, records, groups }) => {
//       return {
//         category: key,
//         records,
//         groups,
//       };
//     },
//   },
// ]);

export function App() {
  const [query, setQuery] = useState("");

  const filteredElements = elements.filter((el) => {
    return (
      el.length.toString().indexOf(query) === 0 ||
      el.width.toString().indexOf(query) === 0
    );
  });

  // console.log(filteredElements);
  // console.log(dataGrouper(filteredElements));

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
