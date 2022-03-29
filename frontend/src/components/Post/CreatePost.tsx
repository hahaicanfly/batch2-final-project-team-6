import { Form, Input, Button, Select } from 'antd';

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const CreatePost = () => {

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <div className="create-post">
      <div className="container">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="文章標題"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="文章內容"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

}


export default CreatePost