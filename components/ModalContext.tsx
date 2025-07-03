'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import LoginModal from './LoginModal'
import ConfirmLogoutModal from './ConfirmLogoutModal'
import UserProfileModal from './UserProfileModal'

interface ModalContextType {
  showLogin: boolean
  showLogoutConfirm: boolean
  showProfile: boolean
  setShowLogin: (show: boolean) => void
  setShowLogoutConfirm: (show: boolean) => void
  setShowProfile: (show: boolean) => void
  handleLogin: () => void
  handleLogout: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogin = () => {
    setShowLogin(false)
    localStorage.setItem('tvl_logged_in', '1')
    window.location.reload()
  }

  const handleLogout = () => {
    localStorage.removeItem('tvl_logged_in')
    setShowLogoutConfirm(false)
    window.location.href = '/login'
  }

  return (
    <ModalContext.Provider
      value={{
        showLogin,
        showLogoutConfirm,
        showProfile,
        setShowLogin,
        setShowLogoutConfirm,
        setShowProfile,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
      
      {/* Render modals at the root level */}
      <LoginModal 
        open={showLogin} 
        onLogin={handleLogin} 
        onClose={() => setShowLogin(false)} 
      />
      <ConfirmLogoutModal 
        open={showLogoutConfirm} 
        onConfirm={handleLogout} 
        onCancel={() => setShowLogoutConfirm(false)} 
      />
      <UserProfileModal 
        open={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
} 