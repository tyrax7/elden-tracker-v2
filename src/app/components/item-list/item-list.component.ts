import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Item } from '../../models/boss.model';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  foundItemIds: string[] = [];

  private route = inject(ActivatedRoute);

  // Traduction des types API → labels FR, dans un ordre logique
  private typeTranslations: Record<string, string> = {
    'Key':               'Clés',
    'Consumable':        'Consommables',
    'Reusable':          'Réutilisables',
    'Crafting Material': 'Matériaux',
    'Tool':              'Outils',
    'Info Item':         'Informations',
    'Multiplayer Item':  'Multijoueur',
    'Whetstone':         'Pierres à aiguiser',
  };

  types: { label: string; value: string }[] = [];

  get foundInFilter(): number {
    return this.filteredItems.filter(i => i.isFound).length;
  }

  ngOnInit() {
    this.loadFoundItems();

    const resolved: Item[] = this.route.snapshot.data['items'];
    this.items = resolved.map(item => ({
      ...item,
      isFound: this.foundItemIds.includes(item.id)
    }));

    // Construit les filtres dans l'ordre défini, uniquement les types présents dans les données
    const presentTypes = new Set(this.items.map(i => i.type).filter(Boolean));
    const orderedTypes = Object.keys(this.typeTranslations).filter(t => presentTypes.has(t));
    // Types non mappés à la fin
    const unmapped = [...presentTypes].filter(t => !this.typeTranslations[t]).sort();

    this.types = [
      { label: 'Tout afficher', value: '' },
      ...orderedTypes.map(t => ({ label: this.typeTranslations[t], value: t })),
      ...unmapped.map(t => ({ label: t, value: t })),
    ];

    this.filteredItems = this.items;
  }

  onSearch() { this.applyFilters(); }

  toggleFound(item: Item) {
    item.isFound = !item.isFound;
    if (item.isFound) {
      this.foundItemIds.push(item.id);
    } else {
      this.foundItemIds = this.foundItemIds.filter(id => id !== item.id);
    }
    this.saveFoundItems();
  }

  filterByType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.selectedType === '' || item.type === this.selectedType;
      return matchSearch && matchType;
    });
  }

  private saveFoundItems() {
    localStorage.setItem('elden-tracker-items', JSON.stringify(this.foundItemIds));
  }

  private loadFoundItems() {
    const saved = localStorage.getItem('elden-tracker-items');
    if (saved) {
      this.foundItemIds = JSON.parse(saved);
    }
  }
}