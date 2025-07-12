'use client';

import { useAuthStore } from '../../lib/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Phone, Shield, ArrowLeft, Camera } from 'lucide-react';
import Link from 'next/link';
import ProfileImageEditor from '../../components/ProfileImageEditor';
import ProfileImageDisplay from '../../components/ProfileImageDisplay';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8">
            <div className="flex items-center">
              <div className="relative">
                <ProfileImageEditor size="lg" showUploadButton={true} className="border-4 border-white/20" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-green-100">
                  {user.role ? user.role.replace('_', ' ').toUpperCase() : 'User'}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Personal Information
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="font-medium text-gray-900">{user.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {user.role ? user.role.replace('_', ' ') : 'Standard User'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Account Status</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">Authentication</span>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-600">Demo Mode</span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Last Login</span>
                    <span className="text-sm text-gray-900">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image Display and Upload */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-green-600" />
                Profile Image
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Image Display */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Original Image</h3>
                  <ProfileImageDisplay size="xl" showOriginal={true} className="mx-auto" />
                  <p className="text-xs text-gray-500 mt-2 text-center">Full image (not cropped)</p>
                </div>
                
                {/* Profile Image Editor */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Profile Icon</h3>
                  <div className="flex justify-center">
                    <ProfileImageEditor size="lg" showUploadButton={true} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Click to upload/crop</p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>• Click on the profile icon to upload a new image</p>
                <p>• Use the cropping tool to create a perfect circular profile picture</p>
                <p>• The original image is preserved for full display</p>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/diagnosis" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <h3 className="font-medium text-gray-900">Crop Diagnosis</h3>
                  <p className="text-sm text-gray-600 mt-1">Analyze crop diseases</p>
                </Link>

                <Link href="/marketplace" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <h3 className="font-medium text-gray-900">Marketplace</h3>
                  <p className="text-sm text-gray-600 mt-1">Check prices & trends</p>
                </Link>

                <Link href="/subsidies" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <h3 className="font-medium text-gray-900">Subsidies</h3>
                  <p className="text-sm text-gray-600 mt-1">Government schemes</p>
                </Link>
              </div>
            </div>

            {/* Demo Information */}
            <div className="border-t pt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">Demo Mode Active</h3>
                <p className="text-sm text-yellow-700">
                  You're currently using the demo authentication system. In production, this would be connected to a real authentication service like Firebase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 