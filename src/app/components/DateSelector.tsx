"use client";

import { useEffect, useState } from "react";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import axios from "axios";

interface DateSelectorProps {
  onSelect: (date: number) => void;
}

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const DateSelector = ({ onSelect }: DateSelectorProps) => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const showDateString = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Taipei",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(timestamp);
  };

  const nextDay = (timestamp: number) => {
    const updatedTime = timestamp + oneDayInMilliseconds;
    setCurrentTime(updatedTime);
    onSelect(updatedTime);
  };
  const prevDay = (timestamp: number) => {
    const updatedTime = timestamp - oneDayInMilliseconds;
    setCurrentTime(timestamp - oneDayInMilliseconds);
    onSelect(updatedTime);
  };
  return (
    <div className="flex items-center space-x-4">
      <LeftCircleOutlined
        className="text-3xl text-indigo-400 cursor-pointer hover:text-indigo-600"
        onClick={() => prevDay(currentTime)}
      />
      <div className="text-center text-xl">{showDateString(currentTime)}</div>
      <RightCircleOutlined
        className="text-3xl text-indigo-400 cursor-pointer hover:text-indigo-600"
        onClick={() => nextDay(currentTime)}
      />
    </div>
  );
};

export default DateSelector;
