import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'boosters',
        loadChildren: () =>
          import('./admin/components/boosters/boosters.module').then(
            (module) => module.BoostersModule
          ),
      },
      {
        path: 'characterlevelboosts',
        loadChildren: () =>
          import(
            './admin/components/character-level-boosts/character-level-boosts.module'
          ).then((module) => module.CharacterLevelBoostsModule),
      },
      {
        path: 'characters',
        loadChildren: () =>
          import('./admin/components/characters/characters.module').then(
            (module) => module.CharactersModule
          ),
      },
      {
        path: 'coaches',
        loadChildren: () =>
          import('./admin/components/coaches/coaches.module').then(
            (module) => module.CoachesModule
          ),
      },
      {
        path: 'companys',
        loadChildren: () =>
          import('./admin/components/companys/companys.module').then(
            (module) => module.CompanysModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ),
      },
      {
        path: 'divisions',
        loadChildren: () =>
          import('./admin/components/divisions/divisions.module').then(
            (module) => module.DivisionsModule
          ),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./admin/components/employees/employees.module').then(
            (module) => module.EmployeesModule
          ),
      },
      {
        path: 'extraoptions',
        loadChildren: () =>
          import('./admin/components/extra-options/extra-options.module').then(
            (module) => module.ExtraOptionsModule
          ),
      },
      {
        path: 'factors',
        loadChildren: () =>
          import('./admin/components/factors/factors.module').then(
            (module) => module.FactorsModule
          ),
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./admin/components/games/games.module').then(
            (module) => module.GamesModule
          ),
      },
      {
        path: 'levelboosts',
        loadChildren: () =>
          import('./admin/components/level-boosts/level-boosts.module').then(
            (module) => module.LevelBoostsModule
          ),
      },
      {
        path: 'moderators',
        loadChildren: () =>
          import('./admin/components/moderators/moderators.module').then(
            (module) => module.ModeratorsModule
          ),
      },
      {
        path: 'orderdetails',
        loadChildren: () =>
          import('./admin/components/order-details/order-details.module').then(
            (module) => module.OrderDetailsModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./admin/components/roles/roles.module').then(
            (module) => module.RolesModule
          ),
      },
      {
        path: 'servers',
        loadChildren: () =>
          import('./admin/components/servers/servers.module').then(
            (module) => module.ServersModule
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./admin/components/services/services.module').then(
            (module) => module.ServicesModule
          ),
      },
      {
        path: 'tiers',
        loadChildren: () =>
          import('./admin/components/tiers/tiers.module').then(
            (module) => module.TiersModule
          ),
      },
      {
        path: 'toptiereloboosts',
        loadChildren: () =>
          import(
            './admin/components/top-tier-elo-boosts/top-tier-elo-boosts.module'
          ).then((module) => module.TopTierEloBoostsModule),
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./ui/components/basket/basket.module').then(
        (module) => module.BasketModule
      ),
  },
  {
    path: 'apex',
    loadChildren: () =>
      import('./ui/components/apex/apex.module').then(
        (module) => module.ApexModule
      ),
  },
  {
    path: 'csgo',
    loadChildren: () =>
      import('./ui/components/csgo/csgo.module').then(
        (module) => module.CsgoModule
      ),
  },
  {
    path: 'lol',
    loadChildren: () =>
      import('./ui/components/lol/lol.module').then(
        (module) => module.LolModule
      ),
  },
  {
    path: 'tft',
    loadChildren: () =>
      import('./ui/components/tft/tft.module').then(
        (module) => module.TftModule
      ),
  },
  {
    path: 'valorant',
    loadChildren: () =>
      import('./ui/components/valorant/valorant.module').then(
        (module) => module.ValorantModule
      ),
  },
  {
    path: 'wildrift',
    loadChildren: () =>
      import('./ui/components/wildrift/wildrift.module').then(
        (module) => module.WildriftModule
      ),
  },
  {
    path: 'lor',
    loadChildren: () =>
      import('./ui/components/lor/lor.module').then(
        (module) => module.LorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
