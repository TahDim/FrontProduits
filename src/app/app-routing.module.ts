import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { loginGuard, produitGuard } from './produit.guard';

const routes: Routes = [
  { path : "produits", component : ProduitsComponent, canActivate : [loginGuard] },
  { path : "add-produit", component : AddProduitComponent, canActivate : [produitGuard] },
  { path : "updateProduit/:id", component : UpdateProduitComponent, canActivate : [produitGuard] },
  { path : "rechercheParCategorie", component : RechercheParCategorieComponent, canActivate : [loginGuard] },
  { path : "rechercheParNom", component : RechercheParNomComponent, canActivate : [loginGuard] },
  { path : "listeCategories", component : ListeCategoriesComponent, canActivate : [loginGuard] },
  { path : "login", component : LoginComponent },
  { path : "app-forbidden", component : ForbiddenComponent },
  { path : "", redirectTo : "produits", pathMatch : "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
