import { useState, useEffect } from 'react';

import { Box, LinearProgress, Slide } from '@mui/material';

const MIN = 15;
const MAX = 85;
const MIN_SHOW_TIME_MS = 5000;
const STEP = 1;

export const ProgressBar = ({ isLoading }: { isLoading: boolean }) => {
  const [show, setShow] = useState(isLoading);
  const [percent, setPercent] = useState(MIN);
  const realPercent = isLoading ? 0 : 100;
  const showPercent = realPercent || percent;

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    setShow(true);
    setPercent(MIN);

    const incrementPercent = () => {
      setPercent(currenPercent => {
        if (currenPercent === MAX) {
          clearInterval(interval);
          interval = setInterval(
            incrementPercent,
            500
          );
        } else if (currenPercent === 98) {
          clearInterval(interval);
        }

        return currenPercent + STEP;
      });
    };

    let interval = setInterval(
      incrementPercent,
      (MIN_SHOW_TIME_MS / (MAX - MIN)) * STEP
    );

    return () => {
      clearInterval(interval);
      setPercent(0);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const reset = () => {
      setShow(false);
    };

    const timeout = setTimeout(reset, 1200);

    return () => {
      clearTimeout(timeout);
      reset();
    };
  }, [isLoading]);

  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2000, // Выше AppBar и модалок
          transition: 'transform .3s ease-out'
        }}
      >
        <LinearProgress variant="determinate" value={showPercent} color="primary" />
        {/* {showPercent} */}
      </Box>
    </Slide>
  );
};