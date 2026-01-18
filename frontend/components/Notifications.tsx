'use client'

import { useState } from 'react'

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      title: 'New article published',
      message: 'Your article has been published',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'New comment',
      message: 'Someone commented on your article',
      time: '5 hours ago',
      read: false
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center rounded-lg size-10 bg-gray-100 dark:bg-surface-dark text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-opacity-80 transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg">Notifications</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                      !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <h4 className="font-bold text-sm mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
