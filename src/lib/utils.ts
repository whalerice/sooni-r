export const getDirection = (type: string) => {
  return type === 'descend' ? 'DESC' : type === 'ascend' ? 'ASC' : 'DESC';
};

export const getParams = (params: TableParams) => ({
  page: params.pagination.current,
  rowsPerPage: params.pagination.pageSize,
  sort: {
    id: params.sortField,
    direction: params.sortOrder,
  },
});

export const FirstUpper = (str: string) => {
  if (str === undefined) {
    return '';
  }

  const text = str[0].toUpperCase() + str.slice(1, str.length);
  return text;
};

export const getCurrentPath = (pathname: string) => {
  let str = '';

  if (pathname !== '/') {
    const c = pathname.split('/');

    const a = FirstUpper(c[1]);
    const b = FirstUpper(c[2]);
    const d = a + b;

    str = d;
  } else {
    str = 'Dashboard';
  }
  return str;
};

export const getPageTitle = (pathname: string, routes: RoutesType[]) => {
  let str: any[] = [];
  const current = getCurrentPath(pathname);

  routes[0].children?.map((e) => {
    if (e.id === current) {
      str = [{ title: e.label }];
    }
    if (e.children) {
      e.children.map((j) => {
        if (j.id === current) {
          str = [{ title: e.label }, { title: j.label }];
        }
      });
    }
  });
  return str;
};
