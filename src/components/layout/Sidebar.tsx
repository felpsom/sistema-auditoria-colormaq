
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Nova Auditoria', href: '/audit/new', icon: ClipboardCheck },
    { name: 'Auditorias', href: '/audits', icon: FileText },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
    { name: 'Usuários', href: '/users', icon: Users },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Logo/Header */}
        {!isCollapsed && (
          <div className="px-4 pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <h2 className="font-bold text-gray-900 text-sm">Sistema Colormaq</h2>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <item.icon className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
