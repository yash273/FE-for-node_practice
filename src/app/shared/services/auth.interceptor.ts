import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

const ExcludeURLList = [
  //links that don't need authorization 
  environment.url + "user/login",
  environment.url + "user/register",

];

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let exludeFound = ExcludeURLList.filter(element => {
    return req.url.includes(element);
  });

  const token = localStorage.getItem('token');
  if (!(exludeFound && exludeFound.length > 0)) {
    console.log("Request is on its way");

    const authReq = req.clone({
      headers: req.headers.set('authorization', `${token}`)
    })
    return next(authReq);
  }

  return next(req);

};
