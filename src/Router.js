import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipesInProgress from './pages/RecipesInProgress';
import NotFound from './pages/NotFound';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/meals/:id-da-receita/in-progress" component={ RecipesInProgress } />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipesInProgress }
        />
        {/* linha 24: so reconhece o ID se a rota for ecrita assim */}
        <Route path="/meals/:idDaReceita" component={ RecipeDetails } />
        <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
