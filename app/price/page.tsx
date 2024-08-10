import AppBar from "../AppComponents/AppBar";
import { PriceCardFree, PriceCardPremium } from "./PriceCard";
import "./price.css";
function PricePage() {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center items-start gap-16 pt-32 card-box ">
        <PriceCardFree />;
        <PriceCardPremium />;
      </div>
    </div>
  );
}

export default PricePage;
