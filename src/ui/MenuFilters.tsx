"use client";

import { getFilterStatuses } from "@/lib/helpers";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

type MenuFiltersProps = {};

export default function MenuFilters(props: MenuFiltersProps) {
  const searchParams = useSearchParams();
  const filters = searchParams.getAll("filter");
  const filterStatuses = getFilterStatuses(filters);

  return (
    <div>
      <div className="flex flex-col gap-3 py-5 px-10 bg-[#FFF8F0] rounded-2xl shadow-2xl">
        <p className="font-bold">Filters</p>
        <FilterCheckBox
          name="coffee"
          label="Coffee"
          isSelected={filterStatuses.coffee}
        />
        <FilterCheckBox
          name="nonCoffee"
          label="Non-Coffee"
          isSelected={filterStatuses.nonCoffee}
        />
        <FilterCheckBox
          name="pastries"
          label="Pastries"
          isSelected={filterStatuses.pastries}
        />
        <Link className="underline" href={"/menu"}>
          Show all
        </Link>
      </div>
    </div>
  );
}

type FilterCheckBox = {
  name: string;
  label: string;
  isSelected: boolean;
};

function FilterCheckBox(props: FilterCheckBox) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onFilterCheckBoxClicked = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const checked = event.currentTarget.checked;
    const filters = searchParams.getAll("filter");

    const newFiltersQueryStringArray = checked
      ? [...filters, props.name]
      : filters.filter((filter) => filter !== props.name);

    const newSearchParams = new URLSearchParams();
    newFiltersQueryStringArray.forEach((query) =>
      newSearchParams.append("filter", query)
    );

    router.push(`/menu?${newSearchParams.toString()}`);
  };

  return (
    <div>
      <input
        type="checkbox"
        name={props.name}
        onChange={onFilterCheckBoxClicked}
        checked={props.isSelected}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
}
