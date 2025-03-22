import { Circle, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Component, createRef } from 'react';
import pauseIcn from '../assets/svg/pause.svg';
import playIcn from '../assets/svg/play.svg';
import ReactWaves from '@dschoon/react-waves';

interface CustomAudioPlayerProps {
  src: string;
}

interface CustomAudioPlayerState {
  isPlaying: boolean;
  playbackRate: number;
  currentTime: number;
  duration: number;
}

class CustomAudioPlayer extends Component<CustomAudioPlayerProps, CustomAudioPlayerState> {
  private audioRef = createRef<HTMLAudioElement>();

  constructor(props: CustomAudioPlayerProps) {
    super(props);
    this.state = {
      isPlaying: false,
      playbackRate: 1,
      currentTime: 0,
      duration: 0,
    };
  }

  componentDidMount() {
    const audio = this.audioRef.current;
    if (audio) {
      audio.playbackRate = this.state.playbackRate;

      audio.onloadedmetadata = () => {
        this.setState({ duration: audio.duration });
      };

      audio.ontimeupdate = () => {
        this.setState({ currentTime: audio.currentTime });
      };

      audio.onended = () => {
        this.setState({ isPlaying: false });
      };
    }
  }

  togglePlayPause = () => {
    const audio = this.audioRef.current;
    if (audio) {
      if (this.state.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }));
    }
  };


  render() {
    const { src } = this.props;
    const { isPlaying} = this.state;

    return (
      <VStack align={'left'} bg='white' color={'gray.200'} px='34px' rounded={8} py='12px'>

        <HStack w='100%' justifyContent={'space-between'}>
          <Text fontSize={'1rem'} color={'gray.200'} fontWeight={600}>Voice Message</Text>
        </HStack>
        
        <HStack>
          <Circle onClick={this.togglePlayPause} p='8px' border={'0.5px solid black'}>
            <Image fontSize={'20px'} src={!isPlaying ? playIcn : pauseIcn} alt='pause/play' />
          </Circle>

          {/* Audio Element */}
          <audio ref={this.audioRef} src={src} />

          {/* React Waves */}
          <ReactWaves
            audioFile={src}
            className={"react-waves"}
            options={{
              barHeight: 2,
              cursorWidth: 0,
              height: 50,
              hideScrollbar: true,
              progressColor: "#1DA1F2",
              responsive: true,
              waveColor: "#D1D6DA",
            }}
            volume={1}
            zoom={2}
            playing={isPlaying} // Syncing with state
          />
        </HStack>
      </VStack>
    );
  }
}

export default CustomAudioPlayer;
