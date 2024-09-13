import React, { useState } from "react";
import { Form, Select, Collapse } from "antd";
import { ProgressCategory } from "./templateB"; // Assuming templateB is imported from another file

// Status options for the status dropdown
const statusOptions = ["N/A", "review", "complete"];

// The data you provided (assuming this is defined in the same file or imported)
const templateB: ProgressCategory[] = [
  {
    name: "Work Book",
    items: [
      {
        name: "K0 Work Book",
        level: "K0",
        formType: "select",
        formOptions: [
          "K0_MSB_Sticker_Book",
          "K0_MSB_Tracing_Letter",
          "K0_Sight_Words_1",
          "K0_Sight_Words_2",
        ],
        progress: {
          material: "K0_MSB_Sticker_Book",
          status: "review",
        },
      },
    ],
  },
  {
    name: "Short Vowels",
    items: [
      {
        name: "Short Vowels Box 1",
        level: "K1",
        formType: "select",
        formOptions: ["", "a", "e", "i", "o", "u"],
        progress: {
          material: "",
          status: "N/A",
        },
      },
      {
        name: "Short Vowels Box 2",
        level: "K2",
        formType: "select",
        formOptions: ["", "a", "e", "i", "o", "u"],
        progress: {
          material: "",
          status: "N/A",
        },
      },
    ],
  },
];

const DynamicForm = () => {
  // Initialize state for the form with selected materials and statuses
  const [formState, setFormState] = useState(() =>
    templateB.map((section) =>
      section.items.map((item) => ({
        selectedMaterial: item.progress.material || item.formOptions[0], // Default to first option if null
        selectedStatus: item.progress.status || "review", // Default to "review" if null
      }))
    )
  );

  // Handle material change
  const handleMaterialChange = (
    sectionIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const updatedFormState = [...formState];
    updatedFormState[sectionIndex][itemIndex].selectedMaterial = value;
    setFormState(updatedFormState);
  };

  // Handle status change
  const handleStatusChange = (
    sectionIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const updatedFormState = [...formState];
    updatedFormState[sectionIndex][itemIndex].selectedStatus = value;
    setFormState(updatedFormState);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
      className="p-5"
    >
      {templateB.map((section, sectionIndex) => (
        <Collapse
          key={sectionIndex}
          className="mb-5"
          items={[
            {
              key: "1",
              label: section.name,
              children: (
                <div key={section.name} className="pt-3">
                  {/* Headless Table Layout */}

                  {section.items.map((item, itemIndex) => (
                    <Form.Item
                      key={itemIndex}
                      label={item.name}
                      className="!mb-0"
                      style={{ marginBottom: 0 }}
                    >
                      <Form.Item
                        style={{
                          display: "inline-block",
                          width: "calc(70% - 8px)",
                        }}
                      >
                        <Select
                          value={
                            formState[sectionIndex][itemIndex].selectedMaterial
                          }
                          onChange={(value) =>
                            handleMaterialChange(sectionIndex, itemIndex, value)
                          }
                        >
                          {item.formOptions.map((option) => (
                            <Select.Option key={option} value={option}>
                              {option}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{
                          display: "inline-block",
                          width: "calc(30% - 8px)",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          value={
                            formState[sectionIndex][itemIndex].selectedStatus
                          }
                          onChange={(value) =>
                            handleStatusChange(sectionIndex, itemIndex, value)
                          }
                        >
                          {statusOptions.map((status) => (
                            <Select.Option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form.Item>
                  ))}
                </div>
              ),
            },
          ]}
        />
      ))}
    </Form>
  );
};

export default DynamicForm;
