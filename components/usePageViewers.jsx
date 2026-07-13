"use client";

import { useEffect, useState } from "react";
import { socket } from "./socket";



const usePageViewers = (page) => {
    const [viewerCount, setViewerCount] = useState(0);
  const [connected, setConnected] = useState(false);

  

  useEffect(() => {
 if (!page) return;
 const handleConnect = () => {
      setConnected(true);
      socket.emit("join-page", page);
    };
     const handleDisconnect = () => {
      setConnected(false);
    };
  const handleViewerCount = (data) => {
      if (data.page === page) {
        setViewerCount(data.count);
      }
    };
socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("page-viewer-count", handleViewerCount);
     if (!socket.connected) {
      socket.connect();
    } else {
      handleConnect();
    }
        return () => {
      socket.emit("leave-page", page);

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("page-viewer-count", handleViewerCount);
    };

  },[page])

 return {
    viewerCount,
    connected,
  };
}

export default usePageViewers