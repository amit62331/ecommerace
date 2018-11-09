import { AuthGard } from './auth/auth.gard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeeStartComponent } from './recipes/recipee-start/recipee-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';

import { NgModule } from '@angular/core';
import{ Routes , RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

    const appRoutes:Routes =[
        {path: '' , redirectTo:'/recipes',pathMatch:'full'},
        {path:'recipes' , component:RecipesComponent , children: [
            {path:'' , component:RecipeeStartComponent },
            {path:'new', component:RecipeEditComponent , canActivate:[AuthGard]},
            {path:':id',component:RecipeDetailComponent},
            {path:':id/edit',component:RecipeEditComponent , canActivate:[AuthGard]}
            
        ]},
        {path:'shopping-list',component: ShoppingListComponent},
        {path:'signup',component:SignupComponent},
        {path:'signin' , component:SigninComponent}
    ];

    @NgModule({
        imports: [RouterModule.forRoot(appRoutes)],
        exports:[RouterModule]
    })
export class AppRoutingModule{
    
}