"use client";

import { useState } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: Date;
}

// Dummy data dulu sampai backend siap
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "Siklus Tanam Dimulai",
    message: "Siklus tanam padi di Lahan A telah berhasil dimulai.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    title: "Rekomendasi AI",
    message: "AI merekomendasikan pengairan tambahan untuk Lahan B hari ini.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    title: "Aktivitas Harian",
    message: "Jangan lupa mencatat aktivitas harian untuk Lahan C.",
    type: "warning",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "4",
    title: "Panen Siap",
    message: "Lahan D diprediksi siap panen dalam 3 hari ke depan.",
    type: "success",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "5",
    title: "Peringatan Cuaca",
    message: "Prakiraan hujan lebat untuk wilayah Anda besok.",
    type: "warning",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const useNotification = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
};
