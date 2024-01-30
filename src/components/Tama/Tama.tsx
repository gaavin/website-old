import { SSEListener } from "../SSEListener";
import { TamaButton } from "./tamaButton";
import "./Tama.css";
import ReactPlayer from "react-player";
import { useState } from "react";

export const Tama = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <>
      <button onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <div className="tama-container">
        <div className="stream-container">
          <ReactPlayer
            url="https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
            controls={false}
            playing={true}
            muted={isMuted}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }} // Added inline styles for absolute positioning
            playsinline // Add this if you want to play inline on iOS devices
          />
        </div>
        <div className="buttons-container">
          <SSEListener endpoint="http://localhost:4321/api/events">
            <TamaButton command="A" />
            <TamaButton command="B" />
            <TamaButton command="C" />
          </SSEListener>
        </div>
      </div>
    </>
  );
};
