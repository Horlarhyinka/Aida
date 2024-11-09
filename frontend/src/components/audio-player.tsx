import React, { Component, createRef, RefObject } from 'react';

interface AudioPlayerProps {
  src: string;
}

interface AudioPlayerState {
  playbackRate: number;
}

class AudioPlayer extends Component<AudioPlayerProps, AudioPlayerState> {
  private audioRef: RefObject<HTMLAudioElement>;

  constructor(props: AudioPlayerProps) {
    super(props);
    this.audioRef = createRef<HTMLAudioElement>();
    this.state = {
      playbackRate: 1, // default playback speed
    };
  }

  playAudio() {
    if (this.audioRef.current) {
      this.audioRef.current.play();
    }
  }

  pauseAudio() {
    if (this.audioRef.current) {
      this.audioRef.current.pause();
    }
  }

  changePlaybackSpeed(rate: number) {
    if (this.audioRef.current) {
      this.audioRef.current.playbackRate = rate;
      this.setState({ playbackRate: rate });
    }
  }

  render() {
    return (
      <audio ref={this.audioRef} src={this.props.src} />
    );
  }
}

export default AudioPlayer;
