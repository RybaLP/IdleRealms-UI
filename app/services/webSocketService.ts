import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const getSocketClient = (onConnect: () => void, userId: string) => {
    const url = process.env.NEXT_PUBLIC_WSCONNECTION;
    if (!url) throw new Error("WS URL not defined!");

    const client = new Client({
        webSocketFactory: () => new SockJS(url),
        debug: (str) => {
            if (process.env.NODE_ENV !== 'production') console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
        console.log('Connected to Spring WS for user:', userId);
        onConnect();
    };

    client.onStompError = (frame) => {
        console.error('STOMP error:', frame.headers['message']);
    };

    return client;
};