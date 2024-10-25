import { Server, Socket } from 'socket.io';
export declare class NotificationsGateway {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendNotification(userId: string, notification: any): void;
    handleJoinRoom(userId: string, client: Socket): void;
}
