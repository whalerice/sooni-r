import { Breadcrumb, Button, Flex } from 'antd';
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
      {current === 'ManagementEnterprise' && <Button>등록하기</Button>}
    </Flex>
  );
};

export default PageHeader;
