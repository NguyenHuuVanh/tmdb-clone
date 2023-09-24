import React, {useLayoutEffect, useRef, useState} from "react";

const useConvertButton = (
  bgRef,
  firstEleWidth,
  setFirstEleWidth,
  secondEleWidth,
  setSecondEleWidth,
  isSelected,
  setIsSelected,
  h3OneRef,
  h3SecondRef,
  handleChangeButton = {}
) => {
  [firstEleWidth, setFirstEleWidth] = useState(0);
  [secondEleWidth, setSecondEleWidth] = useState(0);
  [isSelected, setIsSelected] = useState(false);
  h3OneRef = useRef(0);
  h3SecondRef = useRef(0);
  bgRef = useRef();

  useLayoutEffect(() => {
    setFirstEleWidth(h3OneRef.current.offsetWidth);
    setSecondEleWidth(h3SecondRef.current.offsetWidth);
  });
  handleChangeButton = {
    tunrRight: () => {
      setIsSelected(true);
      bgRef.current.style.width = `${secondEleWidth}px`;
      bgRef.current.style.left = `${firstEleWidth}px`;
    },
    turnLeft: () => {
      setIsSelected(false);
      bgRef.current.style.width = `${firstEleWidth}px`;
      bgRef.current.style.left = "0px";
    },
  };
};

export default useConvertButton;
