import { Circle, HStack, Image, StackProps, Text } from "@chakra-ui/react";
import MicIcon from "../assets/svg/mic.svg";
import { useState, useRef } from "react";

interface Prop extends StackProps {
  setAudio: (blob: Blob) => void;
  onStop?: (blob: Blob) => void
}

const AudioRecorder = (prop: Prop) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const { setAudio, ...rest } = prop;

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudio(audioBlob); // Call the setAudio prop with the audio blob
        // audioChunks.current = []; // Clear the chunks after recording
        if(prop.onStop){
          prop.onStop(audioBlob)
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  }

  return (
    <HStack bg="primary.100" {...rest}>
      <Circle
        bg={!isRecording ? "primary.500" : "lightgreen"}
        onClick={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
        p={4}
      >
        <Image src={MicIcon} alt="mic" />
      </Circle>
      <Text
        fontWeight={400}
        fontSize={"20px"}
        color={!isRecording ? "1B2432" : "lightgreen"}
      >
        {isRecording ? "Recording" : "Click to record"}
      </Text>
    </HStack>
  );
};

export default AudioRecorder;
