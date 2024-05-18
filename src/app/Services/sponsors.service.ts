import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private readonly myClient:HttpClient) { }

  private readonly sponsorsAPI = "https://gateway.abnaey.com/api/v1/billing/sponsors";
  private readonly officersAPI = "https://gateway.abnaey.com/api/v1/billing/sponsor-contact-officers";
  private readonly token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDk2ZDcwMTFkOTYxYTJmZGE5YTFmZmFlMzBmZWY4YjBjODFkM2VhYTI4MGYwNjFjNDYwNDgyMWYyMTYzYmE3NWQ1MDE0ODBhMzYyOGQ2NmUiLCJpYXQiOjE3MTA4MDY1ODMuNTQzOTA0LCJuYmYiOjE3MTA4MDY1ODMuNTQzOTA2LCJleHAiOjE3NDIzNDI1ODMuNTM1MTE2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.oP7QVMkmhJwcWTTCnhQhLnL972Zhkd-OLh2RitSwhiqspebHo-2X1fSNs2zxwUwtJqC2xQRiamA5vcSF2CcKsAxbWwx86ELpCAUCFeApgu93mSdp50aEK-At5RgYZa1H0H9IT5L-eRqBJ5I9UkcZF9TkSU22aRbjIWsIZEZOft4nfkYopMC1YXWiG9kxgqEOF7mZ144M-XWvywnQ94VYj2-7rscYI9rXPpOzqhO7zqpW2uoBtp5fUyiHJ49aH5ZFBvF6n-OVnfLis3rPYoO8IOkCUP2q3Ig1WZGIDwumOfeUamTEOe-rH9ICg0nkSFFGYw_CLC5k7Eb5vc4JmAG0nFsbJOnDKVIrbFVg9StZ3chx-K8lVc3VrGUflf-R_hfKxHtk03xqunqfePdlzH2kWg9oPwCIXz-mUa8kr6SypMw6cb3kQHEzNzzQp5o3aK8iuNpwKXTvMjz0Z4o81qwIqwHBiraaEwk7gtVuf4-Of1ndKLph5KLUf5xNNJW4A8_wC8OWzvRWpmW4EkV4Kb-0NKMEI6da1--xHBl6QCV7_cL0OfokZ08_jlJs64662FP8lcE_pZ1Y0DsaCF7B5SY8qriF3EWvwzTtKbbP492mW-Ma0BTQM1aMuBnS4t7dDXtaQUTDY9YUrUhAx9aaJeQFcbFSvyFFejL1puO8Na-3skU'; // Replace with your actual token

  GetAllSponsors(){

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.get<any>(this.sponsorsAPI, { headers });
  }

  GetSponsorById(id:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.get(this.sponsorsAPI+"/"+id, {headers});
  }

  GetAllOfficers(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.get(this.officersAPI, {headers});
  }

  GetOfficerById(id:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.get(this.officersAPI+"/"+id, {headers});
  }

  AddSponsor(newUser:any): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.post(this.sponsorsAPI, newUser, {headers});
  }

  AddOfficer(newUser:any): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.post(this.officersAPI, newUser, {headers});
  }

  UpdateSponsor(updatedUser:any, id:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    //return this.myClient.put(this.sponsorsAPI+"/"+id, updatedUser, {headers})
     return this.myClient.put(this.sponsorsAPI+"/"+id+"?_method=put", updatedUser, {headers})
  }

  UpdateOfficer(updatedUser:any, id:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.put(this.officersAPI+"/"+id, updatedUser, {headers})
    // return this.myClient.post(this.officersAPI+"/"+id+"?_method=put", updatedUser)
  }

  deleteSponsor(id:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.delete(this.sponsorsAPI+"/"+id, {headers});
  }

  deleteOfficer(id:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.myClient.delete(this.officersAPI+"/"+id, {headers});
  }
}
