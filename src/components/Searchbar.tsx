import { useRef, type FormEvent } from "react";

interface SearchbarProps {
  search: (cityname: string) => void;
  searchMine: () => void;
}

export default function Searchbar({ search, searchMine }: SearchbarProps) {
  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <form
      action=""
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        const cityName = searchInput.current?.value.trim() || "";
        if (!cityName) return;
        search(cityName);
        searchInput.current!.value = "";
      }}
      className="flex mt-10 md:mt-0"
    >
      <input
        type="text"
        ref={searchInput}
        className="bg-stone-100/20 px-3 py-3 rounded text-stone-900 outline-none text-sm w-45 md:w-65"
        placeholder="Enter a city"
      />
      <button className="bg-[#E9ECFF] text-stone-900 px-3 py-2 rounded cursor-pointer hover:bg-[#cfd2e7] text-sm relative transition-all mr-0.5">
        Search
      </button>
      <button
        type="button"
        className="bg-[#E9ECFF] text-stone-900 px-3 py-2 rounded cursor-pointer hover:bg-[#cfd2e7] text-sm transition-all"
        onClick={searchMine}
      >
        My
      </button>
    </form>
  );
}
