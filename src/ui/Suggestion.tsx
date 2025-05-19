import {
  getCoffeeProducts,
  getNonCoffeeProducts,
  getPastryProducts,
} from "@/lib/services/menuService";
import MenuProduct, { MenuProductProps } from "./MenuProduct";

type Props = {
  label?: string;
};

export default function Suggestions(props: Props) {
  const suggestions = [
    ...getCoffeeProducts(),
    ...getNonCoffeeProducts(),
    ...getPastryProducts(),
    ...getCoffeeProducts(),
    ...getNonCoffeeProducts(),
    ...getPastryProducts(),
    ...getCoffeeProducts(),
    ...getNonCoffeeProducts(),
    ...getPastryProducts(),
    ...getCoffeeProducts(),
    ...getNonCoffeeProducts(),
    ...getPastryProducts(),
    ...getCoffeeProducts(),
    ...getNonCoffeeProducts(),
    ...getPastryProducts(),
  ];

  return (
    <div className="overflow-scroll">
      <h1 className="mt-[5vh] ml-[5vw] text-4xl">
        {props.label ?? "Other products"}
      </h1>
      <div className="flex flex-col gap-20 overflow-scroll pt-[50px] pb-[100px] lg:flex-row">
        {suggestions.map((suggestion, index) => (
          <Suggestion
            {...suggestion}
            hoverScaleLarger
            key={`${suggestion.name}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

function Suggestion(props: MenuProductProps) {
  return <MenuProduct {...props} />;
}
