import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  providers: [],
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  dialogRef:MdDialogRef<SelectedHeroDialog>;
	constructor(
		private heroService:HeroService,
		private router:Router,
    private dialog:MdDialog 
	){}

  selectedHero:Hero;
  heroes:Hero[];

  onSelect(hero:Hero):void {
    this.dialogRef = this.dialog.open(SelectedHeroDialog);
    this.dialogRef.componentInstance.selectedHero = hero;
  	//this.selectedHero = hero;
  }
  getHeroes():void {
  	this.heroService.getHeroesSlowly().then(heroes => {this.heroes = heroes});
  }
  ngOnInit():void {
  	this.getHeroes();
  }
  gotoDetail():void {
  	this.router.navigate(['./detail', this.selectedHero.id])
  }
  add(name:string):void {
    name = name.trim();
    if(!name) {return;}
    this.heroService.create(name)
      .then(hero => {
        console.log('new hero', hero)
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero:Hero):void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero === hero) this.selectedHero = null;
      })
  }
}

@Component({
  selector: 'selected-hero-dialog',
  template:`
    <h2>{{selectedHero.name | uppercase }}</h2>
    <button md-raised-button color='primary' (click)="gotoDetail()">View Details</button>
    <button md-raised-button color='warn' (click)="dialogRef.close()">Close</button>    
  `
})
export class SelectedHeroDialog {
  selectedHero:any
  constructor(
    public dialogRef:MdDialogRef<SelectedHeroDialog>,
    private router:Router
  ){}
  gotoDetail(){
    this.dialogRef.close();
    this.router.navigate(['/detail',this.selectedHero.id]);
  }
}
