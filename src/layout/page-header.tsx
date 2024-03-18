import { Breadcrumb, Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import { routes } from '@/lib/router';
import { getCurrentPath, getPageTitle } from '@/lib/utils';
import { useEffect, useState } from 'react';

const PageHeader = () => {
  const { pathname } = useLocation();
  const [breadcrumbItem, setBreadcrumbItem] = useState<any[]>([]);
  const current = getCurrentPath(pathname);

  useEffect(() => {
    setBreadcrumbItem(getPageTitle(pathname, routes));
    console.log(current);
  }, [pathname]);

  return (
    <Flex
      gap={5}
      align="center"
      justify="space-between"
      className="page-header"
    >
      <Breadcrumb items={breadcrumbItem} />
      {current === 'ManagementEnterprise' && (
        <Button type="primary" ghost icon={<PlusOutlined />}>
          등록하기
        </Button>
      )}
      {current === 'ManagementTeam' && (
        <Button type="primary" ghost icon={<PlusOutlined />}>
          팀 추가
        </Button>
      )}
      {current === 'ManagementManager' && (
        <Button type="primary" ghost icon={<PlusOutlined />}>
          관리자 추가
        </Button>
      )}
    </Flex>
  );
};

export default PageHeader;
