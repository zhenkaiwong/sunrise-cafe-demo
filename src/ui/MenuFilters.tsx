"use client";

import { FilterStatus, getFilterStatuses } from "@/lib/helpers";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function MenuFilters() {
  const searchParams = useSearchParams();
  const filters = searchParams.getAll("filter");
  const filterStatuses = getFilterStatuses(filters);

  return (
    <>
      <div className="lg:hidden">
        <Filter filterStatus={filterStatuses} canExpand={true} />
      </div>
      <div className="hidden lg:block">
        <Filter filterStatus={filterStatuses} />
      </div>
    </>
  );
}

type FilterProps = {
  canExpand?: boolean;
  filterStatus: FilterStatus;
};

function Filter(props: FilterProps) {
  const [isFilterActive, setFilterActive] = useState<boolean>(!props.canExpand);
  const { filterStatus } = props;

  const onFilterTextClick = () => {
    if (!props.canExpand) {
      console.log("Cannot expand");
      return;
    }
    console.log("Can expand. ", isFilterActive);
    setFilterActive(!isFilterActive);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-10 rounded-2xl bg-[#FFF8F0] px-10 py-5 shadow-2xl lg:min-w-[200px] lg:gap-3">
        <p
          className="font-bold hover:cursor-pointer"
          onClick={onFilterTextClick}
        >
          Filters
        </p>
        <div className={`flex-col gap-5 ${isFilterActive ? "flex" : "hidden"}`}>
          <FilterCheckBox
            name="coffee"
            label="Coffee"
            isSelected={filterStatus.coffee}
          />
          <FilterCheckBox
            name="nonCoffee"
            label="Non-Coffee"
            isSelected={filterStatus.nonCoffee}
          />
          <FilterCheckBox
            name="pastries"
            label="Pastries"
            isSelected={filterStatus.pastries}
          />
          <Link className="underline" href={"/menu"}>
            Show all
          </Link>
        </div>
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
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    const checked = event.currentTarget.checked;
    const filters = searchParams.getAll("filter");

    const newFiltersQueryStringArray = checked
      ? [...filters, props.name]
      : filters.filter((filter) => filter !== props.name);

    const newSearchParams = new URLSearchParams();
    newFiltersQueryStringArray.forEach((query) =>
      newSearchParams.append("filter", query),
    );

    router.push(`/menu?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex gap-2">
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
