import { NavLink } from 'react-router-dom';
import { GetProp, Menu, MenuProps } from 'antd';
import { useThemeStore } from '@/stores/theme';
import { routes } from '@/lib/router';
import { usePreloadStore } from '@/stores/preload';
import { useAuthStore } from '@/stores/auth';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export function getMenu(menu: RoutesType[]) {
  const { role } = useAuthStore();
  const items: MenuItem[] = [];

  console.log(role);

  const title = (item: any) => {
    const path = item.parent ? `/${item.parent}/${item.path}` : `/${item.path}`;

    if (item.element) {
      return <NavLink to={path}>{item.label ? item.label : item.id}</NavLink>;
    }

    return item.label;
  };

  const isAuthority = (authority: any[]) => {
    const state = authority.filter((e) => e === role).length > 0;
    return state;
  };

  const child = (items: any) => {
    return items.map((item: any) => ({
      key: item.id,
      label: title(item),
      icon: item.icon,
    }));
  };

  menu.map((item) => {
    if (isAuthority(item.haveAuthority!)) {
      if (item.children) {
        items.push({
          type: 'group',
          label: title(item),
        });
        item.children.map((c: any) => {
          if (isAuthority(c.haveAuthority)) {
            items.push({
              key: c.id!,
              label: title({ parent: item.path, ...c }),
              icon: c.icon,
              children: c.children ? child(c.children) : null,
            });
          }
        });
      } else {
        items.push({
          key: item.id!,
          label: title(item),
          icon: item.icon,
        });
      }
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
      items={getMenu(routes[0].children!)}
      theme={themeName}
    />
  );
}
