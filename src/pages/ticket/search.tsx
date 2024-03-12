import { Button, Col, Row, Space } from 'antd';

export default function TicketSearch() {
  return (
    <>
      <Row>
        <Col span={12}>모든 티켓 조회</Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Space>
            <Button>검색조건초기화</Button>
            <Button>다시검색</Button>
            <Button>검색조건초기화</Button>
          </Space>
        </Col>
      </Row>
    </>
  );
}
