import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BossService } from '../../services/boss.service';
import { Boss } from '../../models/boss.model';

@Component({
  selector: 'app-boss-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boss-list.component.html'
})
export class BossListComponent implements OnInit {
  bosses: Boss[] = [];
  filteredBosses: Boss[] = [];
  searchTerm: string = '';
  private bossService = inject(BossService);
  
  // Tableau pour stocker les IDs des boss vaincus
  killedBossesIds: string[] = [];

  ngOnInit() {
    this.loadKilledBosses(); // On charge tes sauvegardes

    this.bossService.getBosses().subscribe({
      next: (response) => {
        // On fusionne les données de l'API avec ta sauvegarde
        this.bosses = response.data.map(boss => ({
          ...boss,
          isKilled: this.killedBossesIds.includes(boss.id)
        }));
        this.filteredBosses = this.bosses;
      },
      error: (err) => console.error('Erreur', err)
    });
  }

  onSearch() {
    this.filteredBosses = this.bosses.filter(boss =>
      boss.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // --- NOUVELLE LOGIQUE DE TRACKING ---

  // Fonction appelée quand tu cliques sur le bouton
  toggleKilled(boss: Boss) {
    boss.isKilled = !boss.isKilled; // Inverse l'état
    
    if (boss.isKilled) {
      this.killedBossesIds.push(boss.id); // Ajoute à la liste des morts
    } else {
      this.killedBossesIds = this.killedBossesIds.filter(id => id !== boss.id); // Retire de la liste
    }
    
    this.saveKilledBosses(); // Sauvegarde dans le navigateur
  }

  // Sauvegarde locale
  private saveKilledBosses() {
    localStorage.setItem('elden-tracker-kills', JSON.stringify(this.killedBossesIds));
  }

  // Récupération locale
  private loadKilledBosses() {
    const saved = localStorage.getItem('elden-tracker-kills');
    if (saved) {
      this.killedBossesIds = JSON.parse(saved);
    }
  }
}