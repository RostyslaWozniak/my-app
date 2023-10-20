import axios from "axios";

const baseURL = "https://my-app-server-restaurant-a53f20a37c72.herokuapp.com/api/";

export default axios.create({
    baseURL,
})