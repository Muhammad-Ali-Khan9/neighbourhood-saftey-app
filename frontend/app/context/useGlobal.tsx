import { User } from "@/utils/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface GlobalContextType {
  userData: User | null;
  selectedCoordinates: Location | null;
  setSelectedCoordinates: React.Dispatch<React.SetStateAction<Location | null>>;
  setUserData: React.Dispatch<User>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<null | User>(null);
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Location | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        selectedCoordinates,
        setSelectedCoordinates,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }

  return context;
}
