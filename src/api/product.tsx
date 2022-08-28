import axios from "axios";

export default axios.create({
  baseURL:
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/",
});
