
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';



interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard'
    },
    {
      title: 'Analytics',
      icon: <BarChart className="w-5 h-5" />,
      path: '/dashboard/analytics'
    },
    {
      title: 'Community',
      icon: <Users className="w-5 h-5" />,
      path: '/dashboard/community'
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/dashboard/settings'
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-ewaste-500" />
            <span className="ml-2 font-semibold text-lg">
              <a href="/" className="flex items-center">
                <span className="text-ewaste-600">e</span>Waste
              </a>
            </span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-ewaste-100 flex items-center justify-center text-ewaste-600 font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <p className="font-medium text-sm">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200",
                window.location.pathname === item.path 
                  ? "bg-ewaste-50 text-ewaste-700 font-medium" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.title}</span>
              {window.location.pathname === item.path && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b h-16 flex items-center px-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold ml-4 lg:ml-0">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
