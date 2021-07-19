import React from "react";
import { useRouter } from "next/router";
import nookies from 'nookies'

export default async function logoutPage(context){
    ///console.log("Context",context);
    const COOKIES = nookies.destroy(context, "USER_TOKEN");
    
    console.log(COOKIES);
    const route = useRouter();
    route.push("/login");
    
    return(<div></div>);
}