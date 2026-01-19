import { fetchedProducts, User } from "../types/types";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


export type PagePayload = {
  title: string;
  shortDescription: string;
  description: string;
};

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

//product list admin

export const getAllProductsApi = async () => {
  return await commonApi<fetchedProducts[]>("GET",`${BASE_URL}/admin/products`);
};

//product delete

export const deleteProductApi = (id: string, token: string) => {
  return commonApi("DELETE",`${BASE_URL}/admin/product/${id}`,"",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

//product update api
export const updateProductApi=(id: string, data: FormData, token:string)=>{
  return commonApi("PUT",`${BASE_URL}/admin/productUpdate/${id}`,data,
    {
    Authorization: `Bearer ${token}`,
  }
  );
}

//get user list for admin dashboard

export const getAllusersApi = async () => {
  return await commonApi<User[]>("GET",`${BASE_URL}/admin/dash/users`);

};

//block user
export const blockUserApi=(id:string,token:string)=>{
  return commonApi("PUT",`${BASE_URL}/admin/dash/blockUser/${id}`,{},
    {
      Authorization: `Bearer ${token}`,
    }
  )
}


//get product by id
export const getProductByIdApi = (id: string) => {
  return commonApi<fetchedProducts>("GET", `${BASE_URL}/productsByid/${id}`);
};



// ➕ Add new page
export const addPageApi = (
  data: PagePayload,
  token: string
) => {
  return commonApi(
    "POST",
    `${BASE_URL}/admin/pages`,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// 📄 Get all pages (admin list)
export const getAllPagesApi = (token: string) => {
  return commonApi(
    "GET",
    `${BASE_URL}/admin/pages`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✏️ Update page
export const updatePageApi = (
  id: string,
  data: PagePayload,
  token: string
) => {
  return commonApi(
    "PUT",
    `${BASE_URL}/admin/pages/${id}`,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// 🗑️ Delete page
export const deletePageApi = (
  id: string,
  token: string
) => {
  return commonApi(
    "DELETE",
    `${BASE_URL}/admin/pages/${id}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// 🔄 Toggle publish / unpublish
export const togglePageApi = (
  id: string,
  token: string
) => {
  return commonApi(
    "PUT",
    `${BASE_URL}/admin/pages/${id}/toggle`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};