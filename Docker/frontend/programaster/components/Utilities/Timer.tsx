import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp }: { expiryTimestamp: any }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div className='inline text-base font-semibold dark:text-slate-100'>
      <span>{hours ? hours : "00"}</span>:<span>{minutes ? minutes : "00"}</span>:<span>{seconds ? seconds : "00"}</span>
    </div>
  );
}