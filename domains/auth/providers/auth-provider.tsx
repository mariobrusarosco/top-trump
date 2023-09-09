"use client";
import { Member } from "@prisma/client";
import { createContext, useContext } from "react";

interface AuthenticationContextProps {
  member: Member;
}

const AuthenticationContext = createContext<
  AuthenticationContextProps | undefined
>(undefined);

export const AuthenticationProvider = ({
  children,
  member,
}: {
  children: React.ReactNode;
  member: Member;
}) => {
  const state = { member };

  return (
    <AuthenticationContext.Provider value={state}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider"
    );
  }

  return context;
};
