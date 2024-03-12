import React, { useContext, useEffect, useState } from "react";
import MainLayout2 from "../layouts/MainLayout2";
import Topbar from "./topbar/Topbar";
import Body from "./Body/Body";
import { Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import UserService from "../services/UserService";

const Home: React.FC = () => {

  const { token } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState('');
  const userService = UserService;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'arraybuffer'
  };

  useEffect(() => {
    const fetchAvatar = async () => {

      userService.getAvatar(header)
        .then(
          async res => {
            const arrayBufferView = new Uint8Array(res.data);
            const blob = new Blob([arrayBufferView], { type: 'image/jpeg', });
            const imageUrl = URL.createObjectURL(blob);
            // console.log(imageUrl);
            setImageUrl(imageUrl);
          }
        )
        .catch(
          error => {
            console.log(error);
          }
        );
    };

    fetchAvatar();
  }, []);


  return (
    <MainLayout2>      
        <Topbar imageUrl={imageUrl} />
        <Body imageUrl={imageUrl}/>
    </MainLayout2>
  );
};

export default Home;