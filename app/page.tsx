'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mic, 
  Camera, 
  TrendingUp, 
  Gift, 
  Menu, 
  X,
  Smartphone,
  Globe,
  Users,
  Droplet,
  AlertTriangle,
  CheckCircle,
  Timer,
  Pencil,
  Check,
} from 'lucide-react'
import { VoiceInput } from '@/components/VoiceInput'
import { ImageUpload } from '@/components/ImageUpload'
import WhatsAppBotFeatureCard from '../components/WhatsAppBotFeatureCard';
import ProfileDropdown from '../components/ProfileDropdown';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<'voice' | 'image' | 'iot' | null>(null)
  // IoT System State
  type Plot = { name: string; waterLevel: number; pumpOn: boolean; lastIrrigated: Date | null };
  const [selectedPlot, setSelectedPlot] = useState<number>(0); // 0,1,2 for 3 plots
  const [plots, setPlots] = useState<Plot[]>([
    { name: 'Plot 1', waterLevel: 65, pumpOn: false, lastIrrigated: null },
    { name: 'Plot 2', waterLevel: 42, pumpOn: false, lastIrrigated: null },
    { name: 'Plot 3', waterLevel: 18, pumpOn: false, lastIrrigated: null },
  ]);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  // Section refs for smooth scroll
  const voiceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const iotRef = useRef<HTMLDivElement>(null);
  // Simulate water level change when pump is on
  useEffect(() => {
    const interval = setInterval(() => {
      setPlots((prev) => prev.map((plot, idx) => {
        if (plot.pumpOn) {
          // Increase water level by 2% per tick, max 100
          let newLevel = Math.min(plot.waterLevel + 2, 100);
          return { ...plot, waterLevel: newLevel };
        } else {
          // Decrease water level by 0.2% per tick, min 0
          let newLevel = Math.max(plot.waterLevel - 0.2, 0);
          return { ...plot, waterLevel: newLevel };
        }
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);
  // Helper for alert status
  function getWaterStatus(level: number) {
    if (level > 50) return { text: 'Good', color: 'text-green-700', icon: <CheckCircle className="w-5 h-5 text-green-500 inline" /> };
    if (level > 30) return { text: 'Needs Water', color: 'text-yellow-700', icon: <AlertTriangle className="w-5 h-5 text-yellow-500 inline" /> };
    return { text: 'Dry! Please irrigate', color: 'text-red-700', icon: <AlertTriangle className="w-5 h-5 text-red-500 inline" /> };
  }

  const features = [
    {
      id: 'voice',
      title: 'Voice Analysis',
      description: 'Speak in Kannada, Hindi, or English to get instant farming advice',
      icon: Mic,
      color: 'bg-blue-500'
    },
    {
      id: 'image',
      title: 'Crop Diagnosis',
      description: 'Upload photos of your crops for AI-powered disease detection',
      icon: Camera,
      color: 'bg-green-500'
    },
    {
      id: 'market',
      title: 'Market Prices',
      description: 'Real-time crop prices and market trends',
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      id: 'subsidies',
      title: 'Government Schemes',
      description: 'Find and apply for farming subsidies and schemes',
      icon: Gift,
      color: 'bg-purple-500'
    },
    // NEW IOT FEATURE
    {
      id: 'iot',
      title: 'IoT System',
      description: 'Control irrigation and monitor water level in real time',
      icon: Droplet,
      color: 'bg-cyan-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">🌾 Kisan</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/diagnosis" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Diagnosis
                </Link>
                <Link href="/marketplace" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Marketplace
                </Link>
                <Link href="/subsidies" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Subsidies
                </Link>
                <ProfileDropdown />
              </div>
            </div>

            {/* Mobile menu button and profile */}
            <div className="md:hidden flex items-center space-x-2">
              <ProfileDropdown />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link href="/" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/diagnosis" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Diagnosis
              </Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Marketplace
              </Link>
              <Link href="/subsidies" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Subsidies
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              AI-Powered
              <span className="text-primary-600"> Farming</span>
              <br />
              Assistant
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Get instant crop disease diagnosis, market insights, and government scheme information 
              through voice commands and image analysis in multiple languages.
            </motion.p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {features.map((feature, index) => {
                // Use Link for Market Prices and Government Schemes
                if (feature.id === 'market') {
                  return (
                    <Link href="/marketplace" key={feature.id} passHref legacyBehavior>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                        className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label="Go to Market Prices"
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/marketplace'; } }}
                      >
                        <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                          <feature.icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </motion.div>
                    </Link>
                  );
                }
                if (feature.id === 'subsidies') {
                  return (
                    <Link href="/subsidies" key={feature.id} passHref legacyBehavior>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                        className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label="Go to Government Schemes"
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/subsidies'; } }}
                      >
                        <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                          <feature.icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </motion.div>
                    </Link>
                  );
                }
                // For Voice, Image, IoT, scroll to section
                return (
                  <motion.div
                    key={feature.id}
                    onClick={() => {
                      setActiveFeature(feature.id as 'voice' | 'image' | 'iot');
                      setTimeout(() => {
                        if (feature.id === 'voice' && voiceRef.current) voiceRef.current.scrollIntoView({ behavior: 'smooth' });
                        if (feature.id === 'image' && imageRef.current) imageRef.current.scrollIntoView({ behavior: 'smooth' });
                        if (feature.id === 'iot' && iotRef.current) iotRef.current.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${feature.title}`}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') {
                      setActiveFeature(feature.id as 'voice' | 'image' | 'iot');
                      setTimeout(() => {
                        if (feature.id === 'voice' && voiceRef.current) voiceRef.current.scrollIntoView({ behavior: 'smooth' });
                        if (feature.id === 'image' && imageRef.current) imageRef.current.scrollIntoView({ behavior: 'smooth' });
                        if (feature.id === 'iot' && iotRef.current) iotRef.current.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}}
                    className="card min-w-0 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-base sm:text-lg">{feature.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      {activeFeature && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeFeature === 'voice' ? 'Voice Analysis' : activeFeature === 'image' ? 'Crop Diagnosis' : activeFeature === 'iot' ? 'IoT System' : ''}
              </h2>
              <button
                onClick={() => setActiveFeature(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div id="voice-section" ref={voiceRef} />
            {activeFeature === 'voice' && <VoiceInput />}
            <div id="image-section" ref={imageRef} />
            {activeFeature === 'image' && <ImageUpload />}
            <div id="iot-section" ref={iotRef} />
            {activeFeature === 'iot' && (
              <div className="space-y-6">
                {/* Plot Selector */}
                <div className="flex flex-wrap gap-3 mb-2 items-center w-full">
                  {[0,1,2].map(idx => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedPlot(idx); setIsRenaming(false); }}
                      className={`px-4 py-2 rounded-lg font-semibold border transition-colors w-full sm:w-auto ${selectedPlot === idx ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white text-cyan-700 border-cyan-300 hover:bg-cyan-50'}`}
                    >
                      {plots[idx].name}
                    </button>
                  ))}
                  {/* Rename icon and input for selected plot */}
                  {isRenaming ? (
                    <form className="flex items-center gap-2 ml-2 w-full sm:w-auto mt-2 sm:mt-0" onSubmit={e => { e.preventDefault(); setPlots(plots => plots.map((p, idx) => idx === selectedPlot ? { ...p, name: renameValue || p.name } : p)); setIsRenaming(false); }}>
                      <input
                        className="border rounded px-2 py-1 text-sm w-full sm:w-28"
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        autoFocus
                        maxLength={20}
                      />
                      <button type="submit" className="text-green-600 hover:text-green-800"><Check className="w-4 h-4" /></button>
                      <button type="button" className="text-gray-400 hover:text-gray-600" onClick={() => setIsRenaming(false)}><X className="w-4 h-4" /></button>
                    </form>
                  ) : (
                    <button className="ml-2 text-cyan-600 hover:text-cyan-800" title="Rename plot" onClick={() => { setIsRenaming(true); setRenameValue(plots[selectedPlot].name); }}>
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {/* Water Level & Alert */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <Droplet className="w-10 h-10 text-cyan-500" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Water Level</div>
                    <div className="text-2xl font-bold">{Math.round(plots[selectedPlot].waterLevel)}%</div>
                    <div className={`mt-1 font-medium flex items-center gap-2 ${getWaterStatus(plots[selectedPlot].waterLevel).color}`}>{getWaterStatus(plots[selectedPlot].waterLevel).icon} {getWaterStatus(plots[selectedPlot].waterLevel).text}</div>
                  </div>
                </div>
                {/* Pump Control */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <button
                    onClick={() => setPlots(plots => plots.map((p, idx) => idx === selectedPlot ? { ...p, pumpOn: !p.pumpOn, lastIrrigated: !p.pumpOn ? new Date() : p.lastIrrigated } : p))}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors w-full sm:w-auto ${plots[selectedPlot].pumpOn ? 'bg-green-600 hover:bg-green-700' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                  >
                    {plots[selectedPlot].pumpOn ? 'Turn Off Pump' : 'Turn On Pump'}
                  </button>
                  <span className={`ml-2 text-sm font-medium ${plots[selectedPlot].pumpOn ? 'text-green-700' : 'text-gray-500'}`}>{plots[selectedPlot].pumpOn ? 'Pump ON' : 'Pump OFF'}</span>
                </div>
                {/* Last Irrigated */}
                <div className="flex items-center gap-2 text-xs text-gray-500 w-full">
                  <Timer className="w-4 h-4" />
                  Last irrigated: {plots[selectedPlot].lastIrrigated ? (plots[selectedPlot].lastIrrigated as Date).toLocaleString() : 'Never'}
                </div>
                <div className="text-xs text-gray-500">(This is a demo. IoT controls and water level are mocked for now.)</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Smartphone className="text-primary-500" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Farmers</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Globe className="text-primary-500" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3 Languages</h3>
              <p className="text-gray-600">Kannada, Hindi, English</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Users className="text-primary-500" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Demo Section */}
      {/* (Section removed for chat widget implementation) */}
    </div>
  )
} 