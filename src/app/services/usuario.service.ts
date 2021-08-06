import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import {  map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/Usuario';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 public  usuario: Usuario;

  constructor(private http:HttpClient) { 
    
  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/auth/renew`, { headers: { 'x-token': token } }).pipe(
      map((resp: any) => {
        
        const { nombre, username, correo, id_rol, password,id, } = resp.usuario;
        this.usuario = new Usuario(nombre, username, correo,password,  id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role',id_rol)
     return true;
      }),
   
      catchError(error => of(false)
      )
    )
  }
}