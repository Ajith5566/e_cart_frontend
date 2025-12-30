import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


//register a user
export const registerApi =async (reqBody:unknown)=>{
    return await commonApi('POST',`${BASE_URL}/user/register`,reqBody)
}

//request to login 
export const loginApi=async(reqBody:unknown)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,reqBody)
}

//admin login
export const adminloginAPi=async(reqBody:unknown)=>{
    return await commonApi('POST',`${BASE_URL}/admin/login`,reqBody)
}

//add product

export const AddproductApi = async <T = unknown>(reqBody: unknown,reqHeader?: Record<string, string>) => {
  return await commonApi<T>("POST", `${BASE_URL}/add-product`, reqBody, reqHeader);
};