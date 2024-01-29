import { SSEListener } from "../SSEListener";
import TamaButton from "./tamaButton";

export const Tama = () => {
  return (
    <div>
      <SSEListener endpoint="http://localhost:4321/api/events">
        <TamaButton command="A" />
        <TamaButton command="B" />
        <TamaButton command="C" />
      </SSEListener>
    </div>
  );
};
