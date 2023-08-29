import React from "react"
import Lottie from "react-lottie"

import animationData from "../json/109783-document.json"

function EmptyResume() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <Lottie
      options={defaultOptions}
      height={200}
      width={200}
      isClickToPauseDisabled={true}
      style={{
        cursor: "pointer",
      }}
    />
  )
}

export default EmptyResume
