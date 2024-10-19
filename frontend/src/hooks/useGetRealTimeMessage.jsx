import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage); // Debugging log
      dispatch(setMessages([...messages, newMessage]));
    };

    if (socket) {
      console.log("Socket connected:", socket); // Debugging log
      socket.on("newMessage", handleNewMessage);
    }

    // Cleanup event listener on unmount or when socket changes
    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, messages, dispatch]);

};

export default useGetRealTimeMessage;
