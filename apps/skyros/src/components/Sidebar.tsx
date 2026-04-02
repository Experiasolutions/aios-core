'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/', icon: '◈', label: 'Dashboard' },
  { href: '/triage', icon: '⚡', label: 'Triagem' },
  { href: '/checkin', icon: '☽', label: 'Check-in' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>S</span>
      </div>
      <div className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {pathname === item.href && <span className={styles.indicator} />}
          </Link>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span className={styles.label}>Online</span>
        </div>
      </div>
    </nav>
  );
}
