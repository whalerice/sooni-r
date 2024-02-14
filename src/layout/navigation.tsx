import { router } from '@/lib/router';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [nav, setNav] = useState<any>([]);

  useEffect(() => {
    setNav(router.routes[0].children);
    console.log(nav);
  });
  return (
    <ul>
      {nav.map((item: any) => {
        return (
          <li key={item.index}>
            <a href={item.path === '' ? '/' : item.path}>
              {item.index}
              {item.id}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
