import { Form, Space, Card, Checkbox, Avatar } from "antd";

export interface Section {
  name: string;
  content: Array<{ name: string; type: string; done: boolean }>;
}

const ProgressForm = ({
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

export default ProgressForm;
