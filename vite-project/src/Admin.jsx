import { useState } from 'react';
import { Folder, Clock, Trash2, Upload, FileX, Music, PlusCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function AdminDashboard() {
  const [mainFolder, setMainFolder] = useState({
    id: 'main',
    name: 'Main Collection',
    createdAt: '2025-01-15T10:00:00',
    songs: 156,
    color: 'bg-gradient-to-br from-amber-400 to-orange-600'
  });
  const navigate=useNavigate()
  const [folders, setFolders] = useState([
    { id: 1, name: 'Pop Hits Collection', createdAt: '2025-04-10T14:30:00', songs: 28, color: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { id: 2, name: 'Rock Classics', createdAt: '2025-04-08T10:15:00', songs: 45, color: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
    { id: 3, name: 'Jazz Collection', createdAt: '2025-04-05T16:20:00', songs: 32, color: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
    { id: 4, name: 'Electronic Mix', createdAt: '2025-04-01T09:45:00', songs: 18, color: 'bg-gradient-to-br from-emerald-400 to-teal-500' },
    { id: 5, name: 'Acoustic Sessions', createdAt: '2025-03-28T15:10:00', songs: 12, color: 'bg-gradient-to-br from-violet-400 to-purple-600' },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [uploadAnimation, setUploadAnimation] = useState(false);

  const handleDeleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id));
    showNotificationAlert('Folder deleted successfully');
  };



  const handleDeleteOldFiles = () => {
    if (folders.length > 0) {
      const sortedFolders = [...folders].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      const oldestFolder = sortedFolders[0];
      setFolders(folders.filter(folder => folder.id !== oldestFolder.id));
      showNotificationAlert(`Deleted oldest folder: ${oldestFolder.name}`);
    } else {
      showNotificationAlert('No folders to delete');
    }
  };

  const showNotificationAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const randomGradient = () => {
    const gradients = [
      'bg-gradient-to-br from-pink-500 to-rose-500',
      'bg-gradient-to-br from-purple-500 to-indigo-600',
      'bg-gradient-to-br from-amber-400 to-orange-500',
      'bg-gradient-to-br from-cyan-400 to-blue-500',
      'bg-gradient-to-br from-emerald-400 to-teal-500',
      'bg-gradient-to-br from-violet-400 to-purple-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const addNewFolder = () => {
    const newFolder = {
      id: folders.length > 0 ? Math.max(...folders.map(f => f.id)) + 1 : 1,
      name: `New Folder ${folders.length + 1}`,
      createdAt: new Date().toISOString(),
      songs: 0,
      color: randomGradient()
    };
    setFolders([...folders, newFolder]);
    showNotificationAlert('New folder created');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
  <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white bg-opacity-20 rounded-lg">
        <Music className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Music Admin</h1>
    </div>
    <div className="text-sm font-medium bg-white bg-opacity-10 px-4 py-2 rounded-lg hidden sm:block">
      Today: {new Date().toLocaleDateString()}
    </div>
  </div>
</header>


      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-end">
          <div className="relative">
           
            <button 
            onClick={()=>navigate('/creator-file-upload',{replace:true})}
            className={`w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${uploadAnimation ? 'animate-pulse' : ''}`}>
              <Upload className={`h-5 w-5 ${uploadAnimation ? 'animate-spin' : ''}`} />
              <span>Upload Songs</span>
            </button>
          </div>
          
         
          <button 
            onClick={handleDeleteOldFiles}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FileX className="h-5 w-5" />
            <span>Delete Last Date Files</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="mr-2 h-6 w-6 text-amber-500" />
            Main Folder
          </h2>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-4 ${mainFolder.color} text-white rounded-xl shadow-lg`}>
                  <Folder className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{mainFolder.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(mainFolder.createdAt)}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    {mainFolder.songs} songs
                  </div>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <Music className="h-5 w-5" />
                <span>Open Main Folder</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              Other Folders
              <span className="ml-3 text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                {folders.length} Total
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map((folder) => (
              <div 
                key={folder.id} 
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-3 ${folder.color}`}></div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${folder.color} text-white rounded-xl`}>
                        <Folder className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{folder.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formatDate(folder.createdAt)}</span>
                        </div>
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {folder.songs} songs
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteFolder(folder.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Delete folder"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {folders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-6 bg-indigo-50 rounded-full mb-4 text-indigo-600">
                <Folder className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No folders found</h3>
              <p className="text-gray-500 max-w-md mb-6">
                There are no additional music folders available yet.
              </p>
              <button 
                onClick={addNewFolder}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create Your First Folder</span>
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            Music Admin Dashboard © 2025 | All Rights Reserved
          </p>
        </div>
      </footer>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in z-50">
          <div className="p-2 bg-white bg-opacity-20 rounded-full">
            <Music className="h-5 w-5" />
          </div>
          <span>{notificationMessage}</span>
        </div>
      )}
    </div>
  );
}