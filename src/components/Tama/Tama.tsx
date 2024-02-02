import { useState } from "react";
import { SSEListener } from "../SSEListener";
import { TamaButton } from "./tamaButton";
import ReactPlayer from "react-player";
import Draggable from "react-draggable";
import "./Tama.css";

export const Tama = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setIsMuted(!isMuted);
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <Draggable>
        <div className="tama-container">
          <div className="stream-container">
            <ReactPlayer
              url="https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
              controls={false}
              playing={true}
              muted={isMuted}
              playsinline // Add this if you want to play inline on iOS devices
            />
          </div>
          <div className="buttons-container">
            <SSEListener endpoint={`https://www.maxp.xyz/api/events`}>
              <TamaButton command="A" />
              <TamaButton command="B" />
              <TamaButton command="C" />
            </SSEListener>
          </div>
        </div>
      </Draggable>
    </div>
  );
};
