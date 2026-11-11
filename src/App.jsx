import { useState, useEffect } from "react";
import { initialProdList } from "./fruits";

function App() {
  const [prodList, setProdList] = useState([...initialProdList]);
  const [query, setQuery] = useState("");

  const filteredList = () =>
    prodList.filter((prod) =>
      prod.name.toLowerCase().includes(query.toLowerCase()),
    );

  useEffect(() => {
    document.title = query ? "Searching for " + query : "Search Products";
  }, [query]);

  return (
    <main id="app" className="w-full flex flex-col items-center">
      <h1 className="p-5 text-4xl font-bold">Fruit Stand</h1>
      <Search query={query} setQuery={setQuery} />
      <List length={filteredList().length} query={query}>
        <ListItems list={filteredList()} query={query} setQuery={setQuery} />
      </List>
    </main>
  );
}

export default App;

function Search({ query, setQuery }) {
  return (
    <div className="w-[90%] max-w-2xl flex justify-center relative">
      <input
        value={query}
        type="text"
        placeholder="Search Fruits"
        onChange={(e) => setQuery(e.target.value)}
        className="text-center border-2 border-transparent outline-none focus:border-b-blue-500 w-full py-1 my-3 rounded-2xl bg-blue-50"
      />
      {query && (
        <button
          className=" h-fit w-auto aspect-square absolute right-[5%] top-[50%] translate-y-[-50%] rounded-full hover:bg-red-100"
          onClick={() => {
            setQuery("");
          }}
        >
          ❌
        </button>
      )}
    </div>
  );
}

function List({ children, length, query }) {
  return (
    <div className="w-[90%] min-w-0">
      <div className="text-center py-2 truncate">
        {length} results {query && ` for "${query}"`}
      </div>
      <ul className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3">
        {children}
      </ul>
    </div>
  );
}

function ListItems({ list, query, setQuery }) {
  const highlight = (name) => {
    if (!query) return name;

    const start = name.toLowerCase().indexOf(query.toLowerCase());
    if (start === -1) return name;

    const end = start + query.length;

    return (
      <>
        {name.slice(0, start)}
        <mark className="bg-blue-100 underline rounded">
          {name.slice(start, end)}
        </mark>
        {name.slice(end)}
      </>
    );
  };

  return list.map((item, idx) => (
    <li
      key={idx}
      onClick={() => setQuery(item.name)}
      className="flex flex-col items-center border-2 border-blue-50 min-w-0 h-fit py-3 hover:-translate-y-1 hover:shadow-2xl hover:cursor-pointer ease-in-out duration-200 rounded-2xl"
    >
      <img className="min-h-12.5 hover:animate-pulse" src={item.url} />
      <div className="w-[90%] truncate text-center lg:text-3xl md:text-2xl text-lg">
        {highlight(item.name)}
      </div>
    </li>
  ));
}
