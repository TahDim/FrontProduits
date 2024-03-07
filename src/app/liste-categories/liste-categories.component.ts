import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html'
})
export class ListeCategoriesComponent implements OnInit {

  categories! : Categorie[];

  updatedCat : Categorie = { "idCat":0, "nomCat":"" };

  ajout: boolean = true;

  constructor(private produitService : ProduitService, protected authService : AuthService) {}

  ngOnInit(): void {
    this.chargerCategories();
    this.ajout = true;
    console.log("Liste oninit", this.ajout)
  }

  categorieUpdated(cat : Categorie) {
    console.log("Categorie reçue du composant updateCategorie ", cat);
    this.produitService.ajouterCategorie(cat).subscribe(
      () => this.chargerCategories()
    );
  }

  chargerCategories() {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  updateCat(cat : Categorie) {
    this.updatedCat = cat;
    this.ajout = false;
    console.log("Liste update ", this.ajout);
  }

  ajoutRep(aj : boolean) {
    this.ajout = aj;
  }

  supprimerCat(id : number) {
    let conf = confirm("Êtes-vous sûr ?");
    if(conf) {
      this.produitService.supprimerCategorie(id).subscribe(() => {
        this.chargerCategories();
      });
    }
  }
}
