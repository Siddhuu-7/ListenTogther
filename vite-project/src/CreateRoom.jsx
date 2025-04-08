import React, { useState } from 'react';
import { Users, ArrowLeft, Key, User, ChevronRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CreateRoomPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    roomKey: '',
    userName: ''
  });
  const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
    localStorage.setItem('username',formData.userName);
  };
  const GenerateKey = () => {
    const key = `ROOM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setFormData({ ...formData, roomKey: key });
  };
  
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Create Your Room</h2>
        <p className="text-gray-600 mt-2">Let's set up your perfect space for connection</p>
      </div>
      
      <div className="space-y-4">
      <button
      onClick={GenerateKey}
        className={`w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500  hover:to-pink-600 text-white rounded-xl font-medium shadow-md transition-all duration-300 flex items-center justify-center`}
      >
        {submitting ? (
          "Generating your Key..."
        ) : "Generate Key"}
      </button>
        <div>
          <label htmlFor="roomKey" className="block text-sm font-medium text-gray-700 mb-1">
            Room Key
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              id="roomKey"
              name="roomKey"
              type="text"
              value={formData.roomKey}
              onChange={handleChange}
              className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="Generate or Enter a  room key"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">This will be used for others to join your room</p>
        </div>
        
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="How should we call you?"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">This name will be visible to other participants</p>
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!formData.roomKey || !formData.userName || submitting}
        className={`w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium shadow-md transition-all duration-300 flex items-center justify-center ${
          (!formData.roomKey || !formData.userName || submitting) ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {submitting ? (
          "Creating your room..."
        ) : (
          <>
            Create Room
            <ChevronRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Room Created!</h2>
        <p className="text-gray-600 mt-2">Your space is ready for amazing connections</p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="mb-2">
          <span className="text-sm text-gray-500">Room Key:</span>
          <span className="ml-2 font-medium">{formData.roomKey}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Host:</span>
          <span className="ml-2 font-medium">{formData.userName}</span>
        </div>
      </div>
      
      <button
      onClick={()=>{
        navigate(`/songSelection/${formData.roomKey}`);
      }}
        className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium shadow-md transition-all duration-300"
      >
        Enter Your Room
      </button>
      
      <button
        className="w-full p-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-300"
      >
        Share Invitation
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex items-center mb-6">
          <button 
            onClick={()=>navigate('/',{replace:true})}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1" />
          <div className="p-2 bg-purple-100 rounded-full">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
        </div>

        {success ? renderSuccess() : renderStep1()}

        <div className="mt-8 flex justify-between">
          <div className="h-3 w-3 rounded-full bg-purple-300 opacity-30" />
          <div className="h-2 w-2 rounded-full bg-pink-300 opacity-20" />
          <div className="h-4 w-4 rounded-full bg-indigo-300 opacity-25" />
        </div>
      </div>
    </div>
  );
};

export default CreateRoomPage;