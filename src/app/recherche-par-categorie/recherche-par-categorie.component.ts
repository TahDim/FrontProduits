import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html'
})
export class RechercheParCategorieComponent implements OnInit {
  
  categories! : Categorie[];
  produits! : Produit[];
  idCategorie! : number;

  constructor(private produitService : ProduitService) {
  }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    });
  }

  onChange() {
    this.produitService.rechercheParCategorie(this.idCategorie).subscribe(prods => {
      this.produits = prods;
    });
  }

}
