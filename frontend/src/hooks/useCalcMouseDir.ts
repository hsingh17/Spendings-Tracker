import { useEffect, useState } from "react";

export enum XMouseDir {
  LEFT,
  RIGHT,
}
export enum YMouseDir {
  UP,
  DOWN,
}

type MouseDir = {
  xDir: XMouseDir;
  yDir: YMouseDir;
};

const MINIMUM_REQ_MVMT_MAGNITUDE = 2;

export default function useCalcMouseDir(): MouseDir {
  const [mouseDir, setMouseDir] = useState<MouseDir>({
    xDir: XMouseDir.RIGHT,
    yDir: YMouseDir.UP,
  });

  const calculateMouseMoveDir = (e: MouseEvent) => {
    let newXDir = e.movementX < 0 ? XMouseDir.LEFT : XMouseDir.RIGHT;
    let newYDir = e.movementY < 0 ? YMouseDir.UP : YMouseDir.DOWN;

    // Don't update direction if the magnitude of the movement is too small
    if (Math.abs(e.movementX) < MINIMUM_REQ_MVMT_MAGNITUDE) {
      newXDir = mouseDir.xDir;
    }

    if (Math.abs(e.movementY) < MINIMUM_REQ_MVMT_MAGNITUDE) {
      newYDir = mouseDir.yDir;
    }

    setMouseDir({
      xDir: newXDir,
      yDir: newYDir,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e: MouseEvent) =>
      calculateMouseMoveDir(e),
    );
    return window.removeEventListener("mousemove", calculateMouseMoveDir);
  });

  return mouseDir;
}
