import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";


@WebSocketGateway({cors: {
    origin: ['https://codetog.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true,
}})
export class CodeGateway {
    private dataObj: Record<string, any> = {};
    @SubscribeMessage('join-room')
    handleJoinRoom(@MessageBody() roomId: string, @ConnectedSocket() socket: Socket): void {
        console.log('join room', roomId);
        socket.join(roomId);
        socket.data.chatRoom = roomId;

        if (this.dataObj[roomId]) {
            socket.emit('retrieve-data', this.dataObj[roomId]);
        }
    console.log(socket.data)

    }

    @SubscribeMessage('leave-room')
    handleLeaveRoom (@MessageBody() roomId: string, @ConnectedSocket() socket: Socket): void {
        console.log('leave room', roomId);
        socket.leave(roomId);
        delete socket.data.chatRoom
    console.log(socket.data)

    }

    @SubscribeMessage('code-typed')
    handleCodeTyped(@MessageBody() data: any, @ConnectedSocket() socket: Socket): void {
        const roomId = socket.data.chatRoom;
        if (roomId) {
            socket.to(roomId).emit('code-typed', data);
            this.dataObj[roomId] = data;
        }
    }
  
}