import { Component } from '@angular/core';

@Component({
  selector: 'av-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'K03Artikelverwaltung';

  routerLinks = [
    { path: '', label: "Artikelliste" },
    { path: 'new-item', label: "Neuer Artikel" },
    { path: 'delete-all', label: "Alle Artikel löschen" },
    { path: 'generate', label: "Alle Artikel neu anlegen" }
  ];
}
