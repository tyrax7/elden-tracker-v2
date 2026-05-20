import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Boss } from '../../models/boss.model';

@Component({
  selector: 'app-boss-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './boss-list.component.html',
  styleUrls: ['./boss-list.css']
})
export class BossListComponent implements OnInit {
  bosses: Boss[] = [];
  filteredBosses: Boss[] = [];
  searchTerm: string = '';
  selectedRegion: string = '';
  killedBossesIds: string[] = [];

  private route = inject(ActivatedRoute);

  regions = [
    { label: 'Tout afficher',    value: '' },
    { label: 'Nécrolimbe',       value: 'Limgrave' },
    { label: 'Liurnia',          value: 'Liurnia of the Lakes' },
    { label: 'Caelid',           value: 'Caelid' },
    { label: 'Manoir du Volcan', value: 'Mount Gelmir' },
    { label: 'Plateau Altus',    value: 'Altus Plateau' },
    { label: 'Leyndell',         value: 'Leyndell, Royal Capital' },
    { label: 'Cime des Géants',  value: 'Mountaintops of the Giants' },
    { label: 'Haligtree',        value: 'Consecrated Snowfield' },
    { label: 'Farum Azula',      value: 'Crumbling Farum Azula' },
    { label: 'Siofra / Ainsel',  value: 'Siofra River' },
    { label: 'Nokron',           value: 'Nokron, Eternal City' },
    { label: 'Profondeurs',      value: 'Deeproot Depths' },
    { label: 'Lac souterrain',   value: 'Lake of Rot' },
  ];

  get killedInFilter(): number {
    return this.filteredBosses.filter(b => b.isKilled).length;
  }

  ngOnInit() {
    this.loadKilledBosses();

    // Les données arrivent du resolver, déjà prêtes
    const resolved: Boss[] = this.route.snapshot.data['bosses'];
    this.bosses = resolved.map(boss => ({
      ...boss,
      isKilled: this.killedBossesIds.includes(boss.id)
    }));
    this.filteredBosses = this.bosses;
  }

  onSearch() { this.applyFilters(); }

  toggleKilled(boss: Boss) {
    boss.isKilled = !boss.isKilled;
    if (boss.isKilled) {
      this.killedBossesIds.push(boss.id);
    } else {
      this.killedBossesIds = this.killedBossesIds.filter(id => id !== boss.id);
    }
    this.saveKilledBosses();
  }

  filterByRegion(region: string) {
    this.selectedRegion = region;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBosses = this.bosses.filter(boss => {
      const matchSearch = boss.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRegion = this.selectedRegion === '' || boss.region === this.selectedRegion;
      return matchSearch && matchRegion;
    });
  }

  private saveKilledBosses() {
    localStorage.setItem('elden-tracker-kills', JSON.stringify(this.killedBossesIds));
  }

  private loadKilledBosses() {
    const saved = localStorage.getItem('elden-tracker-kills');
    if (saved) {
      this.killedBossesIds = JSON.parse(saved);
    }
  }
}