import axios from "axios";

const getAvatar = async (header: any) => {    
    return await axios.get('http://localhost:8080/api/v1/user/avatar', header)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error;
        });
}

const UserService = {
    getAvatar,
};

export default UserService;