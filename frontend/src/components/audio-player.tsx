import { Box, Circle, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React, { Component, createRef } from 'react';
import pauseIcn from '../assets/svg/pause.svg';
import playIcn from '../assets/svg/play.svg';

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

      // Update duration and current time on load
      audio.onloadedmetadata = () => {
        this.setState({ duration: audio.duration });
      };

      // Sync current time during playback
      audio.ontimeupdate = () => {
        this.setState({ currentTime: audio.currentTime });
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

  changePlaybackRate = (rate: number) => {
    const audio = this.audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
      this.setState({ playbackRate: rate });
    }
  };

  handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    const audio = this.audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }
  };

  render() {
    const { src } = this.props;
    const { 
        // isPlaying, playbackRate, 
        currentTime, duration } = this.state;

    return (
        <VStack align={'left'} bg='white' color={'gray.200'} px='34px' rounded={8} py='12px' >
          
        <audio ref={this.audioRef} src={src} style={{ display: 'none' }} />
        <HStack w='100%' justifyContent={'space-between'} >
            <Text  fontSize={'1rem'} color={'gray.200'} fontWeight={600} >Voice Message</Text>
            <HStack>
                <Box onClick={()=>this.setState({playbackRate: 0.5})} borderWidth={'0.3px'} borderColor={'gray.200'} px={'10px'} bg={this.state.playbackRate == 0.5?'gray.100':''} py='6.5px' rounded={8} >
                    <Text fontSize={'12px'} >
                        0.5x
                    </Text>
                </Box>
                <Box onClick={()=>this.setState({playbackRate: 1})}  borderWidth={'0.3px'} borderColor={'gray.200'} px={'10px'} bg={this.state.playbackRate == 1?'gray.100':''} py='6.5px' rounded={8} >
                    <Text fontSize={'12px'} >
                        1x
                    </Text>
                </Box>
                <Box onClick={()=>this.setState({playbackRate: 2})}  borderWidth={'0.3px'} borderColor={'gray.200'} px={'10px'} bg={this.state.playbackRate == 2?'gray.100':''} py='6.5px' rounded={8} >
                    <Text fontSize={'12px'} >
                        2x
                    </Text>
                </Box>
            </HStack>
        </HStack>
        <HStack>
            <Circle onClick={this.togglePlayPause} p='8px' border={'0.5px solid black'} >
                <Image fontSize={'20px'} src={!this.state.isPlaying?playIcn: pauseIcn} alt='pause/play' />
            </Circle>
            <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={this.handleTimeChange}
            style={{ width: '100%' }}
          />
        </HStack>  
        </VStack>
    );
  }
}

export default CustomAudioPlayer;
