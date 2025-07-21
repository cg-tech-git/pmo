'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { getSubmissionsByDate, ManpowerSubmission } from '@/lib/submissionStorage'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ManpowerAllocationCalendar() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [submissions, setSubmissions] = useState<Record<string, ManpowerSubmission[]>>({})

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay() // 0 = Sunday, 1 = Monday, etc.
  const daysInMonth = lastDayOfMonth.getDate()

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Load submissions for current month
  useEffect(() => {
    const loadSubmissions = () => {
      const submissionsByDate: Record<string, ManpowerSubmission[]> = {}
      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
      
      for (let day = 1; day <= daysInCurrentMonth; day++) {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        const daySubmissions = getSubmissionsByDate(dateString)
        if (daySubmissions.length > 0) {
          submissionsByDate[dateString] = daySubmissions
        }
      }
      
      setSubmissions(submissionsByDate)
    }
    
    loadSubmissions()
  }, [currentMonth, currentYear])



  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>
      )
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth && 
                     new Date().getFullYear() === currentYear

      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const daySubmissions = submissions[dateString] || []

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer transition-colors ${
            isToday ? 'bg-primary-50 border-primary-200' : 'bg-white'
          }`}
        >
          <div className={`font-medium text-sm ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
            {day}
          </div>
                           {/* See Details Button */}
                 {daySubmissions.length > 0 && (
                   <div className="mt-2">
                     <button
                       onClick={() => router.push(`/resources/manpower-allocation/calendar/details?date=${dateString}`)}
                       className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs hover:bg-gray-200 hover:text-gray-600 transition-colors w-full flex items-center justify-center gap-1"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                         <path fill="currentColor" d="M21,20h-1V3c0-0.6-0.4-1-1-1H5C4.4,2,4,2.4,4,3v17H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,20,21,20z M9,6h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9C8.4,8,8,7.6,8,7S8.4,6,9,6z M8,11c0-0.6,0.4-1,1-1h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9C8.4,12,8,11.6,8,11z M15,20H9v-5c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V20z M15,12h-1c-0.6,0-1-0.4-1-1s0.4-1,1-1h1c0.6,0,1,0.4,1,1S15.6,12,15,12z M15,8h-1c-0.6,0-1-0.4-1-1s0.4-1,1-1h1c0.6,0,1,0.4,1,1S15.6,8,15,8z"></path>
                       </svg>
                       See Projects ({daySubmissions.length})
                     </button>
                   </div>
                 )}
        </div>
      )
    }

    return days
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Manpower Allocation
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Manpower Allocation Calendar</h1>
            <p className="text-gray-600">
              View and manage manpower allocation schedules across different dates.
            </p>
          </div>

          {/* Calendar Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center h-9 w-9"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center h-9 leading-none relative" style={{top: '10px'}}>
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center h-9 w-9"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => router.push('/resources/manpower-allocation')}
                className="bg-primary-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-gray-200 hover:text-gray-600 transition-colors group cursor-pointer"
              >
                <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                  <path className="group-hover:fill-gray-600" d="M19,10.5v-1c0-2.8-1.6-5.2-4-6.3v3.3c0,0.6-0.5,1-1,1s-1-0.4-1-1V2.6c-0.4-0.1-0.8-0.1-1.2-0.1c-0.3,0-0.5,0-0.8,0.1v3.9c0,0.6-0.5,1-1,1s-1-0.4-1-1V3.2C6.6,4.4,5,7,5,9.8v0.7c-0.5,0-1,0.2-1.4,0.6C3.2,11.5,3,12,3,12.5c0,1.1,0.9,2,2,2h0c0,3.9,3.2,7.1,7.2,7c3.7-0.1,6.6-3.3,6.8-7h0c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4C21,11.4,20.1,10.5,19,10.5z M12.1,19.5c-2.8,0.1-5.2-2.2-5.2-5h10C16.9,17.2,14.8,19.4,12.1,19.5z"></path>
                </svg>
                Back to Allocation
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 border border-gray-200">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-0">
                {generateCalendarDays()}
              </div>
            </div>

            {/* Calendar Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-center">
                <div className="text-sm text-gray-500">
                  Click on any date to view or add allocations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 