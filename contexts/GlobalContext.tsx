"use client";

import { createContext, useState, useEffect } from "react";
import { EmailAuthCredential, User, onAuthStateChanged } from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/lib/firebase/firebase";

export const GlobalContext = createContext<any>({});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [data, setData] = useState<EmailAuthCredential | null>();
  const [msg, setMsg] = useState({ status: "", title: "", message: "" });
  const queryClient = useQueryClient();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        queryClient.setQueryData(["user"], user);
      } else {
        setUser(null);
      }
    });
  }, [queryClient]);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, msg, setMsg, data, setData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
