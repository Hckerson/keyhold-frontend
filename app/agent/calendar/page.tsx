'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Appointment {
  id: string
  type: 'showing' | 'meeting' | 'inspection' | 'closing'
  title: string
  property: string
  client: string
  time: string
  duration: string
  notes: string
}

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    type: 'showing',
    title: 'Property Showing',
    property: '456 Oak Avenue',
    client: 'John Doe',
    time: '2:00 PM',
    duration: '1 hour',
    notes: 'Client interested in modern updates',
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Client Meeting',
    property: '789 Sunset Blvd',
    client: 'Sarah Johnson',
    time: '3:30 PM',
    duration: '30 mins',
    notes: 'Discuss counter-offer strategy',
  },
  {
    id: '3',
    type: 'inspection',
    title: 'Home Inspection',
    property: '234 Oak Street',
    client: 'Michael Chen',
    time: '10:00 AM',
    duration: '2 hours',
    notes: 'Professional inspector scheduled',
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'showing':
      return '👀'
    case 'meeting':
      return '💼'
    case 'inspection':
      return '🔍'
    case 'closing':
      return '✅'
    default:
      return '📅'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'showing':
      return 'text-info bg-info/10 border-info/20'
    case 'meeting':
      return 'text-accent bg-accent/10 border-accent/20'
    case 'inspection':
      return 'text-warning bg-warning/10 border-warning/20'
    case 'closing':
      return 'text-success bg-success/10 border-success/20'
    default:
      return 'text-text-secondary'
  }
}

export default function AgentCalendarPage() {
  const [selectedDate, setSelectedDate] = useState('2024-07-13')

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-display font-light text-text">Calendar</h1>
          <p className="text-text-secondary mt-2">{upcomingAppointments.length} appointments today</p>
        </div>
        <Button variant="primary">Schedule Appointment</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <p className="text-sm font-medium text-text mb-3">July 2024</p>
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1 text-xs text-center text-text-secondary mb-2">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(`2024-07-${String(i + 1).padStart(2, '0')}`)}
                        className={`aspect-square text-xs rounded flex items-center justify-center transition-colors ${
                          `2024-07-${String(i + 1).padStart(2, '0')}` === selectedDate
                            ? 'bg-accent text-white font-medium'
                            : 'hover:bg-primary-dark'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-text mb-3">Legend</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-info">👀</span>
                    <span className="text-text-secondary">Showing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span className="text-text-secondary">Meeting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔍</span>
                    <span className="text-text-secondary">Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✅</span>
                    <span className="text-text-secondary">Closing</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Saturday, July 13, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <div className="text-2xl flex-shrink-0">{getTypeIcon(appointment.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-text">{appointment.title}</h4>
                        <p className="text-sm text-text-secondary mt-1">{appointment.property}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getTypeColor(
                          appointment.type
                        )}`}
                      >
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs text-text-secondary mt-2">
                      <div>
                        <span className="font-medium text-text">{appointment.time}</span>
                      </div>
                      <div>
                        {appointment.client}
                      </div>
                      <div>
                        {appointment.duration}
                      </div>
                    </div>

                    <p className="text-xs text-text-secondary mt-2">{appointment.notes}</p>
                  </div>

                  <Button variant="ghost" className="text-xs h-8 flex-shrink-0">
                    Edit
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-2">Showings</p>
                  <p className="text-h5 font-light text-text">3</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">Meetings</p>
                  <p className="text-h5 font-light text-text">2</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">Inspections</p>
                  <p className="text-h5 font-light text-text">1</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">Closings</p>
                  <p className="text-h5 font-light text-accent">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
