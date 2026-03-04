import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

import { SidebarProvider } from "@/components/ui/sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#050508] overflow-hidden selection:bg-primary/20 w-full relative">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-[0.03] mask-radial" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
          
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-6">
            <div className="max-w-[1600px] mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}