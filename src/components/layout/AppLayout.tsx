import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

import { SidebarProvider } from "@/components/ui/sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20 w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-[0.02]" />
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
