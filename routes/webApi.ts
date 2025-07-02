import {Router} from 'express';

const webApi : Router = Router();

webApi.use('/',(req,res)=>{
    res.send('API WORKING');
});

export default webApi;