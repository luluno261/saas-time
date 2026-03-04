import React, { useState, useEffect, useCallback } from 'react'
import { Play, Square, Timer as TimerIcon, Plus, ChevronRight, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { blink } from '@/lib/blink'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { formatDuration, cn } from '@/lib/utils'

interface Project {
  id: string
  name: string
  color: string
}

export function TimerControl() {
  const { user } = useAuth()
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState<string>('none')
  const [projects, setProjects] = useState<Project[]>([])
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null)

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await blink.db.projects.list({
          where: { user_id: user?.id }
        }) as any[]
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects', error)
      }
    }
    if (user) fetchProjects()
  }, [user])

  // Timer logic
  useEffect(() => {
    let interval: any
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date()
        setElapsed(Math.floor((now.getTime() - startTime.getTime()) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, startTime])

  const handleStart = async () => {
    if (!user) return
    const now = new Date()
    try {
      const entry = await blink.db.timeEntries.create({
        userId: user.id,
        description,
        projectId: projectId === 'none' ? null : projectId,
        startTime: now.toISOString(),
        isManual: "0"
      })
      setActiveEntryId(entry.id)
      setStartTime(now)
      setIsRunning(true)
      toast.success('Timer started')
    } catch (error) {
      toast.error('Failed to start timer')
    }
  }

  const handleStop = async () => {
    if (!activeEntryId) return
    const now = new Date()
    try {
      await blink.db.timeEntries.update(activeEntryId, {
        endTime: now.toISOString(),
        duration: elapsed
      })
      setIsRunning(false)
      setStartTime(null)
      setElapsed(0)
      setDescription('')
      setActiveEntryId(null)
      toast.success('Time entry saved')
      // Refresh global state if needed
    } catch (error) {
      toast.error('Failed to save time entry')
    }
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn(
      "bg-card rounded-lg border border-border p-4 flex flex-col lg:flex-row items-center gap-4 transition-all duration-300",
      isRunning ? "border-primary/30 ring-1 ring-primary/10 bg-primary/[0.02] shadow-sm" : ""
    )}>
      <div className="flex-1 w-full relative group">
        <Input 
          placeholder="What are you working on?" 
          className="h-10 border-none bg-muted/50 rounded-md focus-visible:ring-1 focus-visible:ring-primary/20 text-sm font-medium placeholder:text-muted-foreground/50 transition-all"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isRunning}
        />
      </div>
      
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="w-full lg:w-48">
          <Select 
            value={projectId} 
            onValueChange={setProjectId}
            disabled={isRunning}
          >
            <SelectTrigger className="h-10 bg-muted/50 border-none rounded-md text-xs font-medium focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent className="rounded-md border shadow-md">
              <SelectItem value="none" className="text-xs">No Project</SelectItem>
              {projects.map(p => (
                <SelectItem key={p.id} value={p.id} className="text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 ml-auto lg:ml-0">
          <div className={cn(
            "text-2xl font-mono tracking-tight tabular-nums transition-colors duration-300 min-w-[100px] text-right",
            isRunning ? "text-primary" : "text-muted-foreground/60"
          )}>
            {formatTime(elapsed)}
          </div>

          <div className="flex items-center gap-2">
            {isRunning ? (
              <Button 
                size="sm"
                variant="destructive" 
                className="h-10 px-4 rounded-md shadow-sm hover:bg-destructive/90 transition-all text-xs font-medium"
                onClick={handleStop}
              >
                <Square className="h-3.5 w-3.5 mr-2" />
                Stop
              </Button>
            ) : (
              <Button 
                size="sm"
                className="h-10 px-4 rounded-md shadow-sm hover:bg-primary/90 transition-all text-xs font-medium"
                onClick={handleStart}
              >
                <Play className="h-3.5 w-3.5 mr-2 fill-current" />
                Start
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
