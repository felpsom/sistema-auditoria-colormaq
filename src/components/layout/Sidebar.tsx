
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
    <div className="w-full bg-white border-r border-gray-200 h-full">
      <div className="p-4 md:p-6">
        {/* Mobile Header */}
        <div className="md:hidden mb-6 pb-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Sistema Colormaq</h2>
          </div>
        </div>

        <nav className="space-y-1 md:space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive ? 'active' : ''} text-sm md:text-base`}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="ml-2 md:ml-3">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
