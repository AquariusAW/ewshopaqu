
//1.引入axios依赖包
import axios from 'axios';

//2.axios创建对象
const request = axios.create({
    baseURL:"https://api.shop.eduwork.cn", //接口的基地址
    timeout: 8000,  //超时时间
})

const win:any = window;

//3.定义请求拦截器，请求发出之前触发的
request.interceptors.request.use((config)=>{

    //1.获取token
    const token = localStorage.getItem("token");
    //2.判断token 是否存在
    if(token) {
        //3.如果存在，把token添加到请求头中
        config.headers!.Authorization = `Bearer ${token}`;
    }
    //console.log(config)
    //config:接口请求的配置信息(包含当前的请求信息)
    return config;

},(error)=>{
    //报错的时候抛出一个报错信息
    return Promise.reject(error)
})

//4.定义响应拦截器，响应之前触发的
request.interceptors.response.use((response)=>{

    //响应回来的数据操作
    return response.data;

},(error)=>{
    //报错的时候抛出一个报错信息
    return Promise.reject(error)
})

//对外共享数据
export default request
