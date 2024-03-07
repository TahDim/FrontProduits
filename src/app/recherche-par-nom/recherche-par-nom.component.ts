import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  
  nomProduit! : string;
  produits! : Produit[];
  allProduits! : Produit[];
  searchTerm! : string;

  constructor(private produitService : ProduitService) {}

  ngOnInit(): void {
    this.produitService.listeProduits().subscribe(prods => {
      this.produits = prods;
    });
  }

  onKeyUp(filterText : string) {
    this.produits = this.allProduits.filter(item => item.nomProduit.toLowerCase().includes(filterText.toLowerCase()));
  }

  rechercherProds() {
    if(this.nomProduit) {
      this.produitService.rechercheParNom(this.nomProduit).subscribe(prods => {
        this.produits = prods;
        console.log(prods);
        this.nomProduit = "";
      });
    }
  }

}
