import SelectTeam from '@/components/select-team';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  SelectProps,
  Space,
  Form,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SearchItemTypes } from '@/lib/enums';

interface IPropsItems {
  type: any;
  placeholder?: string;
  title?: string;
  options?: SelectProps['options'];
}

type Props = {
  items: IPropsItems[];
  search: (e: any) => void;
};

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const DataTableSearch = (props: Props) => {
  const [form] = Form.useForm();
  const { search, items } = props;

  const onReset = () => {
    form.resetFields();
    search(null);
  };

  const onSearch = (values: any) => {
    search(values);
  };

  return (
    <Card size="small" className="data-table-search">
      <Form form={form} onFinish={onSearch}>
        {items.map((item, idx) => {
          if (item.type === SearchItemTypes.TEXT && item.title) {
            return (
              <Form.Item name={idx} key={idx}>
                <Space.Compact block>
                  <Input
                    addonBefore={item.title}
                    placeholder={item.placeholder}
                  />
                </Space.Compact>
              </Form.Item>
            );
          }
          if (item.type === SearchItemTypes.TEXT && !item.title) {
            return (
              <Form.Item name={idx} key={idx}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder={item.placeholder}
                  allowClear
                  onPressEnter={onSearch}
                />
              </Form.Item>
            );
          }
          if (item.type === SearchItemTypes.DATERANGE) {
            return (
              <Form.Item name={idx} key={idx}>
                <RangePicker
                  style={{ width: '100%' }}
                  format={dateFormat}
                  allowClear
                />
              </Form.Item>
            );
          }
          if (item.type === SearchItemTypes.SELECT) {
            return (
              <Form.Item name={idx} key={idx}>
                <Select
                  style={{ width: '100%', minWidth: '12rem' }}
                  labelInValue
                  placeholder={item.placeholder}
                  options={item.options}
                  allowClear
                />
              </Form.Item>
            );
          }
          if (item.type === SearchItemTypes.MULTI) {
            return (
              <Form.Item name={idx} key={idx}>
                <Select
                  style={{ width: '100%', minWidth: '12rem' }}
                  mode="multiple"
                  labelInValue
                  placeholder={item.placeholder}
                  options={item.options}
                  allowClear
                />
              </Form.Item>
            );
          }
          if (item.type === SearchItemTypes.TEAM) {
            return (
              <Form.Item name={idx} key={idx}>
                <SelectTeam onReturn={(e) => form.setFieldValue(idx, e)} />
              </Form.Item>
            );
          }
        })}
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', minWidth: '12rem' }}
            >
              검색
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DataTableSearch;
