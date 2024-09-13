"use client";

import { useEffect, useState } from "react";
import { notification, Spin, Avatar } from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import templateA from "./templateA";
import DateSelector from "./DateSelector";
// import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { DatePicker } from "antd";
import ProgressForm, { Section } from "./ProgressForm";
import DynamicForm from "./DynamicForm";

interface EditProgressProps {
  studentId: string | null;
  studentName: string | null;
}

// Deep clone function
const deepClone = (obj: unknown) => {
  return JSON.parse(JSON.stringify(obj));
};

const getDateString = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Format the date in Taiwan timezone
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(new Date(timestamp));

  // Extract month, day, and year from formattedDate ("MM/DD/YYYY")
  const [month, day, year] = formattedDate.split("/");

  // Concatenate in the format "MMDDYYYY"
  return `${month}${day}${year}`;
};
const EditProgress = ({ studentId, studentName }: EditProgressProps) => {
  const [loading, setLoading] = useState(false);
  const [logExist, setLogExist] = useState<boolean>(false); // State to store logs
  // Fetch details and logExist of a selected student
  const [formState, setFormState] = useState<Section[]>(
    deepClone(templateA as Section[])
  );

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  console.log(getDateString(currentTime));
  const fetchLogs = async (studentId: string, currentTime: number) => {
    setLoading(true);
    try {
      // Fetch logs for the selected student
      const logsResponse = await axios.get(
        `/api/students/${studentId}/logs/${getDateString(currentTime)}`
      );
      console.log("data fetched", logsResponse.data);
      setLogExist(true);
      setFormState(logsResponse.data.log);
    } catch (error) {
      const templateClone = deepClone(templateA);
      setFormState(templateClone);
      setLogExist(false);
      console.log({
        message: "Failed to fetch student details or logs",
      });
      //   notification.error({
      //     message: "Failed to fetch student details or logs",
      //   });
    } finally {
      setLoading(false);
    }
  };

  console.log("log exist", logExist);

  const saveLog = async () => {
    const params = {
      log: formState,
      logDate: getDateString(currentTime),
    };
    try {
      if (logExist) {
        // Log exists, call PUT method
        await axios.put(
          `/api/students/${studentId}/logs/${getDateString(currentTime)}`,
          params
        );
        notification.success({
          message: "Log updated successfully",
        });
      } else {
        // Log does not exist, call POST method
        setLogExist(true);
        await axios.post(`/api/students/${studentId}/logs`, params);
        // Set logExists to true after creating
        notification.success({
          message: "Log created successfully",
        });
      }
    } catch (error) {
      notification.error({
        message: "Failed to save log",
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (sectionIndex: number, contentIndex: number) => {
    const updatedFormState = [...formState];
    updatedFormState[sectionIndex].content[contentIndex].done =
      !updatedFormState[sectionIndex].content[contentIndex].done;
    setFormState(updatedFormState);
    saveLog();
  };

  useEffect(() => {
    // when it fetches studentsId for a given date.
    //if there is no data, then use the template to render the page.
    // need a state to record if this date has log or not.
    //as soon as any of the field is selected. save the log to server. then update state to have log
    // for state has log, if user makes any changes, save the log to server.
    if (studentId) {
      fetchLogs(studentId, currentTime);
    }
  }, [studentId, currentTime]);

  return (
    <div>
      <div className="full-width flex items-center justify-between  bg-white px-10 border py-3">
        <div className="flex items-center justify-center space-x-3 align-middle">
          {" "}
          <Avatar
            style={{ backgroundColor: "#ffbf00", verticalAlign: "middle" }}
            size={30}
            gap={4}
          >
            S
          </Avatar>
          <div className="text-xl text-center align-middle">
            {studentName}&apos;s Progress
          </div>
          {/* <SmileOutlined className="text-3xl text-green-500" /> */}
          <CheckOutlined className="text-2xl text-green-500" />
        </div>
        <DateSelector
          onSelect={(date) => {
            console.log(getDateString(date));
            setCurrentTime(() => date);
          }}
        />
        <DatePicker />
      </div>
      {loading ? (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: "calc(100vh - 15rem)" }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <div>
          {/* <ProgressForm
            formState={formState}
            handleCheckboxChange={handleCheckboxChange}
          /> */}
          <DynamicForm />
        </div>
      )}
    </div>
  );
};

export default EditProgress;
