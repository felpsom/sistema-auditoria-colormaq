import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
const Navbar: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <nav className="border-b border-gray-200 px-4 md:px-6 py-4 bg-sky-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center bg-transparent">
              <span className="text-white text-xs md:text-sm font-bold">CM</span>
            </div>
            <h1 className="text-sm truncate text-white font-bold text-left md:text-xl">
              <span className="hidden sm:inline">Sistema Colormaq de Produção</span>
              <span className="sm:hidden">Colormaq</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-xs md:text-sm text-gray-600 hidden sm:block truncate max-w-24 md:max-w-none">
            {user?.company}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="w-[200px] truncate text-xs text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{user?.company}</p>
                </div>
              </div>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>;
};
export default Navbar;