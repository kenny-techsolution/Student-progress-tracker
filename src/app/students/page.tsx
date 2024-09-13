"use client";

import { useEffect, useState } from "react";
import { Table, Button, Drawer, Spin, notification, List } from "antd";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  grade_level: string;
}

interface Log {
  _id: string;
  logDate: string;
  logTimestamp: string;
  log: unknown; // Can be unknown type of log
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]); // State to store logs

  // Fetch the list of students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch students" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch details and logs of a selected student
  const fetchStudentDetailsAndLogs = async (studentId: string) => {
    setDrawerLoading(true);
    try {
      // Fetch student details
      const studentResponse = await axios.get(`/api/students/${studentId}`);
      setSelectedStudent(studentResponse.data);

      // Fetch logs for the selected student
      const logsResponse = await axios.get(`/api/students/${studentId}/logs`);
      setLogs(logsResponse.data);
    } catch (error) {
      notification.error({
        message: "Failed to fetch student details or logs",
      });
    } finally {
      setDrawerLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Columns for Ant Design table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Grade Level",
      dataIndex: "grade_level",
      key: "grade_level",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, student: Student) => (
        <Button
          onClick={() => {
            setDrawerVisible(true);
            fetchStudentDetailsAndLogs(student._id);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Students List</h1>
      <Table
        dataSource={students}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Drawer
        title="Student Details"
        placement="right"
        width={400}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        {drawerLoading ? (
          <Spin />
        ) : (
          selectedStudent && (
            <div>
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Grade Level:</strong> {selectedStudent.grade_level}
              </p>
              <h3>Logs:</h3>
              <List
                dataSource={logs}
                renderItem={(log) => (
                  <List.Item key={log._id}>
                    <List.Item.Meta
                      title={`Log Date: ${log.logDate}`}
                      description={
                        <pre>{JSON.stringify(log.log, null, 2)}</pre>
                      } // Preformatted log content
                    />
                  </List.Item>
                )}
              />
            </div>
          )
        )}
      </Drawer>
    </div>
  );
};

export default StudentsPage;
