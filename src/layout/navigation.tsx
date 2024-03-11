import { NavLink } from 'react-router-dom';
import { GetProp, Menu, MenuProps } from 'antd';
import { useThemeStore } from '@/stores/theme';
import { routes } from '@/lib/router';
import { usePreloadStore } from '@/stores/preload';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export function getMenu(menu: any) {
  const items: MenuItem[] = [];

  const title = (item: any) => {
    const path = item.parent ? `/${item.parent}/${item.path}` : `/${item.path}`;

    if (item.element) {
      return <NavLink to={path}>{item.label ? item.label : item.id}</NavLink>;
    }

    return item.label;
  };

  const child = (items: any) => {
    return items.map((item: any) => ({
      key: item.id,
      label: title(item),
      icon: item.icon,
    }));
  };

  menu.map((e) => {
    if (e.children) {
      items.push({
        type: 'group',
        label: title(e),
      });
      e.children.map((j: any) => {
        items.push({
          key: j.id!,
          label: title({ parent: e.path, ...j }),
          icon: j.icon,
          children: j.children ? child(j.children) : null,
        });
      });
    } else {
      items.push({
        key: e.id!,
        label: title(e),
        icon: e.icon,
      });
    }
  });

  return items;
}

export default function Navigation() {
  const { themeName } = useThemeStore();
  const { currentPage, setPage } = usePreloadStore();

  const onClick: MenuProps['onClick'] = (e) => {
    setPage(e.key);
  };

  return (
    <Menu
      defaultSelectedKeys={[currentPage]}
      onClick={onClick}
      mode="inline"
      items={getMenu(routes[0].children)}
      theme={themeName}
    />
  );
}
