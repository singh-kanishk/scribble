import { Header } from './ui/Header';
import { Canvas } from './ui/Canvas';
import { Players } from './ui/Players';
import { ChatBox } from './ui/ChatBox';

export function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* left side: canvas + players */}
        <div className="flex flex-col w-2/3 h-full">
          <div className="flex-1 border-b border-border">
            <Canvas />
          </div>
          <div className="flex-1 h-1/3">
            <Players />
          </div>
        </div>
        <div className="w-1/3 border-l border-border">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
