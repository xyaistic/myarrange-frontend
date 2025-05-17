import React from 'react';
import LottieView from 'lottie-react-native';

export default function LoadingIndicator({color}) {
  return (
    <>
    {
        color === 'white' ? (
            <LottieView source={require('../../assets/loadingwhite.json')} autoPlay loop />
        ) : (
            <LottieView source={require('../../assets/loading.json')} autoPlay loop />
        )
    }
    </>
  );
}