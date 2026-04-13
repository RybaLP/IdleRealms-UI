'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { getSocketClient } from '../services/webSocketService';

const SocketContext = createContext<Client | null>(null);

export const SocketProvider = ({ children, userId }: { children: React.ReactNode, userId: string }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [toast, setToast] = useState<string | null>(null); 

    useEffect(() => {

        if (!userId) return;

        const client = getSocketClient(() => {
            client.subscribe(`/topic/notifications.${userId}`, (message) => {
                const notification = JSON.parse(message.body);
                
                setToast(notification.content || "New realm event!");
                setTimeout(() => setToast(null), 5000);
            });
            
            setStompClient(client);
        }, userId);

        client.activate();

        return () => {
            if (client) client.deactivate();
        };
    }, [userId]);

    return (
        <SocketContext.Provider value={stompClient}>
            {children}

            {toast && (
                <div className="fixed top-4 right-4 z-100 animate-bounce">
                    <div className="bg-slate-900 border-2 border-amber-600 text-amber-500 px-6 py-3 shadow-2xl flex items-center gap-3">
                        <span className="text-xl">✉️</span>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-tighter opacity-70">New Scroll Received</span>
                            <p className="text-sm font-serif">{toast}</p>
                        </div>
                        <button onClick={() => setToast(null)} className="ml-4 hover:text-white">✕</button>
                    </div>
                </div>
            )}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);