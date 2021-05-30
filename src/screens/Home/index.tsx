import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { SearchBar } from "../../components/SearchBar";
import { LoginDataItem } from "../../components/LoginDataItem";

import { useStorageData } from "../../hooks/useStorageData";
import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage,
} from "./styles";
import { TouchableOpacity } from "react-native";

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

export type LoginListDataProps = LoginDataProps[];

export function Home() {
  const { searchListData, loadData, handleFilterLoginData, removeItem } =
    useStorageData();
  // const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  // const [data, setData] = useState<LoginListDataProps>([]);

  // async function loadData() {
  //   // Get asyncStorage data, use setSearchListData and setData

  //   const dataKey = "@passmanager:logins";
  //   const response = await AsyncStorage.getItem(dataKey);
  //   const getData = response ? JSON.parse(response) : [];

  //   setSearchListData(getData);
  //   setData(getData);
  // }
  function handleRemoveItem(id: string) {
    removeItem(id);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        }
        renderItem={({ item: loginData }) => {
          return (
            <TouchableOpacity onLongPress={() => handleRemoveItem(loginData.id)}>
              <LoginDataItem
                title={loginData.title}
                email={loginData.email}
                password={loginData.password}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Container>
  );
}
