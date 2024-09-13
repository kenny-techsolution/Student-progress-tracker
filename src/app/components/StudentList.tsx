"use client";

import { useEffect, useState } from "react";
import { Table, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  grade_level: string;
}

interface StudentListType {
  onSelect: (id: string, name: string) => void;
}

const StudentList = ({ onSelect }: StudentListType) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

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
      title: "Edit",
      key: "edit",
      render: (_: unknown, student: Student) => (
        <EditOutlined
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            console.log("click student", student);
            onSelect(student._id, student.name);
          }}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={students}
      columns={columns}
      rowKey="_id"
      loading={loading}
      pagination={false}
    />
  );
};

export default StudentList;
