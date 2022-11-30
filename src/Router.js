import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import RecipesInProgress from './pages/RecipesInProgress';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/meals/:id-da-receita/in-progress" component={ RecipesInProgress } />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipesInProgress }
        />
        <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
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
