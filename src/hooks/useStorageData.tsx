import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginListDataProps } from "../screens/Home";
import uuid from "react-native-uuid";

interface StorageProviderData {
  children: ReactNode;
}

interface FormData {
  title: string;
  email: string;
  password: string;
}

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface StorageContextData {
  searchListData: LoginDataProps[];
  loadData(): Promise<void>;
  handleFilterLoginData(search: string): void;
  addPassword(formData: FormData): Promise<void>;
  removeItem(id: string): Promise<void>
}

export const StorageContext = createContext({} as StorageContextData);

export function StorageProvider({ children }: StorageProviderData) {
  const dataKey = "@passmanager:logins";
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  async function loadData() {
    // Get asyncStorage data, use setSearchListData and setData
    const response = await AsyncStorage.getItem(dataKey);
    if (response) {
      setSearchListData([...JSON.parse(response)]);
      setData([...JSON.parse(response)]);
    }
  }

  function handleFilterLoginData(search: string) {
    // Filter results inside data, save with setSearchListData
    const titleFiltered = data.filter((item) => item.title.includes(search));
    setSearchListData(titleFiltered);
  }

  async function addPassword(formData: FormData) {
    const newLoginData = {
      id: String(uuid.v4()),
      ...formData,
    };

    const response = await AsyncStorage.getItem(dataKey);
    const currentData = response ? JSON.parse(response) : [];

    const newData = [...currentData, newLoginData];

    await AsyncStorage.setItem(dataKey, JSON.stringify(newData));
    loadData();
  }

  async function removeItem(id: string) {
    const removeItem = data.filter((item) => item.id !== id);

    setData(removeItem);
    await AsyncStorage.setItem(dataKey, JSON.stringify(removeItem));
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <StorageContext.Provider
      value={{ searchListData, loadData, handleFilterLoginData, addPassword, removeItem }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorageData() {
  const context = useContext(StorageContext);
  return context;
}
