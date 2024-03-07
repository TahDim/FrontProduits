import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html'
})
export class UpdateCategorieComponent implements OnInit {

  @Input()
  categorie! : Categorie; // Pour recevoir les catégories vient de liste-categories.component

  @Input()
  ajout! : boolean;

  @Output()
  ajoutRep = new EventEmitter<boolean>();

  @Output()
  categorieUpdated = new EventEmitter<Categorie>(); // Pour envoyer les catégories

  constructor(private route : Router) {}

  ngOnInit(): void {}

  saveCategorie() {
    this.categorieUpdated.emit(this.categorie);
    this.ajout = true;
    this.ajoutRep.emit(this.ajout);
    this.categorie.nomCat = "";
  }

  actualiser() {
    /* this.ajout = true;
    this.ajoutRep.emit(this.ajout); */
    this.saveCategorie();
    /* this.categorie.idCat = 0;
    this.categorie.nomCat = ""; */
  }

}
