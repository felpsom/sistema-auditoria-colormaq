
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  Settings,
  FileText
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Nova Auditoria', href: '/audit/new', icon: ClipboardCheck },
    { name: 'Auditorias', href: '/audits', icon: FileText },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
    { name: 'Usuários', href: '/users', icon: Users },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="ml-3">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
