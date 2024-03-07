import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit{

  produits!: Produit[]; // Un tableau de Produit

  constructor(private produitService : ProduitService, protected authService : AuthService) {
  }

  ngOnInit(): void {
    // this.produits = this.produitService.listeProduits();
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.listeProduits().subscribe(prods => {
      //console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(prod : Produit) {
    let conf = confirm("Êtes-vous sûr ?");
    if(conf) {
      this.produitService.supprimerProduit(prod.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      });
    }
  }

}
