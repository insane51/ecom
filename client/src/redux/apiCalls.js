// import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest } from "../requestMethods";

// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };

import { publicRequest,
    //  userRequest 
    } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login',user);
        dispatch(loginSuccess(res.data));

    }catch{
        dispatch(loginFailure)
    }
}

export const register = async (user)=>{
    try{
        const res =await publicRequest.post('/auth/register',user);
        console.log(res);

    }catch(err){
        console.log(err);
    }
}
