declare module "@dschoon/react-waves" {
    import React from "react";
  
    export interface ReactWavesProps {
      audioFile: string;
      className?: string;
      options?: {
        barHeight?: number;
        cursorWidth?: number;
        height?: number;
        hideScrollbar?: boolean;
        progressColor?: string;
        responsive?: boolean;
        waveColor?: string;
      };
      volume?: number;
      zoom?: number;
      playing?: boolean;
    }
  
    const ReactWaves: React.FC<ReactWavesProps>;
  
    export default ReactWaves;
  }
  