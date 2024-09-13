"use client";

import { useEffect, useState, useMemo } from "react";
import { notification, Spin, Form, Space, Card, Checkbox, Avatar } from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import templateA from "./templateA";
import DateSelector from "./DateSelector";
// import { EditOutlined } from "@ant-design/icons";
import axios, { AxiosError } from "axios";
import { DatePicker } from "antd";

interface EditProgressProps {
  studentId: string | null;
  studentName: string | null;
}

interface Section {
  name: string;
  content: Array<{ name: string; type: string; done: boolean }>;
}

type Log = any;

// Deep clone function
const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

const getDateString = (timestamp: number) => {
  const options = {
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
      const axiosError = error as AxiosError;

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

  const DynamicForm = ({
    formState,
    handleCheckboxChange,
  }: {
    formState: Section[];
    handleCheckboxChange: (sectionIndex: number, contentIndex: number) => void;
  }) => {
    return (
      <div className="p-4">
        <Form layout="vertical" className="full-width">
          <div className="grid grid-cols-2 gap-4 h-62">
            {formState.map((section, sectionIndex) => (
              <Space
                key={sectionIndex}
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Card bordered={true} size="default">
                  <Card.Meta
                    title={section.name}
                    avatar={
                      <Avatar
                        shape="square"
                        src="https://www.svgrepo.com/show/513272/book-closed.svg"
                      />
                    }
                  />
                  <div className="m-6">
                    {/* Section title */}

                    {/* Section content */}
                    {section.content.map((item, contentIndex) => (
                      <Form.Item key={contentIndex} className="mb-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.done}
                            onChange={() =>
                              handleCheckboxChange(sectionIndex, contentIndex)
                            }
                          />
                          <span className="text-l font-bold font-grey-400">
                            {item.name}
                          </span>
                        </div>
                      </Form.Item>
                    ))}
                  </div>
                </Card>
              </Space>
            ))}
          </div>
        </Form>
      </div>
    );
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
            {studentName}'s Progress
          </div>
          {/* <SmileOutlined className="text-3xl text-green-500" /> */}
          <CheckOutlined className="text-2xl text-green-500" />
        </div>
        <DateSelector
          onSelect={(date) => {
            console.log(getDateString(date));
            setCurrentTime((prev) => date);
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
          <DynamicForm
            formState={formState}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}
    </div>
  );
};

export default EditProgress;
