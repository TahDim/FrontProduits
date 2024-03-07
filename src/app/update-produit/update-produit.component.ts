import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();
  categories! : Categorie[];
  updateCatId! : number;

  constructor(private activateRoute : ActivatedRoute ,private produitService : ProduitService, private route : Router) {}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    });
    this.produitService.consulterProduit(this.activateRoute.snapshot.params['id']).subscribe(prod => {
      this.currentProduit = prod;
      this.updateCatId = this.currentProduit.categorie.idCat;
    });
  }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updateCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.route.navigate(['produits']);
    });
  }

}
