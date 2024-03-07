import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from '../model/categorie.model';
import { apiURL } from '../config';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers : new HttpHeaders( {'Content-type' : 'application/json'} )
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiURLCat : string = 'http://localhost:8080/produits/cat';

  produits!: Produit[]; // Un tableau de Produit
  // categories!: Categorie[];
  
  constructor(private http : HttpClient, private authService : AuthService) {
    /* this.categories = [
      { idCat : 1, nomCat : "PC" },
      { idCat : 2, nomCat : "Imprimante" }
    ]; */

    /* this.produits = [
      { idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"), categorie : { idCat : 1, nomCat : "PC" } },
      { idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"), categorie : { idCat : 2, nomCat : "Imprimante" } },
      { idProduit : 3, nomProduit : "Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"), categorie : { idCat : 1, nomCat : "PC" } }
    ]; */
  }

  listeProduits() : Observable<Produit[]> {
    /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}); */
    return this.http.get<Produit[]>(apiURL+"/all"/* , {headers:httpHeaders} */);
  }

  ajouterProduit(prod : Produit) : Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.post<Produit>(apiURL, prod, {headers:httpHeaders});
  }

  supprimerProduit(id: number){
    const url = `${apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.delete(url, {headers: httpHeaders});
  }

  consulterProduit(id : number) : Observable<Produit> {
    const url = `${apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Produit>(url, {headers: httpHeaders});
  }
 
  updateProduit(p : Produit) : Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.put<Produit>(apiURL, p, {headers: httpHeaders});
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if(n1.idProduit > n2.idProduit) {
        return 1;
      }
      if(n1.idProduit < n2.idProduit) {
        return -1;
      }
      return 0;
    });
  }

  /* listeCategories() : Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURL+"/cat");
  } */

  listeCategories() : Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<CategorieWrapper>(this.apiURLCat, {headers:httpHeaders});
  }

  consulterCategorie(id : number) : Observable<Categorie> {
    const url = `${apiURL}/cat/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Categorie>(url, {headers:httpHeaders});
  }

  rechercheParCategorie(idCat : number) : Observable<Produit[]> {
    const url = `${apiURL}/prodscat/${idCat}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Produit[]>(url, {headers:httpHeaders});
  }

  rechercheParNom(nom : string) : Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Produit[]>(url, {headers:httpHeaders});
  }

  ajouterCategorie(cat : Categorie) : Observable<Categorie> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.post<Categorie>(this.apiURLCat, cat, {headers:httpHeaders});
  }

  supprimerCategorie(id : number) {
    const url = `${apiURL}/cat/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.delete(url, {headers:httpHeaders});
  } 
}