import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoostersModule } from './boosters/boosters.module';
import { CharactersModule } from './characters/characters.module';
import { CoachesModule } from './coaches/coaches.module';
import { CompanysModule } from './companys/companys.module';
import { CustomersModule } from './customers/customers.module';
import { DivisionsModule } from './divisions/divisions.module';
import { EmployeesModule } from './employees/employees.module';
import { ExtraOptionsModule } from './extra-options/extra-options.module';
import { FactorsModule } from './factors/factors.module';
import { GamesModule } from './games/games.module';
import { ModeratorsModule } from './moderators/moderators.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { ServersModule } from './servers/servers.module';
import { ServicesModule } from './services/services.module';
import { TiersModule } from './tiers/tiers.module';
import { TopTierEloBoostsModule } from './top-tier-elo-boosts/top-tier-elo-boosts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CharacterLevelBoostsModule } from './character-level-boosts/character-level-boosts.module';
import { LevelBoostsModule } from './level-boosts/level-boosts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BoostersModule,
    CharactersModule,
    CoachesModule,
    CompanysModule,
    CustomersModule,
    DivisionsModule,
    EmployeesModule,
    ExtraOptionsModule,
    FactorsModule,
    GamesModule,
    ModeratorsModule,
    OrderDetailsModule,
    OrdersModule,
    RolesModule,
    ServersModule,
    ServicesModule,
    TiersModule,
    TopTierEloBoostsModule,
    DashboardModule,
    CharacterLevelBoostsModule,
    LevelBoostsModule,
  ],
})
export class ComponentsModule {}
